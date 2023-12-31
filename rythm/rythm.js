document.addEventListener('DOMContentLoaded', function () {
    const game = document.getElementById('game');
    const golden = document.getElementById('key');
    const sections = document.querySelectorAll('.section');
    const popupElement = document.getElementById('popup');
    const music = document.getElementById('myMusic');
    let musicData = '0001010101010101000101010001010100010101000101010001010101010101000101010101010100010101010101010001010101010101000101010101010100010001000100010001000110010001000100010001000100010001000100010001010101010101000101010101010100010101010101010001010101010101000101010101010100010101010101010001010101010101000101010101010100010001000100010001000100010001000100010001000100010001000100010001010101010101000101010101010100010101010101010001010101010101000100000000000'.split('');
    let redInterval; // Variable pour stocker l'intervalle de création des rectangles rouges

    // Générer une nouvelle liste de 1 et de 0, commençant par 26 zéros
    const newListStr = '0000000000000000000000000001010001111110110011111110011110110010011000010101110111110000001001100111101001111011011111110000001011101000101011000100100011100110111000111001001100100101000111010000011101100111001000010010000100001110011000001001100101001101010111101111010100001110001111111011111111111001101011101011111101100011101111000011001101011011000101110011111000111011010011000000110011010101100001101001010101010101101';

    let dataIndex = 0;
    let redDataIndex = 0;
    let bpm = 88;
    let beatDuration = 60000 / bpm;
    let musicStarted = false;

    const progressBar = document.getElementById('progressBar');

    function updateProgressBar() {
        // Calculer la hauteur de la barre d'avancement
        const progressHeight = (dataIndex / musicData.length) * 100;
        // Mettre à jour la hauteur de la barre d'avancement
        progressBar.style.height = `${progressHeight}%`;
    }

    startButton.addEventListener('click', function () {
        startGame(); // Commence la séquence de jeu
        startButton.style.display = 'none'; // Cache le bouton
    });

    function startGame() {
        createRectangle();
    }

    let keyPressedMap = {
        'f': false,
        'g': false,
        'h': false
    };
    let inGoldenZone = false;

    document.addEventListener('keydown', function (event) {
        const key = event.key.toLowerCase();
        if (keyPressedMap[key] === undefined) return;

        if (!keyPressedMap[key]) {
            keyPressedMap[key] = true;
        }
    });

    document.addEventListener('keyup', function (event) {
        const key = event.key.toLowerCase();
        if (keyPressedMap[key] !== undefined) {
            keyPressedMap[key] = false;
        }
    });

    function createRectangle() {
        if (dataIndex === 70) { // Exemple : changer le BPM après 50 rectangles
            bpm = 176; // Nouveau BPM
            beatDuration = 60000 / bpm;
            music.playbackRate = 2; // Augmenter la vitesse de lecture de la musique
            // change la vidéo de fond
            // Assurez-vous que l'élément vidéo avec l'ID 'background' existe
            let backgroundVideo = document.getElementById('background');
            if (backgroundVideo) {
                // Change la source de la vidéo
                backgroundVideo.src = "Backgroundrythme1.m4v";
            } else {
                console.error("L'élément vidéo avec l'ID 'background' n'existe pas dans le DOM.");
            }
        }

        // Créer un rectangle normal ou rouge selon les données
        let rectangleType = musicData[dataIndex] === '1' ? 'rectangle' : (newListStr[redDataIndex] === '1' ? 'rectangle' : null);

        if (rectangleType) {
            const rectangle = document.createElement('div');
            rectangle.classList.add('rectangle');
            rectangle.style.width = sections[0].clientWidth + 'px';

            const randomSectionIndex = Math.floor(Math.random() * sections.length);
            const selectedSection = sections[randomSectionIndex];
            rectangle.style.left = selectedSection.offsetLeft + 'px';

            game.appendChild(rectangle);

            let animationRunning = true;
            const animationDuration = beatDuration * 4;
            const animation = rectangle.animate([
                { top: '-50px' },
                { top: '100%' }
            ], {
                duration: animationDuration,
                easing: 'linear'
            });

            animation.onfinish = function () {
                animationRunning = false;
                rectangle.remove();
            };

            function checkCollision() {
                const rect = rectangle.getBoundingClientRect();
                const goldenRect = golden.getBoundingClientRect();
                const distanceToGolden = goldenRect.top - rect.bottom;
                if (isRectangleInGolden(rectangle)) {
                    inGoldenZone = true;

                    if (keyPressedMap['f'] && randomSectionIndex === 0) {
                        rectangle.remove();
                        document.getElementById('f').style.display = 'none';
                        document.getElementById('fClic').style.display = 'block';
                        setTimeout(function () {
                            document.getElementById('fClic').style.display = 'none';
                            document.getElementById('f').style.display = 'block';
                        }, 200);
                    } else if (keyPressedMap['g'] && randomSectionIndex === 1) {
                        rectangle.remove();
                        document.getElementById('g').style.display = 'none';
                        document.getElementById('gClic').style.display = 'block';
                        setTimeout(function () {
                            document.getElementById('gClic').style.display = 'none';
                            document.getElementById('g').style.display = 'block';
                        }, 200);
                    } else if (keyPressedMap['h'] && randomSectionIndex === 2) {
                        rectangle.remove();
                        document.getElementById('h').style.display = 'none';
                        document.getElementById('hClic').style.display = 'block';
                        setTimeout(function () {
                            document.getElementById('hClic').style.display = 'none';
                            document.getElementById('h').style.display = 'block';
                        }, 200);
                    }
                } else {
                    inGoldenZone = false;
                    rectangle.classList.remove('in-golden');

                }

                if (animationRunning) {
                    requestAnimationFrame(checkCollision);
                }

                if (distanceToGolden < 50 && !musicStarted) { // 50 est un seuil arbitraire
                    music.play();
                    musicStarted = true;

                }
                if (isRectangleInDangerZone(rectangle)) {
                    document.getElementById('h').style.display = 'none';
                    document.getElementById('hClic').style.display = 'none';
                    document.getElementById('hMiss').style.display = 'block';
                    setTimeout(function () {
                        document.getElementById('hClic').style.display = 'none';
                        document.getElementById('h').style.display = 'block';
                        document.getElementById('hMiss').style.display = 'none';
                    }, 200);

                    document.getElementById('g').style.display = 'none';
                    document.getElementById('gClic').style.display = 'none';
                    document.getElementById('gMiss').style.display = 'block';
                    setTimeout(function () {
                        document.getElementById('gClic').style.display = 'none';
                        document.getElementById('g').style.display = 'block';
                        document.getElementById('gMiss').style.display = 'none';
                    }, 200);

                    document.getElementById('f').style.display = 'none';
                    document.getElementById('fClic').style.display = 'none';
                    document.getElementById('fMiss').style.display = 'block';
                    setTimeout(function () {
                        document.getElementById('fClic').style.display = 'none';
                        document.getElementById('f').style.display = 'block';
                        document.getElementById('fMiss').style.display = 'none';
                    }, 200);


                }
            }

            checkCollision();
        }

        dataIndex++;
        updateProgressBar();
        if (dataIndex < musicData.length) {
            setTimeout(createRectangle, beatDuration);
        }
    }
    function isRectangleInGolden(rectangle) {
        const rect = rectangle.getBoundingClientRect();
        const goldenRect = golden.getBoundingClientRect();

        return (
            rect.bottom > goldenRect.top &&
            rect.top < goldenRect.bottom &&
            rect.right > goldenRect.left &&
            rect.left < goldenRect.right
        );

    }

    function isRectangleInDangerZone(rectangle) {
        const rect = rectangle.getBoundingClientRect();
        const dangerZoneRect = document.querySelector('.dangerzone').getBoundingClientRect();

        return (
            rect.top >= dangerZoneRect.top &&
            rect.top <= dangerZoneRect.bottom &&
            rect.right > dangerZoneRect.left &&
            rect.left < dangerZoneRect.right
        );
    }

    function showPopup() {
        popupElement.style.display = 'block';
    }

});
