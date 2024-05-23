document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const saveButton = document.getElementById('saveButton');
    const loadButton = document.getElementById('loadButton');

    // Enregistrement des données
    saveButton.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Envoyer un message au script de fond pour enregistrer les données
        chrome.storage.local.set({username: username, password: password}, function() {
            if (chrome.runtime.lastError) {
                alert('Error saving credentials: ' + chrome.runtime.lastError.message);
            } else {
                alert('Credentials saved successfully!');
                // Optionnel: nettoyer les champs après sauvegarde
                usernameInput.value = '';
                passwordInput.value = '';
            }
        });
    });

    loadButton.addEventListener('click', function() {
        chrome.storage.local.get(['username', 'password'], function(result) {
            if (result.username && result.password) {
                // Envoyer les identifiants au script de contenu pour remplir le formulaire
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "fillCredentials",
                        username: result.username,
                        password: result.password
                    });
                });
            } else {
                alert('No saved credentials found!');
            }
        });
    });
});
