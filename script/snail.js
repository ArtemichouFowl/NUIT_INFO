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
    const texteBulle = "Très bien alors répond aux conséquences de tes actes.";
    bulleDialogue.querySelector('p').textContent = texteBulle;
    ouiButton.style.display = 'none';
    nonButton.style.display = 'none';


    playDinosaure();

    setTimeout(() => {
        bulleDialogue.style.display = 'none';
        escargot.src = 'style/img/dinosaur.png';
        retablirTailleNormaleEscargot();
        moveSound();

    }, 2000);


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
        const buttonSound = document.getElementById('soundControl');
        const goalPosition = buttonSound.getBoundingClientRect();

        bulleDialogue.style.display = 'none';
        escargot.style.left = rect.left + 10 + 'px';
        console.log(rect.left)
        //Vérifier si l'escargot a atteint la bouton volume
        if (rect.left >= goalPosition.left - 50) {
            document.removeEventListener('keydown', gestionnaireToucheDroite);
            bulleDialogue.style.top = rect.top - bulleDialogue.offsetHeight - 120 + 'px';
            bulleDialogue.style.left = rect.left + 'px';
            const texteBulle = "Merci beaucoup pour ton aide !";
            bulleDialogue.querySelector('p').textContent = texteBulle;
            bulleDialogue.style.display = 'block';
            setTimeout(() => {
                bulleDialogue.style.display = 'none';
                escargot.style.display = 'none';
            }, 2000);

        }

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


    const intervalId = setInterval(() => {
        const escargotRect = escargot.getBoundingClientRect();
        const rect = buttonSound.getBoundingClientRect();

        buttonSound.style.left = rect.left - 10 + 'px';

        // Vérifier si l'escargot et le bouton se touchent
        if (
            rect.right >= escargotRect.left &&
            rect.left <= escargotRect.right &&
            rect.bottom >= escargotRect.top &&
            rect.top <= escargotRect.bottom
        ) {
            clearInterval(intervalId);
            escargot.src = 'style/img/snail.gif';
            buttonSound.style.left = initialPosition.left + 'px';
            reinitialiserEtatInitial();
        }

        if (rect.left < -60 || rect.right > window.innerWidth) {
            buttonSound.style.left = initialPosition.left + 'px';
        }

    }, 10);
}


function playDinosaure() {
    const snail = document.getElementById('escargot');
    const jumpHeight = 120;

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



function reinitialiserEtatInitial() {
    const texteBulle = "Et toi, veux-tu bien m'aider à rejoindre le bouton volume ?";
    bulleDialogue.querySelector('p').textContent = texteBulle;
    bulleDialogue.style.display = 'none';
    retablirTailleNormaleEscargot();

    jumping = false;

    const ouiButton = document.getElementById('ouiButton');
    const nonButton = document.getElementById('nonButton');
    ouiButton.style.display = 'inline-block';
    nonButton.style.display = 'inline-block';
}



