import { createEmptyBoard, clearBoard } from "./game/board.js";
import { createPiece } from "./game/tetromino.js";
import { initBoard, renderBoard, renderGame } from "./render.js";

const boardContainer = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const startBtn = document.getElementById("start-btn");

const board = createEmptyBoard();
const cells = initBoard(boardContainer);
let currentPiece = null;

function resetGame() {
  clearBoard(board);
  scoreElement.textContent = "0";
  currentPiece = createPiece("T");
  renderGame(board, currentPiece, cells);
}

function startGame() {
  startBtn.textContent = "재시작";
  resetGame();
}

startBtn.addEventListener("click", startGame);

renderBoard(board, cells);
