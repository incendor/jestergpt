let currentPrompt = [];
let playedCards = [];
let playerCards = [];
let points = 0;
let king = document.getElementById("king");
let submitButton = null;
let totalThinkingTime = 2500;
let totalAngyTime = 2500;

reset();

function getPrompt() {
    currentPrompt = GetNewPrompt();
    console.log(currentPrompt);
}

function renderPrompt() {
    let promptDisplay = document.createElement("div");
    promptDisplay.id = "game-view--game--ui--promt";
    promptDisplay.classList.add("letter")
    let promptIndex = 0;

    for (let item of currentPrompt) {

        let blankDiv = document.createElement("div");
        blankDiv.classList.add("game-view--game--ui--promt--element")
        blankDiv.classList.add("game-view--game--ui--promt--blank");


        for (let strSay of item.split(' ')) {
            let itemDiv = document.createElement("div");
            itemDiv.classList.add("game-view--game--ui--promt--element")
            itemDiv.innerHTML = strSay;
            promptDisplay.append(itemDiv);
        }

        if (item != currentPrompt[currentPrompt.length - 1]) {
            if (playedCards.length > promptIndex) {
                blankDiv.innerHTML = playedCards[promptIndex].text;
                blankDiv.classList.add("game-view--game--ui--promt--filled");

                promptIndex++;
            }
            promptDisplay.append(blankDiv);
        }
    }
    let resetButtne = document.createElement("button");
    resetButtne.id = '#game-view--game--ui--promt--button--rest';
    resetButtne.classList.add('#game-view--game--ui--promt--button');

    let submitButtne = document.createElement("button");
    submitButtne.id = '#game-view--game--ui--promt--button--submit';
    submitButtne.classList.add('#game-view--game--ui--promt--button');
    submitButtne.disabled = true;
    submitButton = submitButtne;


    promptDisplay.append(resetButtne);
    promptDisplay.append(submitButtne);

    resetButtne.addEventListener('click', () => {
        removePlayedCards();
    });

    submitButtne.addEventListener('click', () => {
        submitPrompt();
    });

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

        cardMarkup.addEventListener("click", (e) => playCard(card, cardMarkup));
    }

    if (document.querySelector('#game-view--game--ui--cards')) {
        document.querySelector('#game-view--game--ui--cards').remove();
    }
    document.querySelector('.game-view--game--ui').append(cardsMarkup);

    checkSubmitButtonState();
}

function checkSubmitButtonState() {
    if (currentPrompt.length - 2 < playedCards.length) {
        submitButton.disabled = false;
    }
    else {
        submitButton.disabled = true;
    }
}

function playCard(cardIndex, cardWrapper) {
    // Prüfen ob alle Lücken gefüllt
    if (currentPrompt.length - 2 < playedCards.length) {
        return;
    }

    let cardToPlay = playerCards[cardIndex];
    playedCards.push(cardToPlay);
    playerCards.splice(cardIndex, 1);

    // renderUi();

    cardWrapper.style.opacity = 0;
    cardWrapper.style.width = "0";
    cardWrapper.style.margin = "-0 -20px";

    setTimeout(() => {
        cardWrapper.remove();
    }, 300);

    renderPrompt();

    checkSubmitButtonState();
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

function getPromptString() {
    let promptString = "";
    let promptIndex = 0;

    for (let item of currentPrompt) {

        promptString += item.trim() + " ";

        if (item != currentPrompt[currentPrompt.length - 1]) {
            if (playedCards.length > promptIndex) {
                promptString += playedCards[promptIndex].text.trim() + " ";
                promptIndex++;
            }
        }
    }
    return promptString.trim();
}

function submitPrompt() {
    submitButton.disabled = true;

    showAnimThink();

    let time = performance.now();

    let prompt = getPromptString();
    console.log("Evaluating:" + prompt);

    let result = GetPromptScore(prompt);

    let time2 = performance.now();
    let elapsed = time2 - time;
    let remain = totalThinkingTime - elapsed;

    if (remain > 0) {
        setTimeout(() => evalScore(result), remain);
    }
    else {
        evalScore(result);
    }
}

function evalScore(score) {
    if (score.isFunny) {
        showAnimLaught();
    }
    else {
        showAnimAngy();
    }

    setTimeout(() => reset(), totalAngyTime)
}

function reset() {
    showAnimIdle();

    playedCards = [];

    getPrompt();
    drawCards();
    renderUi();
}

function showAnimIdle() {
    console.log("Idle");
    king.src = '../../resources/images/king_idle.gif';
}

function showAnimAngy() {
    console.log("Angy");
    if (Math.random() > 0.5) {
        king.src = '../../resources/images/king_big_angry.gif';
    }
    else {
        king.src = '../../resources/images/king_sad.gif';

    }
}

function showAnimThink() {
    console.log("Thinking");
    king.src = '../../resources/images/king_think.gif';
}

function showAnimLaught() {
    console.log("Laught");
    king.src = '../../resources/images/king_funny_af.gif';
}