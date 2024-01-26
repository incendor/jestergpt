
module.exports = class PromptManager {
    constructor(gptManager) {
        this.GptManager = gptManager;
    }

    GptManager = null;
    prompts = require('../resources/json/prompts.json');
    config = require('../resources/json/generalConfig.json');

    GetNewPrompt() {
        var prompt = this.GetNewRandomItem(this.prompts);

        return prompt;
    }

    GetNewRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    DrawMissingCards(currentCards) {
        let cardsToAdd = [];
        for (let cardType of this.config.cardTypes) {
            var currentCount = this.CountCardTypes(currentCards, cardType.id);

            if (currentCount < cardType.minAmount) {
                let allCardsOfType = require('../resources/json/' + cardType.file);
                let requiredCards = cardType.minAmount - currentCount;

                while (requiredCards > 0) {
                    let newlyDrawnCard = this.GetNewRandomItem(allCardsOfType);
                    cardsToAdd.push({
                        "type": cardType.id,
                        "text": newlyDrawnCard
                    });

                    requiredCards = requiredCards - 1;
                }
            }
        }

        let missingRandomCards = this.config.totalCards - (cardsToAdd.length + currentCards.length);

        if (missingRandomCards > 0) {
            while (missingRandomCards > 0) {
                let type = this.GetNewRandomItem(this.config.cardTypes);
                let allCardsOfType = require('../resources/json/' + type.file);
                let newlyDrawnCard = this.GetNewRandomItem(allCardsOfType);
                cardsToAdd.push({
                    "type": type.id,
                    "text": newlyDrawnCard
                });

                missingRandomCards = missingRandomCards - 1;
            }
        }

        return cardsToAdd;
    }

    CountCardTypes(cardsToCount, type) {
        let count = 0;

        for (card in cardsToCount) {
            if (card.type == type) {
                count++;
            }
        }

        return count;
    }

    ScorePrompt(prompt) {
        console.log(prompt);
    }
}