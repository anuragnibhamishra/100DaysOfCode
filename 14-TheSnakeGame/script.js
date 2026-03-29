const board = document.querySelector("#board");
const startBtn = document.querySelector(".startBtn");
const modalOverlay = document.querySelector(".modalOverlay");
const scoreDisplay = document.querySelector(".score");
const highscoreDisplay = document.querySelector(".highScore");
const timerDisplay = document.querySelector(".timerDisplay");
const resumeBtn = document.querySelector(".resumeBtn");
const restartBtn = document.querySelector(".restartBtn");

const CELL_SIZE = 40;
const MOVE_INTERVAL = 300;
const TIMER_INTERVAL = 1000;

const rows = Math.floor(board.clientHeight / CELL_SIZE);
const columns = Math.floor(board.clientWidth / CELL_SIZE);

let blocks = Object.create(null);
let intervalId = null;
let timerId = null;

const state = {
  direction: "down",
  speed: MOVE_INTERVAL,
  score: 0,
  seconds: 0,
  minutes: 0,
  snake: [{ x: 3, y: 6 }],
  food: null,
  running: false,
};

const highScore = Number(localStorage.getItem("highScore") || 0);
let topScore = highScore;

function initBoard() {
  const fragment = document.createDocumentFragment();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const cell = document.createElement("div");
      cell.className = "block";
      blocks[`${row}-${col}`] = cell;
      fragment.appendChild(cell);
    }
  }

  board.appendChild(fragment);
}

function resetGame() {
  stopGame();
  state.direction = "down";
  state.score = 0;
  state.seconds = 0;
  state.minutes = 0;
  state.snake = [{ x: 3, y: 6 }];
  state.food = randomCell();
  state.running = false;

  updateUI();
  renderBoard();
  showModal("Welcome to The Snake Game", "start");
}

function startGame() {
  if (state.running) return;

  state.running = true;
  modalOverlay.style.display = "none";

  timerId = setInterval(() => {
    state.seconds += 1;
    if (state.seconds >= 60) {
      state.minutes += 1;
      state.seconds = 0;
    }
    timerDisplay.textContent = `Time : ${state.minutes.toString().padStart(2, "0")}:${state.seconds.toString().padStart(2, "0")}`;
  }, TIMER_INTERVAL);

  intervalId = setInterval(gameTick, state.speed);
}

function stopGame() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
  state.running = false;
}

function randomCell() {
  return {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * columns),
  };
}

function isCollision(nextHead) {
  const outOfBounds = nextHead.x < 0 || nextHead.x >= rows || nextHead.y < 0 || nextHead.y >= columns;
  const intoSelf = state.snake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);
  return outOfBounds || intoSelf;
}

function getNextHead() {
  const head = state.snake[0];

  switch (state.direction) {
    case "left":
      return { x: head.x, y: head.y - 1 };
    case "right":
      return { x: head.x, y: head.y + 1 };
    case "up":
      return { x: head.x - 1, y: head.y };
    case "down":
    default:
      return { x: head.x + 1, y: head.y };
  }
}

function gameTick() {
  const nextHead = getNextHead();

  if (isCollision(nextHead)) {
    stopGame();
    showGameOver();
    return;
  }

  const newSnake = [nextHead, ...state.snake];

  if (nextHead.x === state.food.x && nextHead.y === state.food.y) {
    state.score += 1;
    if (state.score > topScore) {
      topScore = state.score;
      localStorage.setItem("highScore", String(topScore));
    }
    state.food = randomCell();
  } else {
    newSnake.pop();
  }

  state.snake = newSnake;
  updateUI();
  renderBoard();
}

function updateUI() {
  scoreDisplay.textContent = `Score : ${state.score}`;
  highscoreDisplay.textContent = `Highscore : ${topScore}`;
  timerDisplay.textContent = `Time : ${state.minutes.toString().padStart(2, "0")}:${state.seconds.toString().padStart(2, "0")}`;
}

function renderBoard() {
  // Reset all cells
  Object.values(blocks).forEach((cell) => {
    cell.className = "block";
  });

  const foodCell = blocks[`${state.food.x}-${state.food.y}`];
  if (foodCell) {
    foodCell.className = "block bg-red-600 rounded-lg";
  }

  state.snake.forEach((segment) => {
    const cell = blocks[`${segment.x}-${segment.y}`];
    if (cell) {
      cell.className = "block bg-purple-600 rounded-xl";
    }
  });
}

function showModal(message, mode) {
  modalOverlay.style.display = "flex";
  modalOverlay.querySelector("h1").textContent = message;

  startBtn.style.display = mode === "start" ? "initial" : "none";
  resumeBtn.style.display = mode === "resume" ? "initial" : "none";
  restartBtn.style.display = mode === "restart" ? "initial" : "none";
}

function showGameOver() {
  showModal("Oops! Looks like the Snake bit you", "restart");
  state.score = 0;
  state.seconds = 0;
  state.minutes = 0;
  updateUI();
}

function togglePause() {
  if (!state.running) return;

  stopGame();
  showModal("Paused", "resume");
}

window.addEventListener("keydown", (event) => {
  if (window.getComputedStyle(modalOverlay).display !== "none" && event.key !== "p") {
    return;
  }

  if (event.key === "p") {
    if (state.running) {
      togglePause();
    } else {
      startGame();
    }
    return;
  }

  if (!state.running) return;

  const validDirection = {
    ArrowLeft: "left",
    ArrowRight: "right",
    ArrowUp: "up",
    ArrowDown: "down",
  };

  const requested = validDirection[event.key];
  if (!requested) return;

  const opposite = {
    left: "right",
    right: "left",
    up: "down",
    down: "up",
  };

  if (requested !== opposite[state.direction]) {
    state.direction = requested;
  }
});

startBtn.addEventListener("click", startGame);
resumeBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", () => {
  resetGame();
  startGame();
});

initBoard();
resetGame();