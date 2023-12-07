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

        // Anime le rectangle pour qu'il tombe
        const animation = rectangle.animate([
            { top: '-20px' },
            { top: 'calc(100% + 20px)' }
        ], {
            duration: 3000,
            easing: 'linear'
        });

        animation.onfinish = function () {
            const rectangleRect = rectangle.getBoundingClientRect();
            console.log(`Position du rectangle: left=${rectangleRect.left}, top=${rectangleRect.top}`);

            if (isRectangleInGolden(rectangleRect)) {
                console.log('Rectangle dans la zone dorée !');
                rectangle.classList.add('in-golden');
            }
            rectangle.remove();
        };
    }

    function isRectangleInGolden(rectangleRect) {
        const goldenRect = golden.getBoundingClientRect();

        return (
            rectangleRect.left < goldenRect.right &&
            rectangleRect.right > goldenRect.left &&
            rectangleRect.top < goldenRect.bottom &&
            rectangleRect.bottom > goldenRect.top
        );
    }

    setInterval(createRectangle, 2000);
});
