document.addEventListener('DOMContentLoaded', function () {
    const game = document.getElementById('game');
    const golden = document.getElementById('key');
    const sections = document.querySelectorAll('.section');
    const scoreElement = document.getElementById('score');
    const popupElement = document.getElementById('popup');
    const perduElement = document.getElementById('perdu');

    let score = 0;
    let keyPressedMap = {
        'a': false,
        'z': false,
        'e': false
    };
    let inGoldenZone = false;

    document.addEventListener('keydown', function (event) {
        const key = event.key.toLowerCase();
        if (keyPressedMap[key] === undefined) return;

        if (!keyPressedMap[key]) {
            keyPressedMap[key] = true;
            handleKeyPress(key);
        }
    });

    document.addEventListener('keyup', function (event) {
        const key = event.key.toLowerCase();
        if (keyPressedMap[key] !== undefined) {
            keyPressedMap[key] = false;
        }
    });

    function createRectangle() {
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
            checkGameOver();
        };

        function checkCollision() {
            if (isRectangleInGolden(rectangle)) {
                inGoldenZone = true;

                if (keyPressedMap['a'] && randomSectionIndex === 0) {
                    handleKeyPress('a');
                    rectangle.classList.add('in-golden');
                } else if (keyPressedMap['z'] && randomSectionIndex === 1) {
                    rectangle.classList.add('in-golden');
                    handleKeyPress('z');
                } else if (keyPressedMap['e'] && randomSectionIndex === 2) {
                    rectangle.classList.add('in-golden');
                    handleKeyPress('e');
                }
            } else {
                rectangle.classList.remove('in-golden');
                inGoldenZone = false;
            }

            if (animationRunning) {
                requestAnimationFrame(checkCollision);
            }
        }

        checkCollision();
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

    function handleKeyPress(key) {
        if (inGoldenZone) {
            console.log(`Rectangle dans la zone dorée et touche ${key} pressée !`);
            score++;
            scoreElement.textContent = `Score: ${score}`;
        }
    }

    function showPopup() {
        popupElement.style.display = 'block';
    }

    setInterval(createRectangle, 2000);
});
