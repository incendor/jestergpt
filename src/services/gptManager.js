
module.exports = class GptManager {
    constructor(config) {
        this.Config = config;
    }

    fetch = require('node-fetch');
    Config = null;

    async EvaluatePrompt(say) {
        let data = new URLSearchParams();
        data.append("inputs", say);
        data.append("wait_for_model", true);

        let authHeader = 'Bearer ' + await this.Config.GetApiKey();

        let response = await this.fetch('https://api-inference.huggingface.co/models/mohameddhiab/humor-no-humor', {
            method: "post",
            body: data,
            headers: new Headers({
                'Authorization': authHeader
            }),
        });

        let json = await response.json();

        for (let lable in json[0]) {
            let item = json[0][lable];
            if (item.label == "HUMOR") {
                return item.score > 0.5;
            }
        }

        return false;
    }
}