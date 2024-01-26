module.exports = class GameManager {
    constructor(windowManager) {
        this.WindowManager = windowManager;
    }

    WindowManager = null;

    StartGame() {
        this.WindowManager.createWindow();
    }
}