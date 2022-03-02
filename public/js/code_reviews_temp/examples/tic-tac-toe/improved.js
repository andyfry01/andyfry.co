import React from "../../snowpack/pkg/react.js";
import Playground from "../../snowpack/pkg/@agney/playground.js";
import "../../snowpack/pkg/@reach/tabs/styles.css.proxy.js";
const improvedCSS = `
body {
    font-family: "Arial", sans-serif;
}

section {
    text-align: center;
}

.game--container {
    display: grid;
    grid-template-columns: repeat(3, auto);
    width: 306px;
    margin: 50px auto;
}

.cell {
    font-family: "Permanent Marker", cursive;
    width: 100px;
    height: 100px;
    box-shadow: 0 0 0 1px #333333;
    border: 1px solid #333333;
    cursor: pointer;

    line-height: 100px;
    font-size: 60px;
}
`;
const improvedJS = 'const statusDisplay = document.querySelector(".game--status");\nconst cells = document.querySelectorAll(".cell")\nconst restartBtn = document.querySelector(".game--restart")\n\nconst IN_PROGRESS = "in progress"\nconst WIN = "win"\nconst DRAW = "draw"\n\nconst winningConditions = [\n    [0, 1, 2],\n    [3, 4, 5],\n    [6, 7, 8],\n    [0, 3, 6],\n    [1, 4, 7],\n    [2, 5, 8],\n    [0, 4, 8],\n    [2, 4, 6]\n];\n\nlet gameActive = true;\nlet currentPlayer = "X";\nlet gameState = ["", "", "", \n                 "", "", "", \n                 "", "", ""];\n\nconst winningMessage = () => `Player ${currentPlayer} has won!`;\nconst drawMessage = () => `Game ended in a draw!`;\nconst currentPlayerTurn = () => `It\'s ${currentPlayer}\'s turn`;\n\nfunction handleCellPlayed(clickedCell, cellIndex) {\n    gameState[cellIndex] = currentPlayer;\n    clickedCell.innerHTML = currentPlayer;\n}\n\nfunction handlePlayerChange() {\n    currentPlayer = currentPlayer === "X" ? "O" : "X";\n    statusDisplay.innerHTML = currentPlayerTurn();\n}\n\nconst endGame = status => {\n    if (status === DRAW) {\n        statusDisplay.innerHTML = drawMessage();\n        return gameActive = false;\n    }\n\n    if (status === WIN) {\n        statusDisplay.innerHTML = winningMessage();\n        return gameActive = false;\n    }\n}\n\nfunction handleResultValidation() {\n    const gameStatus = winningConditions.reduce((status, winCondition) => {\n        const a = gameState[winCondition[0]]\n        const b = gameState[winCondition[1]]\n        const c = gameState[winCondition[2]]\n\n        const incompleteVector = (a === "" && b === "" && c === "")\n        const filledVector = (a === b && b === c)\n        const boardFilledUp = !gameState.includes("") \n        const gameFinished = filledVector && !incompleteVector\n\n        if (status === WIN) {\n            return WIN\n        }\n\n        if (boardFilledUp || status === DRAW) {\n            return DRAW\n        }\n\n        return gameFinished ? WIN : IN_PROGRESS;\n    }, IN_PROGRESS)\n\n    return gameStatus === IN_PROGRESS ? handlePlayerChange() : endGame(gameStatus)\n}\n\nfunction handleCellClick(e) {\n    const clickedCell = e.target;\n    const cellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));\n    const cellAlreadySelected = gameState[cellIndex] !== "";\n\n    if (cellAlreadySelected || !gameActive) {\n        return;\n    }\n\n    handleCellPlayed(clickedCell, cellIndex);\n    handleResultValidation();\n}\n\nfunction handleRestartGame() {\n    gameActive = true;\n    currentPlayer = "X";\n    gameState = ["", "", "", "", "", "", "", "", ""];\n    statusDisplay.innerHTML = currentPlayerTurn();\n    cells.forEach(cell => cell.innerHTML = "");\n}\n\nhandleRestartGame()\ncells.forEach(cell => cell.addEventListener("click", handleCellClick));\nrestartBtn.addEventListener("click", handleRestartGame);\n';
const improvedHTML = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <section>
        <h1 class="game--title">Tic Tac Toe</h1>
        <div class="game--container">
            <button data-cell-index="0" class="cell"></button>
            <button data-cell-index="1" class="cell"></button>
            <button data-cell-index="2" class="cell"></button>
            <button data-cell-index="3" class="cell"></button>
            <button data-cell-index="4" class="cell"></button>
            <button data-cell-index="5" class="cell"></button>
            <button data-cell-index="6" class="cell"></button>
            <button data-cell-index="7" class="cell"></button>
            <button data-cell-index="8" class="cell"></button>
        </div>
        <h2 class="game--status"></h2>
        <button class="game--restart">Restart Game</button>
    </section>

    <script src="script.js"></script>
</body>
</html>
`;
const TicTacToeImproved = () => {
  const snippet = {
    markup: improvedHTML,
    css: improvedCSS,
    javascript: improvedJS
  };
  return /* @__PURE__ */ React.createElement(Playground, {
    initialSnippet: snippet,
    defaultEditorTab: "javascript"
  });
};
export default TicTacToeImproved;
