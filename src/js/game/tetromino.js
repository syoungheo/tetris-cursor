import { COLS } from "./constants.js";

export const TETROMINOES = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: "#00f0f0",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#f0f000",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#a000f0",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#00f000",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#f00000",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "#0000f0",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#f0a000",
  },
};

export function createPiece(type) {
  const def = TETROMINOES[type];
  if (!def) {
    throw new Error(`Unknown piece type: ${type}`);
  }

  const { shape, color } = def;
  const width = shape[0].length;

  return {
    type,
    shape,
    color,
    x: Math.floor((COLS - width) / 2),
    y: 0,
  };
}

export function getOccupiedCells(piece) {
  const cells = [];

  for (let row = 0; row < piece.shape.length; row++) {
    for (let col = 0; col < piece.shape[row].length; col++) {
      if (piece.shape[row][col]) {
        cells.push({ row: piece.y + row, col: piece.x + col });
      }
    }
  }

  return cells;
}
