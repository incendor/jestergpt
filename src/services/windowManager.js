const { BrowserWindow } = require("electron")

module.exports = class WindowManager {
    constructor() {

    }

    config = require('../resources/json/generalConfig.json');
    win = null;

    CreateWindow() {
        this.win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
            icon: 'resources/images/icon_red.png'
        });

        this.win.maximize();

        if (!this.config.debugMode) {
            this.win.setMenu(null);
        }
    }

    LoadMenu() {
        this.LoadScene('MainMenu');
    }


    LoadScene(scene) {
        let path = './views/' + scene + '/' + scene + '.html'
        this.SwitchScene(path);
    }


    SwitchScene(scene) {
        this.win.loadFile(scene);
    }
}