
const { app, BrowserWindow } = require('electron')

const WindowManager = require('./services/windowManager.js')
const GameManager = require('./services/gameManager.js')
const ConfigManager = require('./services/configManager.js')


app.whenReady().then(() => {
    var mgr = new WindowManager();
    var conf = new ConfigManager();
    var game = new GameManager(mgr, conf);
    game.StartGame();
})