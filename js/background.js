chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "save") {
        // Enregistrer les données en utilisant le domaine comme clé
        chrome.storage.local.set({[request.domain]: {username: request.username, password: request.password}}, function() {
            console.log('Data saved for ' + request.domain);
        });
    } else if (request.action === "load") {
        // Charger les données
        chrome.storage.local.get(request.domain, function(result) {
            if (result[request.domain]) {
                sendResponse(result[request.domain]);
            }
        });
        return true; // Indiquer une réponse asynchrone
    }
});
