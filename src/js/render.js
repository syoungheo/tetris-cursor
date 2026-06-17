import { COLS, ROWS, CELL_SIZE } from "./game/constants.js";
import { getOccupiedCells } from "./game/tetromino.js";

export const EMPTY_CELL_COLOR = "#1a1a2e";
const FILLED_CELL_COLOR = "#4ecca3";

export function initBoard(container) {
  container.innerHTML = "";
  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${COLS}, ${CELL_SIZE}px)`;
  container.style.gridTemplateRows = `repeat(${ROWS}, ${CELL_SIZE}px)`;

  const cells = [];

  for (let row = 0; row < ROWS; row++) {
    cells[row] = [];
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);
      container.appendChild(cell);
      cells[row][col] = cell;
    }
  }

  return cells;
}

export function renderBoard(board, cells) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      cells[row][col].style.backgroundColor =
        board[row][col] === 0 ? EMPTY_CELL_COLOR : FILLED_CELL_COLOR;
    }
  }
}

export function drawPiece(piece, cells) {
  for (const { row, col } of getOccupiedCells(piece)) {
    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
      cells[row][col].style.backgroundColor = piece.color;
    }
  }
}

export function renderGame(board, piece, cells) {
  renderBoard(board, cells);
  if (piece) {
    drawPiece(piece, cells);
  }
}
