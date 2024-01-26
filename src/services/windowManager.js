const { BrowserWindow } = require("electron")

module.exports = class WindowManager {
    constructor() {

    }

    createWindow() {
        const win = new BrowserWindow({
            width: 800,
            height: 600
        })

        win.loadFile('index.html');
    }
}