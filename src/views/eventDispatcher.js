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

    // console.log(customEventData);

    // var event = new CustomEvent("gameEvent", {
    //     bubbles: true,
    //     detail: customEventData,
    // });


    ipc.send("gameEvent", customEventData);
}


