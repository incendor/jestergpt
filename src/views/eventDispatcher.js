function registerEventDispatcher(id, event, module, eventName, data) {
    let element = document.getElementById(id);

    element.addEventListener(event, (eventData) => {
        dispatchCustomEvent(module, eventName, data, eventData);
    });
}

const ipc = require('electron').ipcRenderer;

function dispatchCustomEvent(module, eventName, data, originalEvent) {
    let customEventData = {
        moduleName: module,
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


