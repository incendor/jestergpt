let input = document.getElementById("api_key");


var say = document.getElementById("btn_save_key");

say.addEventListener("click", () => {
    dispatchCustomEvent("saveApiKey", { key: input.value });
});


input.value = getApiKey();

registerEventDispatcher("btn_cancel", "click", "changeScene", { scene: "MainMenu" });