
const { app, BrowserWindow } = require('electron')

const WindowManager = require('./services/windowManager.js')
const GameManager = require('./services/gameManager.js')
const ConfigManager = require('./services/configManager.js')
const PromptManager = require('./services/promptManager.js')


app.whenReady().then(() => {
    var mgr = new WindowManager();
    var conf = new ConfigManager();
    var prompt = new PromptManager();
    var game = new GameManager(mgr, conf, prompt);
    game.StartGame();
})