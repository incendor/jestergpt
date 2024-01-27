const { app } = require('electron')

module.exports = class GameManager {
    constructor(windowManager, configManager, promptManager) {
        this.WindowManager = windowManager;
        this.ConfigManager = configManager;
        this.PromptManager = promptManager;
        this.IPC = require('electron').ipcMain;
    }

    IPC = null;
    WindowManager = null;
    ConfigManager = null;
    PromptManager = null;

    StartGame() {
        this.RegisterIPC();
        this.WindowManager.CreateWindow();
        this.WindowManager.LoadMenu();
    }

    async HandleGameEvent(event, data) {
        console.log(data);

        if (data.eventName == "changeScene") {
            this.HandleChangeScene(data.jsonData.scene)
        }
        if (data.eventName == "quitGame") {
            app.quit()
        }
        if (data.eventName == "saveApiKey") {
            await this.SaveApiKey(data.jsonData.key);
        }
    }

    HandleChangeScene(scene) {
        this.WindowManager.LoadScene(scene)
    }

    async SaveApiKey(data) {
        console.log(app.getPath('userData'));
        console.log(data);
        await this.ConfigManager.SetApiKey(data);
        this.WindowManager.LoadScene("MainMenu");
    }

    RegisterIPC() {
        this.IPC.on("gameEvent", (event, data) => {
            this.HandleGameEvent(event, data);
        });
        this.IPC.on("getApiKey", async (event, data) => {
            event.returnValue = await this.ConfigManager.GetApiKey();
        });
        this.IPC.on("getNewPrompt", (event, data) => {
            let result = this.PromptManager.GetNewPrompt();

            event.returnValue = result;
        });
        this.IPC.on("drawMissingCards", async (event, data) => {
            event.returnValue = await this.PromptManager.DrawMissingCards(data);
        });
        this.IPC.on("scorePrompt", async (event, data) => {
            event.returnValue = await this.PromptManager.ScorePrompt(data);
        });
        this.IPC.on("gameConfig", (event, data) => {
            event.returnValue = require('../resources/json/generalConfig.json');
        });
    }
}