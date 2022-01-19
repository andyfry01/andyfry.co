const statusDisplay = document.querySelector('.game--status');
const cells = document.querySelectorAll('.cell')
const restartBtn = document.querySelector('.game--restart')

const IN_PROGRESS = "in progress"
const WIN = "win"
const DRAW = "draw"

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

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", 
                 "", "", "", 
                 "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

function handleCellPlayed(clickedCell, cellIndex) {
    gameState[cellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const endGame = status => {
    if (status === DRAW) {
        statusDisplay.innerHTML = drawMessage();
        return gameActive = false;
    }
    
    if (status === WIN) {
        statusDisplay.innerHTML = winningMessage();
        return gameActive = false;
    }
}

function handleResultValidation() {
    const gameStatus = winningConditions.reduce((status, winCondition) => {
        const a = gameState[winCondition[0]]
        const b = gameState[winCondition[1]]
        const c = gameState[winCondition[2]]
        
        const incompleteVector = (a === '' && b === '' && c === '')
        const filledVector = (a === b && b === c)
        const boardFilledUp = !gameState.includes("") 
        const gameFinished = filledVector && !incompleteVector

        if (status === WIN) {
            return WIN
        }

        if (boardFilledUp || status === DRAW) {
            return DRAW
        }
        
        return gameFinished ? WIN : IN_PROGRESS;
    }, IN_PROGRESS)

    return gameStatus === IN_PROGRESS ? handlePlayerChange() : endGame(gameStatus)
}

function handleCellClick(e) {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    const cellAlreadySelected = gameState[cellIndex] !== "";

    if (cellAlreadySelected || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, cellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    cells.forEach(cell => cell.innerHTML = "");
}

handleRestartGame()
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestartGame);
