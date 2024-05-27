document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const saveButton = document.getElementById('saveButton');
    const loadButton = document.getElementById('loadButton');
    const showListButton = document.getElementById('showListButton');
    const statusMessage = document.getElementById('statusMessage');

    // Fonction pour sauvegarder les identifiants
    saveButton.addEventListener('click', function() {
        // Obtenir l'URL active pour déterminer le domaine
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs.length === 0) {
                statusMessage.textContent = "Aucun onglet actif trouvé!";
                setTimeout(() => statusMessage.textContent = "", 3000);
                return;
            }
            const domain = new URL(tabs[0].url).hostname;
            const credentials = {
                username: usernameInput.value,
                password: passwordInput.value
            };

            // Envoyer un message au script de fond pour sauvegarder les identifiants
            chrome.runtime.sendMessage({
                action: 'save',
                domain: domain,
                credentials: credentials
            }, function(response) {
                // Afficher un message de succès et réinitialiser les champs de saisie
                statusMessage.innerHTML = "Enregistré avec succès! <img src='../assets/img/passepartout-ok.png' alt='Success' style='width:20px;height:20px;vertical-align:middle;'>";
                setTimeout(() => statusMessage.textContent = "", 3000);
                usernameInput.value = '';
                passwordInput.value = '';
            });
        });
    });

    // Fonction pour charger les identifiants pour le domaine actuel
    loadButton.addEventListener('click', function() {
        // Obtenir l'URL active pour déterminer le domaine
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs.length === 0) {
                statusMessage.textContent = "Aucun onglet actif trouvé!";
                setTimeout(() => statusMessage.textContent = "", 3000);
                return;
            }
            const domain = new URL(tabs[0].url).hostname;
            // Envoyer un message au script de fond pour charger les identifiants
            chrome.runtime.sendMessage({action: 'load', domain: domain}, function(response) {
                if (response && response.username !== undefined && response.password !== undefined) {
                    // Remplir les champs de saisie avec les identifiants chargés
                    usernameInput.value = response.username || '';
                    passwordInput.value = response.password || '';
                    statusMessage.textContent = "Identifiants chargés!";
                } else {
                    statusMessage.textContent = "Aucun identifiant enregistré trouvé!";
                }
                setTimeout(() => statusMessage.textContent = "", 3000);
            });
        });
    });

    // Fonction pour naviguer vers la page de la liste des identifiants
    showListButton.addEventListener('click', function() {
        window.location.href = 'credentials.html';
    });
});
