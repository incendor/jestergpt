let introTheme = null;
let mainTheme = null;
let playCardSoundHandle = new Audio('../../resources/audio/play_card.mp3');
let undoSoundHandle = new Audio('../../resources/audio/undo.mp3');
let thinkingSoundHandle = new Audio('../../resources/audio/thinking.mp3');

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

function playPlayCardSound() {
    console.log("Sound");
    playCardSoundHandle.play();
}

function playUndoSound() {
    undoSoundHandle.play();
}

function playThinkingSound() {
    thinkingSoundHandle.play();
}