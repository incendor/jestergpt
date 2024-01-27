let currentPrompt = null;
let playedCards = [{ text: "bla", type: "noun" }];
let playerCards = [];
let points = 0;

getPrompt();
drawCards();


function getPrompt() {
    currentPrompt = GetNewPrompt();

    renderPrompt();
}

function renderPrompt() {
    let promptDisplay = document.createElement("div");
    promptDisplay.id = "game-view--game--ui--promt";
    let promptIndex = 0;

    for (let item of currentPrompt) {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("game-view--game--ui--promt--element")

        let blankDiv = document.createElement("div");
        blankDiv.classList.add("game-view--game--ui--promt--element")
        blankDiv.classList.add("game-view--game--ui--promt--blank");



        itemDiv.innerHTML = item;

        promptDisplay.append(itemDiv);
        if (item != currentPrompt[currentPrompt.length - 1]) {
            if (playedCards.length > promptIndex) {
                blankDiv.innerHTML = playedCards[promptIndex].text;
                blankDiv.classList.add("game-view--game--ui--promt--filled");

                promptIndex++;
            }
            promptDisplay.append(blankDiv);
        }
    }

    if (document.querySelector('#game-view--game--ui--promt')) {
        document.querySelector('#game-view--game--ui--promt').remove();
    }
    document.querySelector('.game-view--game--ui').prepend(promptDisplay);

    console.log(promptDisplay);
}

function drawCards() {
    let drawnCards = DrawMissingCards(playerCards);
    for (let card of drawnCards) {
        playerCards.push(card);
    }


    console.log(playerCards);

    renderCards();
}

function renderCards() {
    let cardsMarkup = document.createElement("div");
    cardsMarkup.id = "game-view--game--ui--cards";
    for (let card in playerCards) {
        let cardMarkup = document.createElement("div");
        cardMarkup.classList.add("game-view--game--ui--cards-element")
        cardMarkup.innerText = playerCards[card].text;
        cardMarkup.setAttribute('data-index', card);
        cardsMarkup.append(cardMarkup);
    }

    if (document.querySelector('#game-view--game--ui--cards')) {
        document.querySelector('#game-view--game--ui--cards').remove();
    }
    document.querySelector('.game-view--game--ui').append(cardsMarkup);
}

function submitPrompt() {
    let prompt = document.getElementById("test_prompt").value;
    let result = GetPromptScore(prompt);
    console.log(result);
}