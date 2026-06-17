import { test } from "node:test";
import assert from "node:assert/strict";
import {
  TETROMINOES,
  createPiece,
  getOccupiedCells,
} from "../src/js/game/tetromino.js";
import { COLS } from "../src/js/game/constants.js";

const PIECE_TYPES = ["I", "O", "T", "S", "Z", "J", "L"];

test("TETROMINOES는 7종 타입을 정의한다", () => {
  assert.deepEqual(Object.keys(TETROMINOES).sort(), PIECE_TYPES.sort());
});

test("각 테트로미노는 shape와 color를 가진다", () => {
  for (const type of PIECE_TYPES) {
    const { shape, color } = TETROMINOES[type];
    assert.ok(Array.isArray(shape) && shape.length > 0);
    assert.ok(shape.every((row) => Array.isArray(row) && row.length > 0));
    assert.ok(typeof color === "string" && color.length > 0);
  }
});

test("createPiece('T')는 기본 속성과 y=0을 반환한다", () => {
  const piece = createPiece("T");

  assert.equal(piece.type, "T");
  assert.deepEqual(piece.shape, TETROMINOES.T.shape);
  assert.equal(piece.color, TETROMINOES.T.color);
  assert.equal(piece.y, 0);
  assert.equal(typeof piece.x, "number");
});

test("createPiece('I')는 10열 보드 상단 중앙에 스폰한다", () => {
  const piece = createPiece("I");
  const width = piece.shape[0].length;

  assert.equal(width, 4);
  assert.equal(piece.x, Math.floor((COLS - width) / 2));
  assert.equal(piece.x, 3);
});

test("createPiece('O')는 10열 보드 상단 중앙에 스폰한다", () => {
  const piece = createPiece("O");
  const width = piece.shape[0].length;

  assert.equal(width, 2);
  assert.equal(piece.x, Math.floor((COLS - width) / 2));
  assert.equal(piece.x, 4);
});

test("createPiece는 알 수 없는 type에 Error를 던진다", () => {
  assert.throws(() => createPiece("INVALID"), /Unknown piece type/);
});

test("getOccupiedCells(createPiece('O'))는 상단 2x2 네 칸을 반환한다", () => {
  const piece = createPiece("O");
  const occupied = getOccupiedCells(piece);

  assert.equal(occupied.length, 4);
  assert.ok(occupied.every(({ row }) => row === 0 || row === 1));
  assert.deepEqual(
    [...new Set(occupied.map(({ col }) => col))].sort((a, b) => a - b),
    [4, 5]
  );
});
