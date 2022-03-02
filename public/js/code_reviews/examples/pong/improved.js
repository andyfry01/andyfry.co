import React from "../../snowpack/pkg/react.js";
import Playground from "../../snowpack/pkg/@agney/playground.js";
import "../../snowpack/pkg/@reach/tabs/styles.css.proxy.js";
const improvedCSS = `
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	height: 100vh;
	width: 100vw;
	background-image: linear-gradient(
			to top, #ffda77, #ffa45b);
	display: flex;
	justify-content: center;
	align-items: center;
}

.board {
	height: 85vh;
	width: 80vw;
	background-image: linear-gradient(
			to right, #5c6e91, #839b97);
	border-radius: 14px;
}

.ball {
	height: 30px;
	width: 30px;
	border-radius: 50%;
	position: fixed;
	top: calc(50% - 15px);
	left: calc(50% - 15px);
}

.ball_effect {
	height: 100%;
	width: 100%;
	border-radius: 100px;
	animation: spinBall 0.1s linear infinite;
	box-shadow: inset 0 0 18px #fff,
		inset 6px 0 18px violet,
		inset -6px 0 18px #0ff,
		inset 6px 0 30px violet,
		inset -6px 0 30px #0ff,
		0 0 18px #fff, -4px 0 18px
		violet, 4px 0 18px #0ff;
}

@keyframes spinBall {
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

.paddle {
	height: 100px;
	width: 18px;
	border-radius: 50%;
	position: fixed;
}

.paddle_1 {
	top: calc(7.5vh + 55px);
	left: calc(10vw + 30px);
	box-shadow: inset 0 0 18px #fff,
		inset -6px 0 18px #f3bad6,
		inset 6px 0 18px #0ff,
		inset -6px 0 30px #f3bad6,
		inset 6px 0 30px #0ff,
		0 0 18px #fff, 4px 0 18px
		#f3bad6, -4px 0 18px #0ff;
}

.paddle_2 {
	top: calc(85vh + 7.5vh - 100px - 55px);
	right: calc(10vw + 30px);
	box-shadow: inset 0 0 18px #fff,
		inset 6px 0 18px #f3bad6,
		inset -6px 0 18px #0ff,
		inset 6px 0 30px #f3bad6,
		inset -6px 0 30px #0ff,
		0 0 18px #fff, -4px 0 18px
		#f3bad6, 4px 0 18px #0ff;
}

.player_1_score {
	height: 50px;
	width: 50px;
	color: chartreuse;
	position: fixed;
	left: 30vw;
	margin-top: 30px;
}

.player_2_score {
	height: 50px;
	width: 50px;
	color: chartreuse;
	position: fixed;
	left: 70vw;
	margin-top: 30px;
}

.message {
	position: fixed;
	/* color: #48426d; */
	height: 10vh;
	width: 30vw;
	color: #c9cbff;
	left: 38vw;
	margin: 30px auto auto auto;
}

  `;
