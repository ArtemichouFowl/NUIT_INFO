const escargot = document.getElementById('escargot');
const bulleDialogue = document.getElementById('bulleDialogue');
const bave = document.getElementById('bave');

escargot.addEventListener('click', () => {
    if (bulleDialogue.style.display === 'block') {
        fermerBulleDialogue();
        retablirTailleNormaleEscargot();
    } else {
        agrandirEscargot();
        afficherBulleDialogue();
    }
});

function agrandirEscargot() {
    escargot.style.width = '100px';
    escargot.style.transition = 'width 0.5s ease';
}

function retablirTailleNormaleEscargot() {
    escargot.style.width = ''; // Rétablir la taille par défaut
}

function afficherBulleDialogue() {
    // Positionne la bulle de dialogue au-dessus de l'escargot
    const rect = escargot.getBoundingClientRect();
    bulleDialogue.style.top = rect.top - bulleDialogue.offsetHeight - 120 + 'px';
    bulleDialogue.style.left = rect.left + 70 + 'px';

    // Affichez la bulle de dialogue
    bulleDialogue.style.display = 'block';
}

function fermerBulleDialogue() {
    // Masquez la bulle de dialogue
    bulleDialogue.style.display = 'none';
}

function accepterAide() {
    const texteBulle = "Maintenant, appuie sur la flèche droite pour avancer vers la droite.";
    bulleDialogue.querySelector('p').textContent = texteBulle;
    document.addEventListener('keydown', gestionnaireToucheDroite);

    ouiButton.style.display = 'none';
    nonButton.style.display = 'none';
}

function refuserAide() {
    const escargot = document.getElementById('escargot');
    const texteBulle = "Très bien alors répond aux conséquences de tes actes.";
    bulleDialogue.querySelector('p').textContent = texteBulle;
    ouiButton.style.display = 'none';
    nonButton.style.display = 'none';

    setTimeout(() => {
        bulleDialogue.style.display = 'none';
        escargot.src = 'style/img/dinosaur.png';
        playDinosaur();
    }, 3000);


}

function ajouterFleur(top, left) {
    const fleur = document.createElement('img');
    fleur.src = 'style/img/flower.png';
    fleur.className = 'fleur';
    fleur.style.top = top - 15 + 'px';
    fleur.style.left = left + 'px';
    document.body.appendChild(fleur);
}

function gestionnaireToucheDroite(event) {
    if (event.key === 'ArrowRight') {
        const rect = escargot.getBoundingClientRect();
        bulleDialogue.style.display = 'none';
        escargot.style.left = rect.left + 10 + 'px';


        // Laisser une trace (bave) derrière l'escargot
        const nouvelleBave = document.createElement('div');
        nouvelleBave.className = 'bave';
        nouvelleBave.style.left = rect.left + 'px';
        nouvelleBave.style.top = rect.top + 75 + 'px';

        document.body.appendChild(nouvelleBave);

        setTimeout(() => {
            const rect = nouvelleBave.getBoundingClientRect();
            ajouterFleur(rect.top, rect.left);
        }, 3000);
    }
}



function playDinosaur() {
    const buttonSound = document.getElementById('soundControl');
    const intervalId = setInterval(() => {
        const rect = buttonSound.getBoundingClientRect();
        buttonSound.style.left = rect.left - 10 + 'px';
    }, 10);

}
