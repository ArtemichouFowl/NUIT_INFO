document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('backgroundMusic');
    const toggleSoundButton = document.getElementById('toggleSound');

    // Ajouter un gestionnaire d'événement au bouton pour le contrôle du son
    toggleSoundButton.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            toggleSoundButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        } else {
            audio.pause();
            toggleSoundButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
    });
});