const improvedJS = '// DOM elements\nconst paddle_1 = document.querySelector(".paddle_1");\nconst paddle_2 = document.querySelector(".paddle_2");\nconst board = document.querySelector(".board");\nconst initial_ball = document.querySelector(".ball");\nconst ball = document.querySelector(".ball");\nconst score_1 = document.querySelector(".player_1_score");\nconst score_2 = document.querySelector(".player_2_score");\nconst message = document.querySelector(".message");\nconst paddle_common = document.querySelector(".paddle").getBoundingClientRect();\n\n// constants\nconst board_coord = board.getBoundingClientRect();\nconst initial_ball_coord = ball.getBoundingClientRect();\nconst movementInterval = 0.06;\n\nconst MovementKeys = {\n  P1_UP: "w",\n  P1_DOWN: "s",\n  P2_UP: "ArrowUp",\n  P2_DOWN: "ArrowDown",\n};\n\nconst Keys = {\n  ENTER: "Enter",\n  ...MovementKeys,\n};\n\nconst GameStates = {\n  START: "start",\n  PLAY: "play",\n};\n\nconst BallDirections = {\n  UP: "UP",\n  DOWN: "DOWN",\n  LEFT: "LEFT",\n  RIGHT: "RIGHT",\n};\n\n\n// utils\nconst randomCoord = () => Math.floor(Math.random() * 4) + 3;\nconst randomDirection = () => Math.floor(Math.random() * 2);\n\n\n// state\nlet gameState = GameStates.START;\nlet ball_coord = initial_ball_coord;\nlet paddle_1_coord = paddle_1.getBoundingClientRect();\nlet paddle_2_coord = paddle_2.getBoundingClientRect();\n\nlet dx = randomCoord();\nlet dy = randomCoord();\nlet dxd = randomDirection();\nlet dyd = randomDirection();\n\n\n// Fxns for moving game elements\nconst movePaddle = (e) => {\nconst movePaddleUp = (paddle) => {\n  const nextPosition = Math.max(\n    board_coord.top,\n    paddle.top - window.innerHeight * movementInterval\n  );\n\n  return `${nextPosition}px`;\n};\n\nconst movePaddleDown = (paddle) => {\n  const nextPosition = Math.max(\n    Math.min(\n      board_coord.bottom - paddle_common.height,\n      paddle.top + window.innerHeight * movementInterval\n    )\n  );\n    \n  return `${nextPosition}px`;\n};\n\nif (e.key == MovementKeys.P1_UP) {\n  paddle_1.style.top = movePaddleUp(paddle_1_coord);\n}\n\nif (e.key == MovementKeys.P1_DOWN) {\n  paddle_1.style.top = movePaddleDown(paddle_1_coord);\n}\n\nif (e.key == MovementKeys.P2_UP) {\n  paddle_2.style.top = movePaddleUp(paddle_2_coord);\n}\n\nif (e.key == MovementKeys.P2_DOWN) {\n  paddle_2.style.top = movePaddleDown(paddle_2_coord);\n}\n\n  paddle_2_coord = paddle_2.getBoundingClientRect();\n  paddle_1_coord = paddle_1.getBoundingClientRect();\n}\n\nfunction moveBall(dx, dy, dxd, dyd) {\n  if (ball_coord.top <= board_coord.top) {\n    dyd = BallDirections.DOWN;\n  }\n\n  if (ball_coord.bottom >= board_coord.bottom) {\n    dyd = BallDirections.UP;\n  }\n\n  if (\n    ball_coord.left <= paddle_1_coord.right &&\n    ball_coord.top >= paddle_1_coord.top &&\n    ball_coord.bottom <= paddle_1_coord.bottom\n  ) {\n    dxd = BallDirections.RIGHT;\n    dx = randomCoord();\n    dy = randomCoord();\n  }\n\n  if (\n    ball_coord.right >= paddle_2_coord.left &&\n    ball_coord.top >= paddle_2_coord.top &&\n    ball_coord.bottom <= paddle_2_coord.bottom\n  ) {\n    dxd = BallDirections.LEFT;\n    dx = randomCoord();\n    dy = randomCoord();\n  }\n\n  if (\n    ball_coord.left <= board_coord.left ||\n    ball_coord.right >= board_coord.right\n  ) {\n    if (ball_coord.left <= board_coord.left) {\n      score_2.innerHTML = +score_2.innerHTML + 1;\n    } else {\n      score_1.innerHTML = +score_1.innerHTML + 1;\n    }\n\n    gameState = GameStates.START;\n\n    ball_coord = initial_ball_coord;\n    ball.style = initial_ball.style;\n\n    message.innerHTML = "Press Enter to Play Pong";\n    message.style.left = "38vw";\n\n    return;\n  }\n\n  const nextTopCoord =\n    ball_coord.top + dy * (dyd === BallDirections.UP ? -1 : 1);\n  const nextLeftCoord =\n    ball_coord.left + dx * (dxd === BallDirections.LEFT ? -1 : 1);\n\n  ball.style.top = `${nextTopCoord}px`;\n  ball.style.left = `${nextLeftCoord}px`;\n\n  ball_coord = ball.getBoundingClientRect();\n\n\n  requestAnimationFrame(() => {\n    moveBall(dx, dy, dxd, dyd);\n  });\n}\n\n// Game initialization\nconst startRound = () => {\n  gameState =\n    gameState === GameStates.START ? GameStates.PLAY : GameStates.START;\n\n  if (gameState === GameStates.PLAY) {\n    message.innerHTML = "Game Started";\n    message.style.left = "42vw";\n\n    requestAnimationFrame(() => {\n      dx = randomCoord();\n      dy = randomCoord();\n      dxd = randomDirection();\n      dyd = randomDirection();\n\n      moveBall(dx, dy, dxd, dyd);\n    });\n  }\n};\n\nconst handleKeyPress = (e) => {\n  if (e.key === Keys.ENTER) {\n    startRound();\n  }\n\n  if (gameState === GameStates.PLAY && Object.values(MovementKeys).includes(e.key)) {\n    movePaddle(e)\n  }\n};\n';
'// initialize the game!\ndocument.addEventListener("keydown", e => handleKeyPress(e));\n';
const improvedHTML = `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content=
		"width=device-width, initial-scale=1.0">
	<title>PONG GAME</title>
	<link rel="stylesheet" href="style.css">
</head>

<body>
	<div class="board">
		<div class='ball'>
			<div class="ball_effect"></div>
		</div>
		<div class="paddle_1 paddle"></div>
		<div class="paddle_2 paddle"></div>
		<h1 class="player_1_score">0</h1>
		<h1 class="player_2_score">0</h1>
		<h1 class="message">
			Press Enter to Play Pong
		</h1>
	</div>
	
	<script src="index.js"></script>
</body>

</html>

`;
const PongImproved = () => {
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
export default PongImproved;
