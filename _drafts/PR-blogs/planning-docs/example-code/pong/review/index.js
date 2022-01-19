// DOM elements
const paddle_1 = document.querySelector(".paddle_1");
const paddle_2 = document.querySelector(".paddle_2");
const board = document.querySelector(".board");
const initial_ball = document.querySelector(".ball");
const ball = document.querySelector(".ball");
const score_1 = document.querySelector(".player_1_score");
const score_2 = document.querySelector(".player_2_score");
const message = document.querySelector(".message");
const paddle_common = document.querySelector(".paddle").getBoundingClientRect();

console.log("wat")

// constants
const board_coord = board.getBoundingClientRect();
const initial_ball_coord = ball.getBoundingClientRect();
const movementInterval = 0.06;

const MovementKeys = {
  P1_UP: "w",
  P1_DOWN: "s",
  P2_UP: "ArrowUp",
  P2_DOWN: "ArrowDown",
};

const Keys = {
  ENTER: "Enter",
  ...MovementKeys,
};

const GameStates = {
  START: "start",
  PLAY: "play",
};

const BallDirections = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};


// utils
const randomCoord = () => Math.floor(Math.random() * 4) + 3;
const randomDirection = () => Math.floor(Math.random() * 2);


// state
let gameState = GameStates.START;
let ball_coord = initial_ball_coord;
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();

let dx = randomCoord();
let dy = randomCoord();
let dxd = randomDirection();
let dyd = randomDirection();


// Fxns for moving game elements
const movePaddle = (e) => {
  const movePaddleUp = (paddle) => {
    const nextPosition = Math.max(
      board_coord.top,
      paddle.top - window.innerHeight * movementInterval
    );
  
    return `${nextPosition}px`;
  };
  
  const movePaddleDown = (paddle) => {
    const nextPosition = Math.max(
      Math.min(
        board_coord.bottom - paddle_common.height,
        paddle.top + window.innerHeight * 0.06
      )
    );
    
    return `${nextPosition}px`;
  };
  
  if (e.key == MovementKeys.P1_UP) {
    paddle_1.style.top = movePaddleUp(paddle_1_coord);
  }

  if (e.key == MovementKeys.P1_DOWN) {
    paddle_1.style.top = movePaddleDown(paddle_1_coord);
  }

  if (e.key == MovementKeys.P2_UP) {
    paddle_2.style.top = movePaddleUp(paddle_2_coord);
  }

  if (e.key == MovementKeys.P2_DOWN) {
    paddle_2.style.top = movePaddleDown(paddle_2_coord);
  }

  paddle_2_coord = paddle_2.getBoundingClientRect();
  paddle_1_coord = paddle_1.getBoundingClientRect();
}

function moveBall(dx, dy, dxd, dyd) {
  if (ball_coord.top <= board_coord.top) {
    dyd = BallDirections.DOWN;
  }

  if (ball_coord.bottom >= board_coord.bottom) {
    dyd = BallDirections.UP;
  }

  if (
    ball_coord.left <= paddle_1_coord.right &&
    ball_coord.top >= paddle_1_coord.top &&
    ball_coord.bottom <= paddle_1_coord.bottom
  ) {
    dxd = BallDirections.RIGHT;
    dx = randomCoord();
    dy = randomCoord();
  }

  if (
    ball_coord.right >= paddle_2_coord.left &&
    ball_coord.top >= paddle_2_coord.top &&
    ball_coord.bottom <= paddle_2_coord.bottom
  ) {
    dxd = BallDirections.LEFT;
    dx = randomCoord();
    dy = randomCoord();
  }

  if (
    ball_coord.left <= board_coord.left ||
    ball_coord.right >= board_coord.right
  ) {
    if (ball_coord.left <= board_coord.left) {
      score_2.innerHTML = +score_2.innerHTML + 1;
    } else {
      score_1.innerHTML = +score_1.innerHTML + 1;
    }

    gameState = GameStates.START;

    ball_coord = initial_ball_coord;
    ball.style = initial_ball.style;

    message.innerHTML = "Press Enter to Play Pong";
    message.style.left = "38vw";

    return;
  }

  const nextTopCoord =
    ball_coord.top + dy * (dyd === BallDirections.UP ? -1 : 1);
  const nextLeftCoord =
    ball_coord.left + dx * (dxd === BallDirections.LEFT ? -1 : 1);

  ball.style.top = `${nextTopCoord}px`;
  ball.style.left = `${nextLeftCoord}px`;

  ball_coord = ball.getBoundingClientRect();


  requestAnimationFrame(() => {
    moveBall(dx, dy, dxd, dyd);
  });
}

// Game initialization
const startRound = () => {
  gameState =
    gameState === GameStates.START ? GameStates.PLAY : GameStates.START;

  if (gameState === GameStates.PLAY) {
    message.innerHTML = "Game Started";
    message.style.left = "42vw";

    requestAnimationFrame(() => {
      dx = randomCoord();
      dy = randomCoord();
      dxd = randomDirection();
      dyd = randomDirection();

      moveBall(dx, dy, dxd, dyd);
    });
  }
};

const handleKeyPress = (e) => {
  if (e.key === Keys.ENTER) {
    startRound();
  }

  if (gameState === GameStates.PLAY &&Object.values(MovementKeys).includes(e.key)) {
    movePaddle(e)
  }
};

// initialize the game!
document.addEventListener("keydown", e => handleKeyPress(e));