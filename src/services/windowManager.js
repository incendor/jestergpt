const { BrowserWindow } = require("electron")

module.exports = class WindowManager {
    constructor() {

    }

    win = null;

    CreateWindow() {
        this.win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        });
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