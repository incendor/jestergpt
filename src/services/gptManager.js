
module.exports = class GptManager {
    constructor(config) {
        this.Config = config;
    }

    fetch = require('node-fetch');
    Config = null;
    gameConfig = require('../resources/json/generalConfig.json');

    async EvaluatePrompt(say) {
        let data = new URLSearchParams();
        data.append("inputs", say);
        data.append("wait_for_model", true);

        let apiKey = await this.Config.GetApiKey();
        let authHeader = null;
        let headerData = new Headers();

        if (apiKey !== null && apiKey !== '') {
            headerData.append("Authorization", 'Bearer ' + apiKey)
        }


        let response = await this.fetch('https://api-inference.huggingface.co/models/mohameddhiab/humor-no-humor', {
            method: "post",
            body: data,
            headers: headerData,
        });

        let json = await response.json();

        for (let lable in json[0]) {
            let item = json[0][lable];
            if (item.label == "HUMOR") {

                return {
                    isFunny: item.score > this.gameConfig.sadThreshhold,
                    score: item.score
                }
            }
        }

        return {
            isFunny: false,
            score: 0
        };
    }
}