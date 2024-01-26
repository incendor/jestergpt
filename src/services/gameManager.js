const { app } = require('electron')

module.exports = class GameManager {
    constructor(windowManager, app) {
        this.WindowManager = windowManager;
        this.IPC = require('electron').ipcMain;
    }

    IPC = null;
    WindowManager = null;

    StartGame() {
        this.IPC.on("gameEvent", (event, data) => {
            this.HandleGameEvent(event, data);
        });
        this.WindowManager.CreateWindow();
        this.WindowManager.LoadMenu();
    }

    HandleGameEvent(event, data) {
        console.log(data);

        if (data.eventName == "changeScene") {
            this.HandleChangeScene(data.jsonData.scene)
        }
        if (data.eventName == "quitGame") {
            app.quit()
        }
    }

    HandleChangeScene(scene) {
        this.WindowManager.LoadScene(scene)
    }
}