document.addEventListener('DOMContentLoaded', function () {
    const game = document.getElementById('game');
    const golden = document.getElementById('key');
    const sections = document.querySelectorAll('.section');

    let hasSpaceBeenPressed = false;

    document.addEventListener('keydown', function (event) {
        if (event.key === ' ' && !hasSpaceBeenPressed) {
            hasSpaceBeenPressed = true;
        }
    });

    function createRectangle() {
        const rectangle = document.createElement('div');
        rectangle.classList.add('rectangle');
        rectangle.style.width = sections[0].clientWidth + 'px';
        const randomSection = sections[Math.floor(Math.random() * sections.length)];
        rectangle.style.left = randomSection.offsetLeft + 'px';
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

            hasSpaceBeenPressed = false;
        };

        function checkCollision() {
            if (isRectangleInGolden(rectangle)) {
                rectangle.classList.add('in-golden');
                if (hasSpaceBeenPressed) {
                    console.log('Rectangle dans la zone dorée et touche Espace pressée !');
                    rectangle.style.backgroundColor = '#2ecc71';
                } else {
                    rectangle.style.backgroundColor = '#e74c3c';
                }
            }

            if (animationRunning) {
                requestAnimationFrame(checkCollision);
            } else {
                rectangle.classList.remove('in-golden');
                if (!hasSpaceBeenPressed) {
                    rectangle.style.backgroundColor = '#e74c3c';
                }
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

    setInterval(createRectangle, 2000);
});
