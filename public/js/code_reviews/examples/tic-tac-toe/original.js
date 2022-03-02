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
const improvedJS = 'const statusDisplay = document.querySelector(".game--status");\n\nlet gameActive = true;\nlet currentPlayer = "X";\nlet gameState = ["", "", "", "", "", "", "", "", ""];\n\nconst winningMessage = () => `Player ${currentPlayer} has won!`;\nconst drawMessage = () => `Game ended in a draw!`;\nconst currentPlayerTurn = () => `It\'s ${currentPlayer}\'s turn`;\n\nstatusDisplay.innerHTML = currentPlayerTurn();\n\nconst winningConditions = [\n    [0, 1, 2],\n    [3, 4, 5],\n    [6, 7, 8],\n    [0, 3, 6],\n    [1, 4, 7],\n    [2, 5, 8],\n    [0, 4, 8],\n    [2, 4, 6]\n];\n\nfunction handleCellPlayed(clickedCell, clickedCellIndex) {\n    gameState[clickedCellIndex] = currentPlayer;\n    clickedCell.innerHTML = currentPlayer;\n}\n\nfunction handlePlayerChange() {\n    currentPlayer = currentPlayer === "X" ? "O" : "X";\n    statusDisplay.innerHTML = currentPlayerTurn();\n}\n\nfunction handleResultValidation() {\n    let roundWon = false;\n    for (let i = 0; i <= 7; i++) {\n        const winCondition = winningConditions[i];\n        let a = gameState[winCondition[0]];\n        let b = gameState[winCondition[1]];\n        let c = gameState[winCondition[2]];\n        if (a === "" || b === "" || c === "") {\n            continue;\n        }\n        if (a === b && b === c) {\n            roundWon = true;\n            break\n        }\n    }\n\n    if (roundWon) {\n        statusDisplay.innerHTML = winningMessage();\n        gameActive = false;\n        return;\n    }\n\n    let roundDraw = !gameState.includes("");\n    if (roundDraw) {\n        statusDisplay.innerHTML = drawMessage();\n        gameActive = false;\n        return;\n    }\n\n    handlePlayerChange();\n}\n\nfunction handleCellClick(clickedCellEvent) {\n    const clickedCell = clickedCellEvent.target;\n    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));\n\n    if (gameState[clickedCellIndex] !== "" || !gameActive) {\n        return;\n    }\n\n    handleCellPlayed(clickedCell, clickedCellIndex);\n    handleResultValidation();\n}\n\nfunction handleRestartGame() {\n    gameActive = true;\n    currentPlayer = "X";\n    gameState = ["", "", "", "", "", "", "", "", ""];\n    statusDisplay.innerHTML = currentPlayerTurn();\n    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");\n}\n\ndocument.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick));\ndocument.querySelector(".game--restart").addEventListener("click", handleRestartGame);\n';
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
            <div data-cell-index="0" class="cell"></div>
            <div data-cell-index="1" class="cell"></div>
            <div data-cell-index="2" class="cell"></div>
            <div data-cell-index="3" class="cell"></div>
            <div data-cell-index="4" class="cell"></div>
            <div data-cell-index="5" class="cell"></div>
            <div data-cell-index="6" class="cell"></div>
            <div data-cell-index="7" class="cell"></div>
            <div data-cell-index="8" class="cell"></div>
        </div>
        <h2 class="game--status"></h2>
        <button class="game--restart">Restart Game</button>
    </section>

    <script src="script.js"></script>
</body>
</html>
`;
const TicTacToeOriginal = () => {
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
export default TicTacToeOriginal;
