document.addEventListener('DOMContentLoaded', function() {
    const credentialsList = document.getElementById('credentialsList');
    const backButton = document.getElementById('backButton');
    const template = document.getElementById('credential-template').content;

    backButton.addEventListener('click', function() {
        window.location.href = 'popup.html';
    });

    function loadCredentials() {
        chrome.runtime.sendMessage({action: 'getAll'}, function(response) {
            credentialsList.innerHTML = '';
            for (const [domain, creds] of Object.entries(response)) {
                const listItem = document.importNode(template, true);

                listItem.querySelector('.domain').textContent = domain;
                listItem.querySelector('.username').textContent = creds.username;
                listItem.querySelector('.copy-username').setAttribute('data-username', creds.username);
                listItem.querySelector('.password').setAttribute('data-password', creds.password);
                listItem.querySelector('.copy-password').setAttribute('data-password', creds.password);
                listItem.querySelector('.delete-credentials').setAttribute('data-domain', domain);

                credentialsList.appendChild(listItem);
            }

            // Ajouter des gestionnaires d'événements pour les boutons de copie
            document.querySelectorAll('.copy-username').forEach(button => {
                button.addEventListener('click', function() {
                    const username = this.getAttribute('data-username');
                    navigator.clipboard.writeText(username).then(() => {
                        alert("Username copié!");
                    });
                });
            });

            document.querySelectorAll('.copy-password').forEach(button => {
                button.addEventListener('click', function() {
                    const password = this.getAttribute('data-password');
                    navigator.clipboard.writeText(password).then(() => {
                        alert("Password copié!");
                    });
                });
            });

            // Ajouter des gestionnaires d'événements pour les boutons de visibilité des mots de passe
            document.querySelectorAll('.toggle-password').forEach(button => {
                button.addEventListener('click', function() {
                    const passwordSpan = this.closest('.credential-item').querySelector('.password');
                    const isHidden = passwordSpan.textContent === '********';
                    passwordSpan.textContent = isHidden ? passwordSpan.getAttribute('data-password') : '********';
                    this.textContent = isHidden ? '🙈' : '👁️';
                });
            });

            // Ajouter des gestionnaires d'événements pour les boutons de suppression
            document.querySelectorAll('.delete-credentials').forEach(button => {
                button.addEventListener('click', function() {
                    const domain = this.getAttribute('data-domain');
                    if (confirm(`Êtes-vous sûr de vouloir supprimer les identifiants pour ${domain} ?`)) {
                        chrome.runtime.sendMessage({action: 'delete', domain: domain}, function(response) {
                            loadCredentials();
                        });
                    }
                });
            });
        });
    }

    loadCredentials();
});
