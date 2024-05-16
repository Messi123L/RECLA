// Sélection du formulaire
const claimForm = document.querySelector('#claim-form');

// Sélection de la liste des réclamations
const claimList = document.querySelector('#claim-list ul');

// Écouteur d'événement pour la soumission du formulaire
claimForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupération des valeurs du formulaire
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const phone = document.querySelector('#phone').value;
    const screenshot = document.querySelector('#screenshot').files[0]; // Capture d'écran

    // Validation des champs (vous pouvez ajouter des règles de validation supplémentaires)
    if (title.trim() === '' || description.trim() === '' || phone.trim() === '' || !screenshot) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return; // Arrête la fonction si les champs ne sont pas valides
    }

    // Création d'un élément de liste pour la réclamation soumise
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>${title}</strong>
        <p><strong>Description :</strong> ${description}</p>
        <p><strong>Numéro de Téléphone :</strong> ${phone}</p>
        <p><strong>Capture d'écran :</strong> <img src="${URL.createObjectURL(screenshot)}" alt="Capture d'écran"></p>
        <button class="edit-button">Modifier</button>
        <button class="delete-button">Supprimer</button>
    `;

    // Ajout d'un écouteur d'événement pour le clic sur le bouton de modification
    listItem.querySelector('.edit-button').addEventListener('click', function() {
        const newTitle = prompt("Nouveau titre pour cette réclamation :", title);
        const newDescription = prompt("Nouvelle description pour cette réclamation :", description);
        const newPhone = prompt("Nouveau numéro de téléphone pour cette réclamation :", phone);

        // Création d'un champ input de type 'file' pour la sélection de la nouvelle capture d'écran
        const newScreenshotInput = document.createElement('input');
        newScreenshotInput.type = 'file';
        newScreenshotInput.accept = 'image/*';
        newScreenshotInput.style.display = 'none'; // Cacher le champ input

        // Ajout d'un écouteur d'événement pour le changement de fichier
        newScreenshotInput.addEventListener('change', function() {
            const newScreenshotFile = this.files[0];
            const reader = new FileReader();

            reader.onload = function(event) {
                const newScreenshotURL = event.target.result;
                listItem.querySelector('img').src = newScreenshotURL;
            };

            reader.readAsDataURL(newScreenshotFile);
        });

        // Clic automatique sur le champ input pour ouvrir la boîte de dialogue de sélection de fichier
        newScreenshotInput.click();

        if (newTitle && newDescription && newPhone) {
            listItem.querySelector('strong').textContent = newTitle;
            listItem.querySelector('p:nth-child(2)').textContent = `Description : ${newDescription}`;
            listItem.querySelector('p:nth-child(3)').textContent = `Numéro de Téléphone : ${newPhone}`;
        }
    });

    // Ajout d'un écouteur d'événement pour le clic sur le bouton de suppression
    listItem.querySelector('.delete-button').addEventListener('click', function() {
        listItem.remove();
    });

    // Ajout de l'élément de liste à la liste des réclamations
    claimList.appendChild(listItem);

    // Réinitialisation du formulaire après soumission
    claimForm.reset();
});
