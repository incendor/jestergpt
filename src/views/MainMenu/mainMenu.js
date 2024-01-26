registerEventDispatcher("btn_start", "click", "changeScene", { scene: "Game" });
registerEventDispatcher("btn_api_key", "click", "changeScene", { scene: "Config" });
registerEventDispatcher("btn_quit", "click", "quitGame", null);