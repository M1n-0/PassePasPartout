document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    const domain = window.location.hostname;  // Obtenir le domaine actuel

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "fillCredentials") {
        const usernameField = document.querySelector('input[type="text"], input[type="email"], input[name="username"], input[id="username"]');
        const passwordField = document.querySelector('input[type="password"]');

        if (usernameField && passwordField) {
            usernameField.value = request.username;
            passwordField.value = request.password;
        }
    }
    });


    if (loginForm) {
        loginForm.addEventListener('submit', function() {
            const username = document.querySelector('#username').value;
            const password = document.querySelector('#password').value;

            // Envoyer un message au script de fond pour enregistrer les données
            chrome.runtime.sendMessage({
                action: 'save',
                domain: domain,
                username: username,
                password: password
            });
        });

        // Demander les données sauvegardées si disponibles
        chrome.runtime.sendMessage({action: 'load', domain: domain}, function(response) {
            if (response) {
                document.querySelector('#username').value = response.username || '';
                document.querySelector('#password').value = response.password || '';
            }
        });
    }
});
