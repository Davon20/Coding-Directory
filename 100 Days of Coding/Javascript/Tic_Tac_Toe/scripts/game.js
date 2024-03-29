function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1; 
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = 
    'You won, <span id="winner-name">PLAYER NAME</span>';
    gameOverElement.style.display = "none";

    let gameBoardIndex = 0;

    for(let i = 0; i < 3; i++){
        for(j = 0; j < 3; j++){
            gameData[i][j] = 0;
            const gameBoardElemnt = gameBoardElement.children[gameBoardIndex];
            gameBoardElement.children[gameBoardIndex].textContent = "";
            gameBoardElemnt.classList.remove("disabled");
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if (players[0].name === "" || players[1].name === "") {
        alert("Please enter game names for both players before continuing!");
        return;//prevents the remaining code in the funtion from executing
    }
    resetGameStatus();
    activePlayerElement.textContent = players[activePlayer].name;
    gameAreaEleemnt.style.display = "block";
}

function switchPlayer() {
    if (activePlayer === 0) 
    {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    if (event.target.tagName !== "LI" || gameIsOver) {
        return;
    }

    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if (gameData[selectedColumn][selectedRow] > 0) {
        alert("Please select an empty field!");
        return;
    }

    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add("disabled");


    gameData[selectedColumn][selectedRow] = activePlayer + 1;
    console.log(gameData);

    const winnerId = checkForGameOver();

    if (winnerId != 0) {
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
}

function checkForGameOver() {
    //Checking the rows for equality
    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]) {
            return gameData[i][0];
        }
    }
    //Checking the columns for equality
    for (let i = 0; i < 3; i++) {
        if (gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[0][i] === gameData[2][i]) {
            return gameData[0][i];
        }
    }

    //Diagonal: Top left to bottom right
    for (let i = 0; i < 3; i++) {
        if (gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) {
            return gameData[0][0];
        }
    }

    //Diagonal: Bottom left to Top right
    for (let i = 0; i < 3; i++) {
        if (gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]) {
            return gameData[2][0];
        }
        if (currentRound === 9) {
            return -1;
        }
    }
    return 0;
}
function endGame(winnerId) {
    gameIsOver = true;
    gameOverElement.style.display = "block";

    if (winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOverElement.firstElementChild.textContent = "It\'s a draw!"
    }
}