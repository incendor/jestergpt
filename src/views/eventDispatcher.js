function registerEventDispatcher(id, event, eventName, data) {
    let element = document.getElementById(id);

    element.addEventListener(event, (eventData) => {
        dispatchCustomEvent(eventName, data);
    });
}

const ipc = require('electron').ipcRenderer;

function dispatchCustomEvent(eventName, data) {
    let customEventData = {
        moduleName: null,
        eventName: eventName,
        jsonData: data,
    };

    ipc.send("gameEvent", customEventData);
}


function getApiKey() {
    console.log("ree");
    return ipc.sendSync('getApiKey', {})
}

function GetNewPrompt() {
    return ipc.sendSync('getNewPrompt', {})
}

function DrawMissingCards(currentCards) {
    return ipc.sendSync('drawMissingCards', currentCards);
}

function GetPromptScore(prompt) {
    return ipc.sendSync('scorePrompt', prompt);
}

function GetGameConfig() {
    return ipc.sendSync('gameConfig', {});
}

function NavigateTo(page) {
    dispatchCustomEvent("changeScene", { scene: page });
}