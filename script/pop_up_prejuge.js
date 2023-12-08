let upgrade_button = document.getElementById('upgrade_button')

upgrade_button.addEventListener('click', handleUpgradeButton);

function handleUpgradeButton() {
    if(isUpgradable()){
        createQuestionModal()
        updateModalQuestion()
    }

}

function createQuestionModal() {
    // Création du div modal
    var modal = document.createElement("div");
    modal.classList.add("modal");
    modal.setAttribute("id", "modal");

    // Création du fond du modal (backdrop)
    var modalBack = document.createElement("div");
    modalBack.classList.add("modal-back");
    modal.appendChild(modalBack);

    // Création du conteneur du modal
    var modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    modal.appendChild(modalContainer);

    // Création du titre (h1)
    var title = document.createElement("h1");
    title.textContent = "Cette affirmation est-elle vraie ?";
    modalContainer.appendChild(title);

    // Création du paragraphe pour la question
    var questionParagraph = document.createElement("p");
    questionParagraph.setAttribute("id", "question_modal");
    questionParagraph.textContent = "question";
    modalContainer.appendChild(questionParagraph);

    var trueButton = document.createElement("button");
    trueButton.setAttribute("id", "button_true_answer");
    trueButton.textContent = "Vrai";
    modalContainer.appendChild(trueButton);
    trueButton.addEventListener('click', handleTrueButton); // Attacher le gestionnaire ici

    var falseButton = document.createElement("button");
    falseButton.setAttribute("id", "button_false_answer");
    falseButton.textContent = "Faux";
    modalContainer.appendChild(falseButton);
    falseButton.addEventListener('click', handleFalseButton); // Attacher le gestionnaire ici


    // Création du lien pour fermer le modal
    var closeModalLink = document.createElement("a");
    closeModalLink.setAttribute("href", "#");
    closeModalLink.setAttribute("id", "modal-close");
    closeModalLink.textContent = "[fermer]";

    closeModalLink.addEventListener('click', function (e) {
        e.preventDefault();
        modal.remove()
    });


    modalContainer.appendChild(closeModalLink);

    // Ajout du modal à la fin du body
    document.body.appendChild(modal);

}

function updateModalQuestion(){

    let modal_question = document.getElementById('question_modal')
    modal_question.textContent = questionJSONArr[treeState].titre
}


function createReponseModal(titleText, responseText) {
    // Vérifier si la modale de réponse existe déjà
    var existingModal = document.getElementById('modal_reponse');
    if (!existingModal) {
        // Création de la modale de réponse si elle n'existe pas
        var modal = document.createElement("div");
        modal.classList.add("modal");
        modal.setAttribute("id", "modal_reponse");

        // Création du fond du modal (backdrop)
        var modalBack = document.createElement("div");
        modalBack.classList.add("modal-back");
        modal.appendChild(modalBack);

        // Création du conteneur du modal
        var modalContainer = document.createElement("div");
        modalContainer.classList.add("modal-container");
        modal.appendChild(modalContainer);

        // Création du titre (h1)
        var title = document.createElement("h1");
        title.setAttribute("id", "solution");
        title.textContent = titleText; // Utilisation du paramètre pour le titre
        modalContainer.appendChild(title);

        // Création du paragraphe pour la réponse
        var response = document.createElement("p");
        response.setAttribute("id", "reponse");
        response.textContent = responseText; // Utilisation du paramètre pour le texte de réponse
        modalContainer.appendChild(response);

        // Création du lien pour fermer le modal
        var closeModal = document.createElement("a");
        closeModal.setAttribute("href", "#");
        closeModal.setAttribute("id", "modal-close_reponse");
        closeModal.textContent = "[fermer]";
        closeModal.addEventListener('click', function (e) {
            e.preventDefault();
            modal.remove()
        });
        modalContainer.appendChild(closeModal);

        // Ajout du modal à la fin du body
        document.body.appendChild(modal);


    } else {
        // Si la modale existe déjà, mettre à jour le contenu et afficher la modale
        existingModal.querySelector("#solution").textContent = titleText;
        existingModal.querySelector("#reponse").textContent = responseText;
        existingModal.style.display = 'block';
    }
}





function closeModal() {
    var modal = document.getElementById('modal');
    modal.remove()
    if (modal) {
        modal.style.display = 'none';
    }
    var modalReponse = document.getElementById('modal_reponse');
    modalReponse.remove()
    if (modalReponse) {
        modalReponse.style.display = 'none';
    }


}


// Gestionnaire pour le true_button
function handleTrueButton() {

    if(questionJSONArr[treeState].solution == true){

        createReponseModal("Bravo !",questionJSONArr[treeState].reponse)
        upgradeTree()

    }else {

        createReponseModal("Tu as perdu !",questionJSONArr[treeState].reponse)
        wrongAnswer()

    }
    var modal = document.getElementById('modal');
    modal.remove()

}

// Gestionnaire pour le false_button
function handleFalseButton() {

    if(questionJSONArr[treeState].solution == false){

        createReponseModal("Bravo !",questionJSONArr[treeState].reponse)
        upgradeTree()

    }else {

        createReponseModal("Tu as perdu !",questionJSONArr[treeState].reponse)
        wrongAnswer()

    }

    var modal = document.getElementById('modal');
    modal.remove()


}