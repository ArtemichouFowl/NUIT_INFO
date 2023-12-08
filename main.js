document.addEventListener('DOMContentLoaded', function () {
    const game = document.getElementById('game');
    const golden = document.getElementById('key');
    const sections = document.querySelectorAll('.section');
    const popupElement = document.getElementById('popup');
    const music = document.getElementById('myMusic');
    let musicData =
        '0001010101010101000101010001010100010101000101010001010101010101000101010101010100010101010101010001010101010101000101010101010100010001000100010001000110010001000100010001000100010001000100010001010101010101000101010101010100010101010101010001010101010101000101010101010100010101010101010001010101010101000101010101010100010001000100010001000100010001000100010001000100010001000100010001010101010101000101010101010100010101010101010001010101010101000100000000000'.split('')
    let musicBass = ''.split('')

    let dataIndex = 0;
    let bpm = 88;
    let beatDuration = 60000 / bpm;
    let musicStarted = false;

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
        if (dataIndex === 50) { // Exemple : changer le BPM après 50 rectangles
            bpm = 88; // Nouveau BPM
            beatDuration = 60000 / bpm;
            music.playbackRate = 1; // Augmenter la vitesse de lecture de la musique
        }

        if (musicData[dataIndex] === '1') {
            const rectangle = document.createElement('div');
            rectangle.classList.add('rectangle');
            rectangle.style.width = sections[0].clientWidth + 'px';

            const randomSectionIndex = Math.floor(Math.random() * sections.length);
            const selectedSection = sections[randomSectionIndex];
            rectangle.style.left = selectedSection.offsetLeft + 'px';

            game.appendChild(rectangle);

            let animationRunning = true;

            const animation = rectangle.animate([
                { top: '-50px' },
                { top: '100%' }
            ], {
                duration: 3000,
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
                        rectangle.classList.add('in-golden');
                    } else if (keyPressedMap['g'] && randomSectionIndex === 1) {
                        rectangle.classList.add('in-golden');
                    } else if (keyPressedMap['h'] && randomSectionIndex === 2) {
                        rectangle.classList.add('in-golden');
                    }
                } else {
                    rectangle.classList.remove('in-golden');
                    inGoldenZone = false;
                }

                if (animationRunning) {
                    requestAnimationFrame(checkCollision);
                }

                if (distanceToGolden < 50 && !musicStarted) { // 50 est un seuil arbitraire
                    music.play();
                    musicStarted = true;

                }
            }

            checkCollision();
        }

        dataIndex++;
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

    function showPopup() {
        popupElement.style.display = 'block';
    }

});
