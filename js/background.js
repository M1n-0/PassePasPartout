chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "save") {
        chrome.storage.local.set({[request.domain]: request.credentials}, function() {
            console.log('Données sauvegardées pour ' + request.domain);
            sendResponse({status: "Success"});
        });
        return true; // Indiquer une réponse asynchrone
    } else if (request.action === "load") {
        chrome.storage.local.get(request.domain, function(result) {
            if (result[request.domain]) {
                sendResponse(result[request.domain]);
            } else {
                sendResponse(null);
            }
        });
        return true; // Indiquer une réponse asynchrone
    } else if (request.action === "getAll") {
        chrome.storage.local.get(null, function(items) {
            sendResponse(items);
        });
        return true; // Indiquer une réponse asynchrone
    } else if (request.action === "delete") {
        chrome.storage.local.remove(request.domain, function() {
            console.log('Données supprimées pour ' + request.domain);
            sendResponse({status: "Success"});
        });
        return true; // Indiquer une réponse asynchrone
    }
});
