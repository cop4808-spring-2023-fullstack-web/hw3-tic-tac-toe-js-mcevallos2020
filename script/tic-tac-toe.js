const statusDisplay = document.querySelectorAll('.status');
const winningCellDisplayList = document.querySelectorAll('.cell');

let gameActive = true;
let players = ["X", "O"];
let currentPlayer = players[Math.round(Math.random())];
if(currentPlayer == "O") {
    turnO();
}
let gameState = ["", "", "", "", "", "", "", "", ""];
let playerWins = [0, 0];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const scoreBoard = () => `Player X's Score: ${playerWins[0]} | Player O's Score: ${playerWins[1]}`;

statusDisplay[0].innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay[0].innerHTML = currentPlayerTurn();
    if(currentPlayer == "O") {
        turnO();
    }
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
 }

async function turnO() {
    await sleep(Math.floor(Math.random() * (1500 - 500) + 500))
    let turnO = Math.round(Math.random() * 9)
    while(gameState[turnO] != "") {
        turnO = Math.round(Math.random() * 9)
    }
    gameState[turnO] = currentPlayer;
    winningCellDisplayList[turnO].innerHTML = currentPlayer;
    handleResultValidation();
}

function handleResultValidation() {
    let roundWon = false;
    let x = 0;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        x = i;
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay[0].innerHTML = winningMessage();
        gameActive = false;
        statusDisplay[0].style.color = "rgb(251,100,204)";
        for(let j = 0; j <= 2; j++) {
            winningCellDisplayList[winningConditions[x][j]].style.color = "rgb(251,100,204)";
        }
        if(currentPlayer == "X") {
            playerWins[0]++;
        }
        else {
            playerWins[1]++;
        }
        statusDisplay[1].innerHTML = scoreBoard();
        statusDisplay[1].style.color = "rgb(251,100,204)";
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay[0].innerHTML = drawMessage();
        gameActive = false;
        statusDisplay[0].style.color = "rgb(251,100,204)";
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    if(currentPlayer == "O") {
        return;
    }
    
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = players[Math.round(Math.random())];
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay[0].style.color = "rgb(65, 65, 65)";
    statusDisplay[1].style.color = "rgb(65, 65, 65)";    
    statusDisplay[0].innerHTML = currentPlayerTurn();
    for(let i = 0; i < winningCellDisplayList.length; i++) {
        winningCellDisplayList[i].style.color = "rgb(65, 65, 65)";
    }
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    if(currentPlayer == "O") {
        turnO();
    }
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);