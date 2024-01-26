
const { app, BrowserWindow } = require('electron')

const WindowManager = require('./services/windowManager.js')
const GameManager = require('./services/gameManager.js')


app.whenReady().then(() => {
    var mgr = new WindowManager();
    var game = new GameManager(mgr);
    game.StartGame();
})