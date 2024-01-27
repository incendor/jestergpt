let introTheme = null;
let mainTheme = null;

if (mainTheme == null) {
    mainTheme = new Audio('../../resources/audio/main_theme.mp3');
}
if (introTheme == null) {
    introTheme = new Audio('../../resources/audio/intro.mp3');
    addAudioEventListener();
}


function addAudioEventListener() {
    introTheme.addEventListener("canplaythrough", (event) => {
        /* the audio is now playable; play it if permissions allow */
        introTheme.play();
    });

    introTheme.addEventListener("ended", (event) => {
        mainTheme.loop = true;
        mainTheme.play();
    });
}