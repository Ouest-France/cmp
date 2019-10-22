;(function (cn) {
    if (!window.localStorage) return;
    var __cmp_version__ = 4;

    // polyfill
    window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function (o, t) {
        t = t || window;
        for (var i = 0; i < this.length; i++) o.call(t, this[i], i, this)
    });

    // La sdk consent string est requise par le composant sipacmp
    ##CMPCONSENTSRING##

    // lib throttle https://lodash.com/docs#throttle
    ##CMPTHROTTLE##

    var _getAllowedPurposes = function (c) {
        c = c ? c : consent;
        var r = [];
        for (var i = 1; i < 6; i++) {
            if (!c || c['iab-purpose-' + i]) r.push(i);
        }
        return r;
    }
    var _getAllowedVendors = function () {
        return consentData.allowedVendorIds;
    }
    var _local_consent = function (name, arg) {
        // Set
        if (arg != undefined) {
            window.localStorage.setItem(name, JSON.stringify(arg));
            return arg;
            // Get
        } else {
            return JSON.parse(window.localStorage.getItem(name));
        }
    };

    var top_domain = '';
    if (location.hostname === 'localhost') {
        top_domain = location.hostname;
    } else {
        top_domain = location.hostname.split('.').reverse();
        top_domain = top_domain[1].length > 2 ? "." + top_domain[1] + "." + top_domain[0] : location.hostname;
    }

    var _consent = function (arg) {
        // Set consent
        if (arg != undefined) {
            var d = new Date();
            d.setTime(d.getTime() + 34128000000); // 13 mois
            document.cookie = cn + '_consent' + "=" + _consent_family(arg) + ";expires=" + d.toUTCString() + ";domain=" + top_domain + ";path=/";
        }
        return _local_consent(cn + '-consent', arg)
    };

    var _consent_token = function (arg) {
        return _local_consent(cn + '-consent-token', arg)
    };

    var _consent_uuid = function (arg) {
        var uuid = _local_consent(cn + '-consent-uuid');

        if (!uuid) {
            uuid = '';
            var i, random;
            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;

                if (i == 8 || i == 12 || i == 16 || i == 20) {
                    uuid += '-';
                }
                uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
            }
            _local_consent(cn + '-consent-uuid', uuid);
        }

        return uuid;
    };

    var _consent_family = function (arg) {
        var obj = {
            "functionning": "000001",
            "social": "000010",
            "advertising": "000100",
            "analytics": "001000",
            "editorial": "010000",
            "family": "100000",
        }, family = 0;

        // Encode family
        if ("object" == typeof arg) {
            Object.keys(obj).map(function (key, index) {
                family += arg[key] == undefined || arg[key] ? obj[key] >>> 0 : 0;
            });
            return parseInt(family, 2);
            // Decode family
        } else if ("number" == typeof arg) {
            arg = arg >>> 0;

            var ret = {
                "functionning": arg & obj.functionning >>> 0 ? true : false,
                "social": arg & obj.social >>> 0 ? true : false,
                "advertising": arg & obj.advertising >>> 0 ? true : false,
                "analytics": arg & obj.analytics >>> 0 ? true : false,
                "editorial": arg & obj.editorial >>> 0 ? true : false,
                "family": arg & obj.family >>> 0 ? true : false
            }
            for (var i = 1; i < 6; i++) {
                ret['iab-purpose-' + i] = ret.advertising;
            }
            return ret;
        }
    };
    // Permet de changer l'élément sur lequel on écoute le scroll
    var _setScrollContainer = function (arg) {
        if (arg instanceof HTMLElement) {
            (_config.scrollContainer || window).removeEventListener('scroll', evt_scroll);
            _config.scrollContainer = arg;
            _config.scrollContainer.addEventListener('scroll', evt_scroll);
            return true;
        }
        return false;
    };

    var consent = _consent(),
        consentData;

    // Prépare les appels stockés avant le chargement de la cmp
    var _cmpStub_commandQueue = window.__cmp.commandQueue,
        _config = (window.__cmp && window.__cmp.config ? window.__cmp.config : {}),
        _cb_getUserConsent = [],
        _cb_getVendorConsents = [];

    window.dataLayer = window.dataLayer || [];

    // set checkbox
    function _setCheckbox() {
        __cmp('getUserConsent', null, function () {
            document.querySelectorAll('input[data-consent-family]').forEach(function (el) {
                el.setAttribute('checked', consent[el.getAttribute('data-consent-family')]);
                el.checked = consent[el.getAttribute('data-consent-family')];
            });
        });
    }

    function _setVendorCheckbox() {
        __cmp('getVendorConsents', null, function (res) {
            document.querySelectorAll('input[data-consent-partner]').forEach(function (el) {
                el.setAttribute('checked', res.vendorConsents[el.getAttribute('data-consent-partner')]);
                el.checked = res.vendorConsents[el.getAttribute('data-consent-partner')];
            });
        });

    }

    // CMP IAB
    window.__cmp = function (command, parameter, cb) {
        var cmp = {
            'getVendorConsents': function (parameter, callback) {
                function resolve() {
                    var vendorIds = parameter || [];
                    var vendorConsents = {};
                    consentData.vendorList.vendors.forEach(function (vendor) {
                        if (!vendorIds.length || vendorIds.indexOf(vendor.id) !== -1) {
                            vendorConsents[vendor.id] = consentData.allowedVendorIds.indexOf(vendor.id) !== -1
                        }
                    });
                    callback({
                        metadata: consentData.getMetadataString(),
                        gdprApplies: true,
                        hasGlobalScope: false,
                        purposeConsents: consentData.getPurposesAllowed(),
                        vendorConsents: vendorConsents,
                        vendorList: consentData.vendorList
                    }, true);
                }

                if (typeof consentData == "undefined") {
                    return _cb_getVendorConsents.push(Promise.resolve(resolve));
                }
                resolve();
            },
            'getConsentData': function (parameter, callback) {
                // console.log('getConsentData', parameter);

                callback({
                    consentData: consentData.getConsentString(),
                    gdprApplies: true,
                    hasGlobalScope: false
                }, true)
            },
            'ping': function (parameter, callback) {
                // console.log('ping', parameter);

                callback({
                    gdprAppliesGlobally: true,
                    cmpLoaded: true
                }, true);
            },
            'getUserData': function (parameter, callback) {

                callback({
                    'consent': _consent(),
                    'consentData': (consentData || window.localStorage.getItem(cn + '-consent-data')).getConsentString(),
                    'uuid': _consent_uuid()
                }, true);
            },
            'getUserConsent': function (parameter, callback) {
                var c = _consent();
                if (c == null || (_oldConsent && _oldConsent.getCmpVersion() < __cmp_version__)) {
                    return _cb_getUserConsent.push(Promise.resolve(callback));
                }
                callback({'consent': c}, true);
            },
            'setScrollContainer': function (parameter) {
                return _setScrollContainer(parameter);
            }
        };
        if (typeof cmp[command] == 'function') {
            return cmp[command](parameter, cb);
        }
    };
    // Surcharge de la fonction message
    window.__cmp.receiveMessage = function (event) {
        var data = event && event.data && event.data.__cmpCall;
        // Si c'est un message cmp (dont l'objet __cmpCall éxiste)
        if (data) {
            __cmp(
                data.command,
                data.parameter,
                function (retValue, success) {
                    var returnMsg = {
                        "__cmpReturn": {
                            "returnValue": retValue,
                            "success": success,
                            "callId": data.callId
                        }
                    };
                    (event.source || window).postMessage(returnMsg, '*');
                }
            );
        }
    };

    window.__cmp.config = _config;

    window.__cmp.consent = _consent;

    window.__cmp._create_banner = function () {
        if (__cmp.div_banner) return;
        // CSS
        var styleEl = document.createElement('style');
        styleEl.innerHTML = '##CMPCSS##';
        document.head.appendChild(styleEl);

        // HTML
        __cmp.div_banner = document.createElement('div');
        var html = '##CMPHTML##';
        html = html.replace('##scmp-text##', _config.text || '##CMPTEXT##')
        __cmp.div_banner.innerHTML = html;
        __cmp.div_banner.setAttribute('role', 'dialog');
        __cmp.div_banner.setAttribute('id', 'scmp-popin');
        __cmp.div_banner.setAttribute('class', 'scmp-popin');
        document.body.appendChild(__cmp.div_banner);

        _setCheckbox();

        __cmp('getVendorConsents', null, function (res) {
            var ul = document.querySelector('#scmp-list-partners');
            var template = ul.innerHTML;
            var purposes = {};
            res.vendorList.purposes.forEach(function (purpose) {
                purposes[purpose.id] = purpose;
            });
            var features = {};
            res.vendorList.features.forEach(function (feature) {
                features[feature.id] = feature;
            });

            var html = '';
            res.vendorList.vendors.sort(function (v1, v2) {
                return (v1.name < v2.name) ? -1 : (v1.name > v2.name) ? 1 : 0
            }).forEach(function (vendor) {
                var desc = '<div class="scmp-partner-detail scmp-hidden">';

                desc += '<div><div class="scmp-strong">Politique de vie privée :</div><a href="' + vendor.policyUrl + '" target="_policyVendor">' + vendor.policyUrl + '</a></div>';

                if (vendor.purposeIds.length) {
                    desc += '<div class="scmp-title">Finalités (Consentement) : </div>';
                    vendor.purposeIds.forEach(function (purpose) {
                        desc += '<div>' + purposes[purpose].name + '</div>';
                    });
                }

                if (vendor.legIntPurposeIds.length) {
                    desc += '<div class="scmp-title">Finalités (Intérêts légitimes) : </div>';
                    vendor.legIntPurposeIds.forEach(function (purpose) {
                        desc += '<div>' + purposes[purpose].name + '</div>';
                    });
                }

                if (vendor.featureIds.length) {
                    desc += '<div class="scmp-title">Fonctionnalités : </div>';
                    vendor.featureIds.forEach(function (feature) {
                        desc += '<div>' + features[feature].name + '</div>';
                    });
                }

                desc += '</div>';

                var text = template;
                text = text.replace(/partner-id/g, '' + vendor.id);
                text = text.replace(/scmp-partner-i/g, 'scmp-partner-' + vendor.id);
                text = text.replace(/partner-name/, '' + vendor.name);
                text = text.replace(/partner-text/, desc);
                text = text.replace(/(checked)/, res.vendorConsents[vendor.id] ? '$1' : '');

                html += text;
            });
            ul.innerHTML = html;
        });

        function _togglePopinParameters(open) {
            document.querySelector('#scmp-popin').classList[open ? 'remove' : 'add']('scmp-parameters-open');
            document.querySelector('#scmp-btn-parameters').classList[open ? 'remove' : 'add']('scmp-hidden');
            document.body.classList[open ? 'remove' : 'add']('scmp-no-scroll');

            document.querySelector('#scmp-btn-validation').classList[!open ? 'remove' : 'add']('scmp-hidden');
            document.querySelector('#scmp-btn-disallow').classList[!open ? 'remove' : 'add']('scmp-hidden');
            document.querySelector('#scmp-parameters').classList[!open ? 'remove' : 'add']('scmp-hidden');
            document.querySelector('#scmp-overlay').classList[!open ? 'remove' : 'add']('scmp-hidden');
        }

        function _togglePopinPartenaires(open) {
            if (open && document.querySelector('#scmp-popin').classList.contains('scmp-parameters-open')) {
                document.querySelector('#scmp-parameters').classList['remove']('scmp-hidden');
            } else {
                document.querySelector('#scmp-parameters').classList['add']('scmp-hidden');
            }
            document.querySelector('#scmp-actions-parameters').classList[open ? 'remove' : 'add']('scmp-hidden');
            document.querySelector('#scmp-header').classList[open ? 'remove' : 'add']('scmp-hidden');

            document.querySelector('#scmp-popin').classList[open ? 'remove' : 'add']('scmp-partners-open');
            document.querySelector('#scmp-btn-partners').classList[open ? 'remove' : 'add']('scmp-hidden');
            document.body.classList[open ? 'remove' : 'add']('scmp-no-scroll');

            document.querySelector('#scmp-actions-partners').classList[!open ? 'remove' : 'add']('scmp-hidden');
            document.querySelector('#scmp-partners').classList[!open ? 'remove' : 'add']('scmp-hidden');
            document.querySelector('#scmp-overlay').classList[!open ? 'remove' : 'add']('scmp-hidden');
        }

        // Gestion affichage parametres
        document.querySelector('#scmp-btn-parameters').addEventListener('click', function () {
            _togglePopinParameters(false);
        });

        // Gestion affichage partneraires
        document.querySelector('#scmp-btn-partners').addEventListener('click', function () {
            _togglePopinPartenaires(false);
        });

        // Gestion affichage détail d'un partenaire
        document.querySelector('#scmp-list-partners').addEventListener('click', function (e) {
            var elem = e.target.closest(".scmp-arrow-down");
            if (!elem) return;

            elem.parentElement.querySelector('.scmp-partner-detail').classList.toggle('scmp-hidden');
            elem.classList.toggle('scmp-arrow-up');
        });

        // Gestion accepter partenaires
        document.querySelector('#scmp-btn-allow-partners').addEventListener('click', function () {
            consentData.allowedVendorIds = [];
            document.querySelectorAll('input[data-consent-partner]').forEach(function (el) {
                if (el.checked) {
                    consentData.allowedVendorIds.push(el.getAttribute('data-consent-partner') * 1);
                }
            });
            _togglePopinPartenaires(true);
            _togglePopinParameters(false);
        });

        document.querySelector('#scmp-btn-allow-all-partners').addEventListener('click', function () {
            consentData.allowedVendorIds = consentData.vendorList.vendors.map(function (vendor) {
                return vendor.id
            });
            _setVendorCheckbox();
            _togglePopinPartenaires(true);
            _togglePopinParameters(false);
        });

        document.querySelector('#scmp-btn-disallow-all-partners').addEventListener('click', function () {
            consentData.allowedVendorIds = [];
            _setVendorCheckbox();
            _togglePopinPartenaires(true);
            _togglePopinParameters(false);
        });

        // Consentement par click
        // tout
        document.querySelector('#scmp-btn-allow').addEventListener('click', function () {
            // console.log('consent all');
            consentData.allowedVendorIds = consentData.vendorList.vendors.map(function (vendor) {
                return vendor.id
            });
            _setCheckbox();
            _setVendorCheckbox();
            consent = __cmp.save_consent(_consent_family(63), 'click all');
            _togglePopinParameters(true);
        });

        // rien
        document.querySelector('#scmp-btn-disallow').addEventListener('click', function () {
            // console.log('consent none');
            consentData.allowedVendorIds = [];
            _setCheckbox();
            _setVendorCheckbox();
            consent = __cmp.save_consent(_consent_family(1), 'click none');
            _togglePopinParameters(true);
        });

        // spécifique
        document.querySelector('#scmp-btn-validation').addEventListener('click', function () {
            document.querySelectorAll('input[data-consent-family]').forEach(function (el) {
                consent[el.getAttribute('data-consent-family')] = el.checked;
            });
            // console.log('consent click');
            _setCheckbox();
            _setVendorCheckbox();
            consent = __cmp.save_consent(consent, 'click');
            _togglePopinParameters(true);
        });
    };

    window.__cmp.hide = function () {
        if (!__cmp.div_banner) return;

        document.querySelector('#scmp-popin').classList.add('scmp-hidden');
    };

    window.__cmp.show = function () {
        __cmp._create_banner();
        document.getElementById('scmp-popin').classList.remove('scmp-hidden');
        document.getElementById('scmp-btn-parameters').classList.remove('scmp-hidden');
    };

    window.__cmp.save_consent = function (consent, event) {
        // console.log('save_consent', consent);
        consent = __cmp.consent(consent);
        _consent_token(false);

        consentData.setCmpVersion(__cmp_version__);
        consentData.setPurposesAllowed(_getAllowedPurposes(consent));
        consentData.setVendorsAllowed(_getAllowedVendors());

        window.localStorage.setItem(cn + '-consent-data', consentData.getConsentString());

        __cmp.hide();
        dataLayer.push({'event': cn + 'Change'});
        dataLayer.push({'event': cn + event});
        if (window.evt_scroll) {
            window.removeEventListener('scroll', evt_scroll);
        }

        __cmp('getUserData', null, function (ret) {
            var request = new XMLHttpRequest();

            request.open('POST', 'https://cmp.aws-sipa.ouest-france.fr/' + (window.location.hostname.indexOf('www') != '-1' ? 'prod' : 'staging') + '/v1/cmp', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({
                "consentString": ret.consentData,
                "utilisateurId": ret.uuid,
                "consent": _consent_family(ret.consent)
            }));

        });

        _cb_getUserConsent.map(function (el) {
            el.then(function (callback) {
                callback({'consent': _consent()}, true);
            });
        });
        return consent;
    };

    var vendorlist = (function (u) {
        var local_vendorlist = JSON.parse(window.localStorage.getItem(cn + '-vendorlist'));

        // On stocke la liste qu'une semaine en local storage
        if (!local_vendorlist || ((new Date()).getTime() - window.localStorage.getItem(cn + '-vendorlist-update') > 604800000)) { // 7 jours

            var xhr = new XMLHttpRequest();
            xhr.open('GET', u, true);
            xhr.responseType = 'json';
            xhr.onload = function () {
                var status = xhr.status;
                if (status === 200) {

                    vendorlist = typeof xhr.response == "object" ? xhr.response : JSON.parse(xhr.response);
                    window.localStorage.setItem(cn + '-vendorlist-update', (new Date()).getTime());
                    window.localStorage.setItem(cn + '-vendorlist', JSON.stringify(vendorlist));

                    // consentement par top domain (localstorage undefined mais cookie OK)
                    if (consent == undefined && document.cookie.indexOf(cn + '_consent=') > -1) {
                        var cookieconsent = ("; " + document.cookie).split("; " + cn + '_consent=')[1].split(";")[0] * 1;
                        consent = _consent_family(cookieconsent); // same consent

                        _init(true);

                        consentData.allowedVendorIds = consentData.vendorList.vendors.map(function (vendor) {
                            return vendor.id
                        });
                        consent = __cmp.save_consent(consent, 'navigation'); // consent all
                    } else {

                        _init(true);
                    }

                    _cb_getVendorConsents.map(function (el) {
                        el.then(function (callback) {
                            callback();
                        });
                    });
                }
            };


            return xhr.send();

        } else {
            return local_vendorlist;

        }
    })('https://vendorlist.consensu.org/vendorlist.json'); // Url liste globale vendor https://vendorlist.consensu.org/v-versionnum/vendorlist.json

    var _init = function (will_revalidate) {
        if (!vendorlist) return;

        consentData = window.localStorage.getItem(cn + '-consent-data');

        if (!consentData || will_revalidate) {
            // Si le consentement est nouveau ou a moins d'une semaine on revalide
            // console.log('revalidate', consentData)
            consentData = new __cmpConsentString(consentData ? consentData : '');
            // Modify the consent data
            consentData.setCmpId(85);
            consentData.setConsentScreen(1);
            consentData.setCmpVersion(__cmp_version__);
            consentData.setGlobalVendorList(vendorlist);
            consentData.setConsentLanguage('fr');

            will_revalidate = true;

        } else {
            consentData = new __cmpConsentString(consentData);
            consentData.setGlobalVendorList(vendorlist);

            var _temp_ts = 1569916799000, // Tue Oct 01 2019 09:59:59 GMT+0200 (Central European Summer Time)
                _fix_ts = 1569945599000, // Tue Oct 01 2019 17:59:59 GMT+0200 (Central European Summer Time)
                _consent_ts = new Date(consentData.lastUpdated).getTime();

            if (_consent_ts > _temp_ts && _consent_ts < _fix_ts && consentData.allowedVendorIds.length == 0 && consentData.allowedPurposeIds.length == 5) {
                // console.log('sipacmp temp fix');

                consentData.allowedVendorIds = consentData.vendorList.vendors.map(function (vendor) {
                    return vendor.id
                });
                consent = __cmp.save_consent(consent, 'fix');
            }

            _fix_ts = 1570020599000; // Tue Oct 02 2019 14:49:59 GMT+0200 (Central European Summer Time)
            if (_consent_ts > _temp_ts && _consent_ts < _fix_ts && consentData.allowedVendorIds.length == 0 && consentData.allowedPurposeIds.length == 0) {
                // console.log('sipacmp temp fix');

                if (document.readyState !== 'loading') {
                    __cmp.show();
                } else {
                    document.addEventListener('readystatechange', function () {
                        if (!__cmp.div_banner) {
                            __cmp.show();
                        }
                    });
                }
            }
        }

        if (consent) {
            consentData.setPurposesAllowed(_getAllowedPurposes());
            consentData.setVendorsAllowed(_getAllowedVendors());
        } else {
            consent = _consent_family(1);
            consentData.setPurposesAllowed([]);
            consentData.setVendorsAllowed([]);
        }

        if (will_revalidate) {
            // console.log('computeConsentString', consentData);
            window.localStorage.setItem(cn + '-consent-data', consentData.getConsentString());
        }


        // Exemple d'appels:
        // window.__cmp('ping', {}, function(e){ console.log(e) })
        // window.__cmp('getConsentData', {}, function(e){ console.log(e) })
        // window.__cmp('getVendorConsents', {}, function(e){ console.log(e) })

        // Joue les appels stockés avant le chargement de la cmp
        (_cmpStub_commandQueue || []).forEach(function (param) {
            __cmp(param.command, param.parameter || null, param.callback || function () {
                return null;
            });
        });
    };
    _init();

    var url = window.location.href;
    // consentement par navigation
    if (_consent_token() && !window[cn + '_gcda'] && url.indexOf('/politique-de-protection-des-donnees-personnelles') < 0 && url.indexOf('/cookies') < 0) { // _global_consent_doesnt_apply
        // console.log('consent nav')
        consentData.allowedVendorIds = consentData.vendorList.vendors.map(function (vendor) {
            return vendor.id
        });
        consent = __cmp.save_consent(_consent_family(63), 'navigation'); // consent all
    }

    var _oldConsent = new __cmpConsentString(window.localStorage.getItem(cn + '-consent-data'));
    // CMP Bandeau
    if ((consent == undefined && document.cookie.indexOf(cn + '_consent=') === -1) || (_oldConsent && _oldConsent.getCmpVersion() < __cmp_version__)) {
        // affiche bandeau
        if (document.readyState !== 'loading') {
            __cmp.show();
        } else {
            document.addEventListener('readystatechange', function () {
                if (!__cmp.div_banner) {
                    __cmp.show();
                }
            });
        }
        _consent_token(true);

        if (!window[cn + '_gcda']) {
            // Ecouteur Scroll
            window.evt_scroll = _throttle(function () {
                var container = (_config.scrollContainer || document.documentElement);
                if ((window.pageYOffset || container.scrollTop) > window.innerHeight * (_config.scrollPercent != undefined ? _config.scrollPercent : .1)) { // 10%
                    consentData.allowedVendorIds = consentData.vendorList.vendors.map(function (vendor) {
                        return vendor.id
                    });
                    _setCheckbox();
                    _setVendorCheckbox();
                    consent = __cmp.save_consent(_consent_family(63), 'scroll'); // consentement par Scroll

                    window.removeEventListener('scroll', evt_scroll);
                }
            }, 200, {trailing: true, leading: true});
            (_config.scrollContainer || window).addEventListener('scroll', evt_scroll);
        }
    }

})('sipacmp');
