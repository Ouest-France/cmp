;(function(cn, w, doc, url_full, script_id){
    // Création du cmp minimal receuillant les demandes pendant le chargement du "gros" cmp en asynchrone footer
    // CF norme IAB :
    // https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md#what-is-sequence-of-the-stub-installation-and-loading-of-the-cmp-script-

    w.__cmp = (function() {

        // CMP IAB documentation complete
        // https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md
        var commandQueue = [];
        var cmp = function(command, parameter, callback) {
            if (command === 'ping') {
                if (callback) {
                    callback({
                        gdprAppliesGlobally: !!(cmp && cmp.config && cmp.config.storeConsentGlobally),
                        cmpLoaded: false
                    });
                }
            } else {
                commandQueue.push({
                    command: command,
                    parameter: parameter,
                    callback: callback
                });
            }
        }
        cmp.commandQueue = commandQueue;
        cmp.config = w.__cmp && w.__cmp.config ? w.__cmp.config : {};

        // Création de l'écouteur pour que les pubs DANS des iframes puissent communiquer avec notre CMP
        // CF norme IAB :
        // https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md#how-can-vendors-that-use-iframes-call-the-cmp-api-from-an-iframe-
        cmp.receiveMessage = function(event) {
            var data = event && event.data && event.data.__cmpCall;
            // Si c'est un message cmp (dont l'objet __cmpCall éxiste)
            if (data) {
                commandQueue.push({
                    command: data.command,
                    parameter: data.parameter,
                    callback: function(retValue, success) {
                        var returnMsg = {"__cmpReturn": {
                            "returnValue": retValue,
                            "success": success,
                            "callId": data.callId
                        }};
                        event.source.postMessage(msgIsString ? JSON.stringify(returnMsg) : returnMsg, '*');
                    }
                });
            }
        };
        // Création de l'écouteur
        var listen = w.attachEvent || w.addEventListener;
        listen('message', function(event) {
            w.__cmp.receiveMessage(event);
        }, false);

        // Création de l'iframe locator permettant aux pubs de déterminer qu'on a bien une CMP à dispo
        // CF norme IAB :
        // https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md#how-can-callers-determine-if-there-is-a-cmp-present-
        function addLocatorFrame() {
            if (!w.frames['__cmpLocator']) {
                if (doc.body) {
                    var frame = doc.createElement('iframe');
                    frame.style.display = 'none';
                    frame.name = '__cmpLocator';
                    doc.body.appendChild(frame);
                } else {
                    setTimeout(addLocatorFrame, 50);
                }
            }
        }
        addLocatorFrame();

        return cmp;
    }());

    // Ajout du "gros" script cmp complet en asynchrone
    if (!document.getElementById(script_id)) {
        var e = doc.createElement("script"),
            s = doc.getElementsByTagName("script")[0];
        e.async = 1;
        e.src = url_full;
        e.type = "text/javascript";
        e.id = script_id;
        s.parentNode.insertBefore(e, s);
    }

})('sipacmp', window, document, 'https://sipaof.mgr.consensu.org/sipacmp/sipa-cmp.min.js', 'sipacmp_loader');
