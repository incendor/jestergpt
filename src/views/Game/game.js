let currentPrompt = null;
let playedCards = [{ text: "bla", type: "noun" }];
let drawnCards = [];
let points = 0;

getPrompt();
drawCards();


function getPrompt() {
    currentPrompt = GetNewPrompt();

    renderPrompt();
}

function renderPrompt() {
    let promptDisplay = document.createElement("div");
    let promptIndex = 0;

    for (let item of currentPrompt) {
        let itemDiv = document.createElement("div");
        let blankDiv = document.createElement("div");

        itemDiv.innerHTML = item;

        promptDisplay.append(itemDiv);
        if (item != currentPrompt[currentPrompt.length - 1]) {
            if (playedCards.length > promptIndex) {
                blankDiv.innerHTML = playedCards[promptIndex].text;
                blankDiv.classList.add("blank");
                blankDiv.classList.add("filled");

                promptIndex++;
            }
            else {
                blankDiv.classList.add("blank");
            }

            promptDisplay.append(blankDiv);
        }
    }

    console.log(promptDisplay);
}

function drawCards() {
    drawnCards = DrawMissingCards(drawnCards);

    console.log(drawnCards);
}

function renderCards() {

}