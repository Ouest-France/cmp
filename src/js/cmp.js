;(function(cn){
    if(!window.localStorage) return;

    // La sdk consent string est requise par le composant sipacmp
    ##CMPCONSENTSRING##

    // lib throttle https://lodash.com/docs#throttle
    ##CMPTHROTTLE##

    var _local_consent = function(name, arg) {
        // Set
        if(arg != undefined) {
            window.localStorage.setItem(name, JSON.stringify(arg));
            return arg;
        // Get
        } else {
            return JSON.parse(window.localStorage.getItem(name));
        }
    };
    var top_domain = location.hostname.split('.').reverse();
    top_domain = top_domain[1].length > 2 ? "." + top_domain[1] + "." + top_domain[0] : location.hostname;
    var _consent = function(arg){
        // Set consent
        if(arg != undefined) {
            var d = new Date();
            d.setTime(d.getTime() + 34128000000); // 13 mois
            document.cookie = cn + '_consent' + "=" + _consent_family(arg) + ";expires="+ d.toUTCString() + ";domain=" + top_domain + ";path=/";
        }
        return _local_consent(cn+'-consent', arg)
    };
    var _consent_token = function(arg){
        return _local_consent(cn+'-consent-token', arg)
    };
    var _consent_uuid = function(arg){
        var uuid = _local_consent(cn+'-consent-uuid');

        if(!uuid) {
            uuid = '';
            var i, random;
            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;

                if (i == 8 || i == 12 || i == 16 || i == 20) {
                    uuid += '-';
                }
                uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
            }
            _local_consent(cn+'-consent-uuid', uuid);
        }

        return uuid;
    };
    var _consent_family = function(arg){
        var obj = {
            "functionning": "000001",
            "social":       "000010",
            "advertising":  "000100",
            "analytics":    "001000",
            "family":       "010000",
            "family_2":     "100000",
        }, family = 0;

        // Encode family
        if("object" == typeof arg) {
            Object.keys(obj).map(function(key, index) {
                family += arg[key] == undefined || arg[key] ? obj[key] >>> 0 : 0;
            });
            return parseInt( family, 2 );
        // Decode family
        } else if("number" == typeof arg) {
            arg = arg >>> 0;

            return {
                "functionning": arg & obj.functionning >>> 0 ? true : false,
                "social":       arg & obj.social >>> 0 ? true : false,
                "advertising":  arg & obj.advertising >>> 0 ? true : false,
                "analytics":    arg & obj.analytics >>> 0 ? true : false,
                "family":       arg & obj.family >>> 0 ? true : false,
                "family_2":     arg & obj.family_2 >>> 0 ? true : false,
            }
        }
        // else {
        //     var ret = {}
        //     Object.keys(obj).map(function(key, index) {
        //         ret[key] = false;
        //     });
        //     ret["family"] = ret["family_2"] = true;
        //     return ret;
        // }
    };
    var _init = function (will_revalidate) {
        if(!vendorlist) return;

        var consentData = window.localStorage.getItem(cn+'-consent-data');

        if(!consentData || will_revalidate) {
            // Si le consentement est nouveau ou a moins d'une semaine on revalide
            // console.log('revalidate')
            consentData = new __cmpConsentString();
            // Modify the consent data
            consentData.setCmpId(85);
            consentData.setConsentScreen(1);
            consentData.setCmpVersion(1);
            consentData.setGlobalVendorList(vendorlist);
            consentData.setConsentLanguage('fr');

            will_revalidate = true;

        } else {
            consentData = new __cmpConsentString(consentData);
            consentData.setGlobalVendorList(vendorlist);
        }
        var consent = _consent();
            consent = consent ? consent : _consent_family(63);
        consentData.setPurposesAllowed(consent.functionning ? vendorlist.purposes.map(function(purpose){return purpose.id}) : []);
        consentData.setVendorsAllowed(consent.functionning ? vendorlist.vendors.map(function(vendor){return vendor.id}) : []);


        if(will_revalidate) {
            // console.log('computeConsentString', consentData);
            window.localStorage.setItem(cn+'-consent-data', consentData.getConsentString());
        }

        // Prépare les appels stockés avant le chargement de la cmp
        var _cmpStub_commandQueue = window.__cmp.commandQueue;
        var _config = (window.__cmp && window.__cmp.config ? window.__cmp.config : {});
        window.dataLayer = window.dataLayer || [];

        // CMP IAB
        window.__cmp = function(command, parameter, cb) {
            var cmp = {
                'getVendorConsents': function(parameter, callback){
                    // console.log('getVendorConsents', parameter);

                    var vendorIds = parameter || [];
                    var vendorConsents = {};
                    consentData.vendorList.vendors.forEach(function(vendor) {
                    if (!vendorIds.length || vendorIds.indexOf(vendor.id) !== -1)
                        vendorConsents[vendor.id] = consentData.allowedVendorIds.indexOf(vendor.id) !== -1
                    });
                    callback({
                        metadata: consentData.getMetadataString(),
                        gdprApplies: true,
                        hasGlobalScope: true,
                        purposeConsents: consentData.getPurposesAllowed(),
                        vendorConsents: vendorConsents
                    }, true)
                },
                'getConsentData': function(parameter, callback){
                    // console.log('getConsentData', parameter);

                    callback({
                        consentData: consentData.getConsentString(),
                        gdprApplies: true,
                        hasGlobalScope: true
                    }, true)
                },
                'ping': function(parameter, callback){
                    // console.log('ping', parameter);

                    callback({
                        gdprAppliesGlobally: true,
                        cmpLoaded: true
                    }, true);
                },
                'getUserData': function(parameter, callback){

                    callback({'consentData': consentData.getConsentString(), 'uuid': _consent_uuid()}, true);
                }
            };
            if(typeof cmp[command] == 'function') {
                return cmp[command](parameter, cb);
            }
        };
        // Surcharge de la fonction message
        __cmp.receiveMessage = function(event) {
            var data = event && event.data && event.data.__cmpCall;
            // Si c'est un message cmp (dont l'objet __cmpCall éxiste)
            if (data) {
                __cmp(
                    data.command,
                    data.parameter,
                    function(retValue, success) {
                        var returnMsg = {"__cmpReturn": {
                            "returnValue": retValue,
                            "success": success,
                            "callId": data.callId
                        }};
                        event.source.postMessage(returnMsg, '*');
                    }
                );
            }
        };
        __cmp.config = _config;
        __cmp.consent = _consent;
        __cmp._create_banner = function() {
            if(__cmp.div_banner) return;
            // CSS
            var styleEl = document.createElement('style');
            styleEl.innerHTML = '##CMPCSS##';
            document.head.appendChild(styleEl);

            // HTML
            __cmp.div_banner = document.createElement('div');
            var html = '##CMPHTML##';
            html = html.replace('##scmp-text##', _config.text || '##CMPTEXT##')
            __cmp.div_banner.innerHTML = html;
            document.body.appendChild(__cmp.div_banner);

            // set checkbox
            document.querySelectorAll('input[data-consent-family]').forEach(function(el){
                el.setAttribute('checked', consent[el.getAttribute('data-consent-family')]);
                el.checked = consent[el.getAttribute('data-consent-family')];
            });

            // Gestion affichage parametres
            document.querySelector('#scmp-btn-parameters').addEventListener('click', function(){

                document.querySelector('#scmp-popin').classList.add('scmp-parameters-open');

                document.querySelector('#scmp-btn-parameters').classList.add('scmp-hidden');

                document.querySelector('#scmp-parameters').classList.remove('scmp-hidden');
                document.querySelector('#scmp-overlay').classList.remove('scmp-hidden');

                document.querySelector('#scmp-btn-validation').setAttribute('data-trkcmp', 'accepter2');

                document.body.classList.add('scmp-no-scroll');
            });

            // Consentement par click
            var retention = false;
            document.querySelector('#scmp-btn-validation').addEventListener('click', function(){
                document.querySelectorAll('input[data-consent-family]').forEach(function(el){
                    consent[el.getAttribute('data-consent-family')] = el.checked;
                });

                if(consent.advertising || retention) {
                    document.querySelector('#scmp-parameters').classList.add('scmp-hidden');
                    document.querySelector('#scmp-confirmation').classList.add('scmp-hidden');

                    document.querySelector('#scmp-description').classList.remove('scmp-hidden');
                    document.querySelector('#scmp-header').classList.remove('scmp-hidden');

                    document.querySelector('.scmp-list-parameters').classList.remove('retention');

                    document.querySelector('#scmp-btn-validation').setAttribute('data-trkcmp', 'accepter1');
                    document.querySelector('label[for="publicite"]').setAttribute('data-trkcmp', 'taquet-pub');
                    consent = __cmp.save_consent(consent);
                    retention = false;
                    return;
                }
                if(!consent.advertising) {
                    document.querySelector('#scmp-popin').classList.add('scmp-parameters-open');

                    document.querySelector('#scmp-parameters').classList.remove('scmp-hidden');
                    document.querySelector('#scmp-overlay').classList.remove('scmp-hidden');
                    document.querySelector('#scmp-confirmation').classList.remove('scmp-hidden');

                    document.querySelector('#scmp-btn-parameters').classList.add('scmp-hidden');
                    document.querySelector('#scmp-description').classList.add('scmp-hidden');
                    document.querySelector('#scmp-header').classList.add('scmp-hidden');

                    document.querySelector('.scmp-list-parameters').classList.add('retention');

                    document.querySelector('#scmp-btn-validation').setAttribute('data-trkcmp', 'accepter3');
                    document.querySelector('label[for="publicite"]').setAttribute('data-trkcmp', 'taquet-pub2');
                    retention = true;
                    return;
                }
            });
        };
        __cmp.hide = function() {
            if(!__cmp.div_banner) return;

            document.querySelector('#scmp-popin').classList.remove('scmp-parameters-open');

            document.querySelector('#scmp-parameters').classList.add('scmp-hidden');
            document.querySelector('#scmp-overlay').classList.add('scmp-hidden');
            document.querySelector('#scmp-popin').classList.add('scmp-hidden');

            document.body.classList.remove('scmp-no-scroll');
        };
        __cmp.show = function() {
            __cmp._create_banner();

            document.getElementById('scmp-popin').classList.remove('scmp-hidden');
            document.getElementById('scmp-btn-parameters').classList.remove('scmp-hidden');
        };
        __cmp.save_consent = function(consent) {
            consent = __cmp.consent(consent);
            _consent_token(false);
            __cmp.hide();
            dataLayer.push({'event':cn+'Change'});

            __cmp('getUserData', null, function(ret){
                var request = new XMLHttpRequest();

                request.open('POST', 'https://cmp.aws-sipa.ouest-france.fr/' + (window.location.hostname.indexOf('www') != '-1' ? 'prod' : 'staging') + '/v1/cmp', true);
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify({
                    "consentString": ret.consentData,
                    "utilisateurId": ret.uuid
                }));
            });
            return consent;
        };

        // consentement par navigation
        if(_consent_token() && !window[cn + '_gcda']) { // _global_consent_doesnt_apply
            // console.log('consent nav')
           consent = __cmp.save_consent(_consent_family(63)); // consent all
        }

        // CMP Bandeau
        if(consent == undefined || document.cookie.indexOf(cn + '_consent=') === -1) {
            // affiche bandeau
            __cmp.show();

            _consent_token(true);

            if(!window[cn + '_gcda']) {
                // Ecouteur Scroll
                var evt_scroll = _throttle(function() {
                    if((window.pageYOffset || document.documentElement.scrollTop) > window.innerHeight * (_config.scrollPercent != undefined ? _config.scrollPercent : .1)) { // 10%
                        consent = __cmp.save_consent(_consent_family(63)); // consentement par Scroll

                        window.removeEventListener('scroll', evt_scroll);
                    }
                }, 200, { trailing: true, leading: true });
                window.addEventListener('scroll', evt_scroll);
            }
        }

        // Exemple d'appels:
        // window.__cmp('ping', {}, function(e){ console.log(e) })
        // window.__cmp('getConsentData', {}, function(e){ console.log(e) })
        // window.__cmp('getVendorConsents', {}, function(e){ console.log(e) })

        // Joue les appels stockés avant le chargement de la cmp
        (_cmpStub_commandQueue || []).forEach(function(param) {
            __cmp(param.command, param.parameter || null, param.callback || function(){return null;});
        });
    };

    var vendorlist = (function (u) {
        var local_vendorlist = JSON.parse(window.localStorage.getItem(cn+'-vendorlist'));

        // On stocke la liste qu'une semaine en local storage
        if(!local_vendorlist || ((new Date()).getTime() - window.localStorage.getItem(cn+'-vendorlist-update') > 604800000)) { // 7 jours

            var xhr = new XMLHttpRequest();
            xhr.open('GET', u, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                var status = xhr.status;
                if (status === 200) {

                        vendorlist = xhr.response;
                        window.localStorage.setItem(cn+'-vendorlist-update', (new Date()).getTime());
                        window.localStorage.setItem(cn+'-vendorlist', JSON.stringify(xhr.response));

                        _init(true);
                }
            };

            return xhr.send();

        } else {
            return local_vendorlist;

        }
    })('https://vendorlist.consensu.org/vendorlist.json'); // Url liste globale vendor https://vendorlist.consensu.org/v-versionnum/vendorlist.json

    _init();

})('sipacmp');
