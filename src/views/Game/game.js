let currentPrompt = [];
let playedCards = [];
let playerCards = [];
let points = 0;
let king = document.getElementById("king");
let submitButton = null;
let totalThinkingTime = 2500;
let totalAngyTime = 2500;
let gameConfig = GetGameConfig();
let remainingLifes = gameConfig.liveAmount;
let remainingRounds = gameConfig.maxRounds;

nextRound();

function getPrompt() {
    currentPrompt = GetNewPrompt();
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
    resetButtne.id = 'game-view--game--ui--promt--button--rest';
    resetButtne.classList.add('#game-view--game--ui--promt--button');

    let submitButtne = document.createElement("button");
    submitButtne.id = 'game-view--game--ui--promt--button--submit';
    submitButtne.classList.add('#game-view--game--ui--promt--button');
    submitButtne.disabled = true;
    submitButton = submitButtne;

    let roundsToGoCounter = document.createElement("div");
    roundsToGoCounter.classList.add('game-view--game--ui--promt--rounds')
    roundsToGoCounter.innerHTML = "Remaining jokes to tell: " + remainingRounds;

    promptDisplay.append(roundsToGoCounter);
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
        card.id = Math.floor(Math.random() * 100000000);
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
        let cardModel = playerCards[card];
        cardMarkup.addEventListener("click", (e) => playCard(cardModel, cardMarkup));
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

function playCard(cardToPlay, cardWrapper) {
    playAudioFile("play_card");
    // Prüfen ob alle Lücken gefüllt
    if (currentPrompt.length - 2 < playedCards.length) {
        return;
    }

    playedCards.push(cardToPlay);
    playerCards.splice(playerCards.indexOf(cardToPlay), 1);

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
    playAudioFile("undo");
    for (playedCard of playedCards) {
        playerCards.push(playedCard);
    }

    playedCards = [];

    renderUi();
}

function renderUi() {
    renderPrompt();
    renderCards();
    renderLifes();
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
        remainingLifes = remainingLifes - 1;
        showAnimAngy();
    }

    setTimeout(() => nextRound(), totalAngyTime)
}

function nextRound() {
    showAnimIdle();

    remainingRounds = remainingRounds - 1;
    console.log("Remaining Rounds:" + remainingRounds);

    if (remainingLifes == 0) {
        lose();
    }
    else if (remainingRounds == 0) {
        win();
    }
    else {
        playedCards = [];

        getPrompt();
        drawCards();
        renderUi();
    }
}

function showAnimIdle() {
    king.src = '../../resources/images/king_idle.gif';
}

function showAnimAngy() {
    let randomNumber = Math.random();


    if (randomNumber < 0.33) {
        king.src = '../../resources/images/king_big_angry.gif';
        playAudioFile("angy1", "angy1");
    }
    else if (randomNumber > 0.33 && randomNumber < 0.66) {
        king.src = '../../resources/images/king_sob.gif';
        playAudioFile("sob1", "sob2");
    }
    else {
        king.src = '../../resources/images/king_sad.gif';
        playAudioFile("sad1");
    }
}

function showAnimThink() {
    playAudioFile("thinking");
    king.src = '../../resources/images/king_think.gif';
}

function showAnimLaught() {

    let randomNumber = Math.random();

    if (randomNumber < 0.33) {
        king.src = '../../resources/images/king_smile.gif';
        playAudioFile("laugh1");
    }
    else if (randomNumber > 0.5) {
        king.src = '../../resources/images/king_funny_af.gif';
        playAudioFile("giggle1", "giggle2");
    }

}

function renderLifes() {
    document.querySelector(".game-view--game--background--life").innerHTML = "";
    console.log("Lifes:" + remainingLifes);

    for (let index = 0; index < gameConfig.liveAmount; index++) {
        let dude = document.createElement("div");
        let upsetDudeCount = gameConfig.liveAmount - remainingLifes;

        console.log("Upset Dudes:" + upsetDudeCount);

        if (upsetDudeCount > index) {
            dude.classList.add("upset");
        }

        dude.classList.add("game-view--game--background--life--dude");

        document.querySelector(".game-view--game--background--life").append(dude);
    }
}

function win() {
    console.log("win");
    NavigateTo("Win");
}

function lose() {
    console.log("lose");
    NavigateTo("Lose");
}