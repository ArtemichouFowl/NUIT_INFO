document.addEventListener('DOMContentLoaded', function () {
    const game = document.getElementById('game');
    const golden = document.getElementById('key');
    const sections = document.querySelectorAll('.section');

    function createRectangle() {
        const rectangle = document.createElement('div');
        rectangle.classList.add('rectangle');
        rectangle.style.width = sections[0].clientWidth + 'px';
        const randomSection = sections[Math.floor(Math.random() * sections.length)];
        rectangle.style.left = randomSection.offsetLeft + 'px';
        game.appendChild(rectangle);

        let animationRunning = true;

        // Anime le rectangle pour qu'il tombe
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
            if (isRectangleInGolden(rectangle)) {
                console.log('Rectangle dans la zone dorée !');
                rectangle.classList.add('in-golden');
                animationRunning = false; // Arrête de vérifier après la première collision
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

    setInterval(createRectangle, 2000);
});
