import { test } from "node:test";
import assert from "node:assert/strict";
import { createEmptyBoard } from "../src/js/game/board.js";
import { COLS, ROWS } from "../src/js/game/constants.js";

test("createEmptyBoard는 ROWS x COLS 크기의 빈 보드를 만든다", () => {
  const board = createEmptyBoard();

  assert.equal(board.length, ROWS);
  assert.equal(board[0].length, COLS);
  assert.ok(board.every((row) => row.every((cell) => cell === 0)));
});
