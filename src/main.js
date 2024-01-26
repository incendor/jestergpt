
const { app, BrowserWindow } = require('electron')

const WindowManager = require('./services/windowManager.js')
const GameManager = require('./services/gameManager.js')
const ConfigManager = require('./services/configManager.js')
const PromptManager = require('./services/promptManager.js')
const GptManager = require('./services/gptManager.js')


app.whenReady().then(() => {
    var mgr = new WindowManager();
    var conf = new ConfigManager();
    var gpt = new GptManager(conf);
    var prompt = new PromptManager(gpt);
    var game = new GameManager(mgr, conf, prompt);
    game.StartGame();
})