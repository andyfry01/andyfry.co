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
const improvedJS = "let gameState = 'start';\nlet paddle_1 = document.querySelector('.paddle_1');\nlet paddle_2 = document.querySelector('.paddle_2');\nlet board = document.querySelector('.board');\nlet initial_ball = document.querySelector('.ball');\nlet ball = document.querySelector('.ball');\nlet score_1 = document.querySelector('.player_1_score');\nlet score_2 = document.querySelector('.player_2_score');\nlet message = document.querySelector('.message');\nlet paddle_1_coord = paddle_1.getBoundingClientRect();\nlet paddle_2_coord = paddle_2.getBoundingClientRect();\nlet initial_ball_coord = ball.getBoundingClientRect();\nlet ball_coord = initial_ball_coord;\nlet board_coord = board.getBoundingClientRect();\nlet paddle_common =\n	document.querySelector('.paddle').getBoundingClientRect();\n\nlet dx = Math.floor(Math.random() * 4) + 3;\nlet dy = Math.floor(Math.random() * 4) + 3;\nlet dxd = Math.floor(Math.random() * 2);\nlet dyd = Math.floor(Math.random() * 2);\n\ndocument.addEventListener('keydown', (e) => {\nif (e.key == 'Enter') {\n	gameState = gameState == 'start' ? 'play' : 'start';\n	if (gameState == 'play') {\n	message.innerHTML = 'Game Started';\n	message.style.left = 42 + 'vw';\n	requestAnimationFrame(() => {\n		dx = Math.floor(Math.random() * 4) + 3;\n		dy = Math.floor(Math.random() * 4) + 3;\n		dxd = Math.floor(Math.random() * 2);\n		dyd = Math.floor(Math.random() * 2);\n		moveBall(dx, dy, dxd, dyd);\n	});\n	}\n}\nif (gameState == 'play') {\n	if (e.key == 'w') {\n	paddle_1.style.top =\n		Math.max(\n		board_coord.top,\n		paddle_1_coord.top - window.innerHeight * 0.06\n		) + 'px';\n	paddle_1_coord = paddle_1.getBoundingClientRect();\n	}\n	if (e.key == 's') {\n	paddle_1.style.top =\n		Math.min(\n		board_coord.bottom - paddle_common.height,\n		paddle_1_coord.top + window.innerHeight * 0.06\n		) + 'px';\n	paddle_1_coord = paddle_1.getBoundingClientRect();\n	}\n\n	if (e.key == 'ArrowUp') {\n	paddle_2.style.top =\n		Math.max(\n		board_coord.top,\n		paddle_2_coord.top - window.innerHeight * 0.1\n		) + 'px';\n	paddle_2_coord = paddle_2.getBoundingClientRect();\n	}\n	if (e.key == 'ArrowDown') {\n	paddle_2.style.top =\n		Math.min(\n		board_coord.bottom - paddle_common.height,\n		paddle_2_coord.top + window.innerHeight * 0.1\n		) + 'px';\n	paddle_2_coord = paddle_2.getBoundingClientRect();\n	}\n}\n});\n\nfunction moveBall(dx, dy, dxd, dyd) {\nif (ball_coord.top <= board_coord.top) {\n	dyd = 1;\n}\nif (ball_coord.bottom >= board_coord.bottom) {\n	dyd = 0;\n}\nif (\n	ball_coord.left <= paddle_1_coord.right &&\n	ball_coord.top >= paddle_1_coord.top &&\n	ball_coord.bottom <= paddle_1_coord.bottom\n) {\n	dxd = 1;\n	dx = Math.floor(Math.random() * 4) + 3;\n	dy = Math.floor(Math.random() * 4) + 3;\n}\nif (\n	ball_coord.right >= paddle_2_coord.left &&\n	ball_coord.top >= paddle_2_coord.top &&\n	ball_coord.bottom <= paddle_2_coord.bottom\n) {\n	dxd = 0;\n	dx = Math.floor(Math.random() * 4) + 3;\n	dy = Math.floor(Math.random() * 4) + 3;\n}\nif (\n	ball_coord.left <= board_coord.left ||\n	ball_coord.right >= board_coord.right\n) {\n	if (ball_coord.left <= board_coord.left) {\n	score_2.innerHTML = +score_2.innerHTML + 1;\n	} else {\n	score_1.innerHTML = +score_1.innerHTML + 1;\n	}\n	gameState = 'start';\n\n	ball_coord = initial_ball_coord;\n	ball.style = initial_ball.style;\n	message.innerHTML = 'Press Enter to Play Pong';\n	message.style.left = 38 + 'vw';\n	return;\n}\nball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';\nball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';\nball_coord = ball.getBoundingClientRect();\nrequestAnimationFrame(() => {\n	moveBall(dx, dy, dxd, dyd);\n});\n}\n";
"// initialize the game!\n";
'document.addEventListener("keydown", e => handleKeyPress(e));';
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
const PongOriginal = () => {
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
export default PongOriginal;
