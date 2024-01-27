let currentPrompt = [];
let playedCards = [];
let playerCards = [];
let points = 0;

getPrompt();
drawCards();
renderUi();

function getPrompt() {
    currentPrompt = GetNewPrompt();
    console.log(currentPrompt);
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
}

function drawCards() {
    let drawnCards = DrawMissingCards(playerCards);
    for (let card of drawnCards) {
        playerCards.push(card);
    }
}

function renderCards() {
    let cardsMarkup = document.createElement("div");
    cardsMarkup.id = "game-view--game--ui--cards";
    for (let card in playerCards) {
        let cardMarkup = document.createElement("div");
        cardMarkup.classList.add("game-view--game--ui--cards-element")
        cardMarkup.innerText = playerCards[card].text;
        cardsMarkup.append(cardMarkup);

        cardMarkup.addEventListener("click", (e) => playCard(card));
    }

    if (document.querySelector('#game-view--game--ui--cards')) {
        document.querySelector('#game-view--game--ui--cards').remove();
    }
    document.querySelector('.game-view--game--ui').append(cardsMarkup);
}

function submitPrompt() {
    let prompt = document.getElementById("test_prompt").value;
    let result = GetPromptScore(prompt);
}


function playCard(cardIndex) {
    // Prüfen ob alle Lücken gefüllt
    if (currentPrompt.length - 2 < playedCards.length) {
        return;
    }

    let cardToPlay = playerCards[cardIndex];
    playedCards.push(cardToPlay);
    playerCards.splice(cardIndex, 1);

    renderUi();
}

function removePlayedCards() {
    for (playedCard of playedCards) {
        playerCards.push(playedCard);
    }

    playedCards = [];

    renderUi();
}

function renderUi() {
    renderPrompt();
    renderCards();
}
