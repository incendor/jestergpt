
module.exports = class ConfigManager {
    constructor() {
        this.Init();
    }

    storage = require('node-persist');

    async Init() {
        await this.storage.init( /* options ... */);
    }

    async SetApiKey(key) {
        await this.storage.setItem("api_key", key);
    }

    async GetApiKey() {
        let data = await this.storage.getItem("api_key");

        return data;
    }
}