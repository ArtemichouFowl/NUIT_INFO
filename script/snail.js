const escargot = document.getElementById('escargot');
const bulleDialogue = document.getElementById('bulleDialogue');
const bave = document.getElementById('bave');
let jumping = false;

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
    console.log(escargot.getBoundingClientRect().top);
    const texteBulle = "Très bien alors répond aux conséquences de tes actes.";
    bulleDialogue.querySelector('p').textContent = texteBulle;
    ouiButton.style.display = 'none';
    nonButton.style.display = 'none';

    playDinosaure();
    setTimeout(() => {
        bulleDialogue.style.display = 'none';
        escargot.src = 'style/img/dinosaur.png';
        moveSound();

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



function moveSound() {
    const buttonSound = document.getElementById('soundControl');
    const initialPosition = buttonSound.getBoundingClientRect();
    const escargot = document.getElementById('escargot');
    const escargotRect = escargot.getBoundingClientRect();
    const escargotTop = escargotRect.top;

    console.log('escargot x' + escargotRect.left)
    const intervalId = setInterval(() => {
        const rect = buttonSound.getBoundingClientRect();

        buttonSound.style.left = rect.left - 10 + 'px';
        console.log('button x' + escargotRect.left)
        if (rect.left < -60 || rect.right > window.innerWidth) {
            buttonSound.style.left = initialPosition.left + 'px';
        }
        else if (rect.left === escargotRect.left) {
            alert("Vous avez perdu");
        }

    }, 10);
}

function playDinosaure() {
    const snail = document.getElementById('escargot');
    const jumpHeight = 110;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp' && !jumping) {
            jumping = true;
            jump();
        }
    });

    function jump() {
        let jumpDistance = 0;

        const jumpInterval = setInterval(() => {
            snail.style.bottom = jumpDistance + 'px';

            jumpDistance += 5;

            if (jumpDistance >= jumpHeight) {
                clearInterval(jumpInterval);
                fall();
            }
        }, 10);
    }

    function fall() {
        const fallHeight = 0; // Hauteur à laquelle le dinosaure doit redescendre
        let fallDistance = jumpHeight;

        const fallInterval = setInterval(() => {
            snail.style.bottom = fallDistance + 'px';

            fallDistance -= 2;

            if (fallDistance <= fallHeight) {
                clearInterval(fallInterval);
                jumping = false;
            }
        }, 10);
    }
}



