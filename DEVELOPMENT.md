# 구현 이력

이 문서는 테트리스 게임의 **구현 단계**를 기록합니다.  
실행 방법은 [README.md](README.md), 테스트 방법은 [TESTING.md](TESTING.md)를 참고하세요.

## 커밋 메시지 규칙

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 스타일을 따릅니다.

```
<type>: <한 줄 설명>
```

| type | 언제 쓰나 |
|------|-----------|
| `feat` | 새 기능 추가 (단계 완료, 게임 동작 추가) |
| `fix` | 버그 수정 |
| `test` | 테스트만 추가·수정 |
| `refactor` | 동작은 같고 코드 구조만 개선 |
| `docs` | README, DEVELOPMENT.md 등 문서만 변경 |
| `chore` | 설정, 의존성 등 기타 작업 |

**예시**
- `feat: add tetromino definitions`
- `fix: prevent piece spawning inside wall`
- `test: add gravity step tests`

각 구현 단계를 마칠 때 위 형식으로 커밋하고, 아래 진행 현황 표의 **커밋** 열에 메시지를 기록합니다.

## 진행 현황

| 단계 | 상태 | 커밋 | 자동 테스트 | 수동 확인 | 설명 |
|------|------|------|-------------|-----------|------|
| 0. 프로젝트 골격 | ✅ | `feat: set up test structure and extract board module` | `board.test.js` | 빈 보드 표시 | HTML/CSS/JS, 빈 보드, 테스트 구조 |
| 1. 테트로미노 정의 | ✅ | `feat: add tetromino definitions and CSS grid board rendering` | `tetromino.test.js` | — | 7가지 블록 데이터, createPiece |
| 2. 블록 생성·표시 | ✅ | `feat: add tetromino definitions and CSS grid board rendering` | — | 블록 화면 표시 | CSS Grid DOM, 상단 중앙 블록 표시 |
| 3. 자동 낙하 | ⬜ | — | `gravity.test.js` | 블록 하강 | 일정 간격으로 1칸씩 하강 |
| 4. 키보드 조작 | ⬜ | — | — | 키 입력 동작 | 좌우 이동, 회전, 소프트/하드 드롭 |
| 5. 충돌·고정 | ⬜ | — | `collision.test.js` | 블록 고정 | 벽·바닥·블록 충돌 후 보드에 고정 |
| 6. 라인 클리어·점수 | ⬜ | — | `score.test.js` | 점수 증가 | 가득 찬 줄 삭제 및 점수 반영 |
| 7. 게임 오버 | ⬜ | — | `gameover.test.js` | 게임 오버 표시 | 블록이 더 이상 생성되지 않을 때 종료 |

---

## 단계 0 — 프로젝트 골격

**목표:** 화면 구조와 빈 보드 표시, 테스트 가능한 코드 구조 마련

**구현 내용:**
- `index.html`: canvas 게임 보드, 점수, 시작/재시작 버튼, 조작법 안내
- `style.css`: 다크 테마 레이아웃 (보드 + 사이드 패널)
- `js/game/constants.js`: 보드 크기 상수 (`COLS`, `ROWS`, `CELL_SIZE`)
- `js/game/board.js`: `createEmptyBoard()`, `clearBoard()` — 순수 로직
- `js/render.js`: `drawBoard()` — canvas 렌더링 (당시 구현, 이후 단계 2에서 CSS Grid로 전환)
- `js/main.js`: DOM 연결, 시작/재시작 이벤트
- `tests/board.test.js`: `createEmptyBoard` 단위 테스트
- `package.json`: `npm test` 스크립트 (Node.js 내장 테스트)

**학습 포인트:**
- canvas 2D API (`getContext`, `fillRect`, `strokeRect`)
- 2차원 배열로 게임 보드 표현
- ES module로 로직·렌더링·UI 분리
- `node:test`로 순수 함수 단위 테스트

**자동 테스트:**
```bash
npm test
```
- `createEmptyBoard`가 10×20 크기의 0으로 채워진 보드를 반환하는지 검증

**수동 확인:**
1. `src/index.html`을 브라우저에서 연다. (ES module 사용 시 [TESTING.md](TESTING.md) 참고)
2. 10×20 격자의 빈 보드가 보이는지 확인한다.
3. 점수 `0`, **시작** 버튼, 조작법 안내가 표시되는지 확인한다.
4. **시작** 클릭 시 버튼이 **재시작**으로 바뀌고 보드가 초기화되는지 확인한다.

**관련 파일:** `src/index.html`, `src/style.css`, `src/js/`, `tests/board.test.js`, `package.json`

**커밋:** `feat: set up test structure and extract board module`

---

## 단계 1 — 테트로미노 정의

**목표:** 7가지 테트로미노 데이터와 블록 생성 순수 로직 마련

**구현 내용:**
- `js/game/tetromino.js`: `TETROMINOES`, `createPiece()`, `getOccupiedCells()`
- 각 타입: `shape`(2D 배열), `color`
- `createPiece(type)`: 상단 중앙 스폰 (`x = floor((COLS - width) / 2)`, `y = 0`)
- `tests/tetromino.test.js`: 7종 정의, 스폰 위치, occupied cells 검증

**학습 포인트:**
- 테트로미노를 2D 배열로 표현
- 스폰 x 좌표 중앙 정렬 계산
- 렌더링과 분리된 순수 함수 (`getOccupiedCells`)

**자동 테스트:**
```bash
npm test
```
- 7종 타입 정의
- `createPiece` 기본값·중앙 스폰
- 잘못된 type 시 Error

**관련 파일:** `src/js/game/tetromino.js`, `tests/tetromino.test.js`

**커밋:** `feat: add tetromino definitions and CSS grid board rendering` (단계 2와 동일 커밋)

---

## 단계 2 — 블록 생성·표시

**목표:** canvas 대신 CSS Grid DOM 보드에 현재 블록 1개 표시

**구현 내용:**
- `index.html`: `<canvas>` → `<div id="game-board">`
- `style.css`: `#game-board` CSS Grid (`repeat(10, …)` / `repeat(20, …)`), `.cell` 테두리
- `js/render.js`:
  - `initBoard(container)` — 200개 `.cell` 생성
  - `renderBoard(board, cells)` — inline `backgroundColor`
  - `drawPiece(piece, cells)` — inline `backgroundColor`
  - `renderGame(board, piece, cells)`
- `js/main.js`: 시작/재시작 시 `createPiece` + `renderGame`

**학습 포인트:**
- CSS Grid로 게임 보드 레이아웃
- DOM + inline style로 상태 기반 렌더링
- 보드(고정)와 현재 블록(overlay) 렌더 분리

**수동 확인:**
1. `npx serve src` 후 브라우저 접속 ([TESTING.md](TESTING.md) 참고)
2. 10×20 빈 grid 보드 표시
3. **시작** 클릭 → 상단 중앙에 컬러 블록 1개 (T)
4. **재시작** → 보드·블록 초기화
5. 키 입력·자동 낙하 없음 확인

**관련 파일:** `src/index.html`, `src/style.css`, `src/js/render.js`, `src/js/main.js`

**커밋:** `feat: add tetromino definitions and CSS grid board rendering` (단계 1과 동일 커밋)

---

## 리뷰 이력

구현 단계 사이에 수행한 코드 리뷰·구조 점검 기록입니다.  
`.cursor/commands/code-review.md` 기준(파일 구조, 함수 역할, 중복, 로직·렌더 분리, 버그 가능성)으로 작성합니다.

### 2026-06-17 — 단계 2 완료 후 구조 리뷰

**범위:** `src/index.html`, `src/style.css`, `src/js/` 전체, `tests/`

**전체 평가:** 양호. `game/`(순수 데이터·로직), `render.js`(DOM 렌더링), `main.js`(조합·UI) 3층 구조가 명확하다.

**렌더링 ↔ 데이터 분리**

| 레이어 | 파일 | 역할 |
|--------|------|------|
| 데이터 | `constants.js` | 보드 크기 상수 |
| 데이터 | `board.js` | 2D 배열 보드 (`0` = 빈 칸) |
| 데이터 | `tetromino.js` | 피스 정의, 생성, 점유 칸 계산 |
| 렌더링 | `render.js` | DOM 생성·색상 반영 |
| 조합 | `main.js` | 상태·이벤트·`renderGame` 호출 |

- 단방향 데이터 흐름: `main.js`가 상태를 갱신한 뒤 `renderGame(board, piece, cells)` 호출. 렌더러는 상태를 변경하지 않음.
- `renderBoard`(고정 블록)와 `drawPiece`(현재 피스)가 분리되어 있어 낙하·고정 단계 확장에 유리함.
- `getOccupiedCells()`는 순수 함수, `drawPiece`는 좌표 결과로 `backgroundColor`만 설정.
- `board.test.js`, `tetromino.test.js`가 DOM 없이 `game/` 모듈만 검증.

**좋은 점**

- ES module로 로직·렌더·UI 분리
- 함수 이름(`createEmptyBoard`, `renderGame` 등)과 역할이 일치
- Canvas → CSS Grid 전환 시 데이터 구조 유지

**개선할 점 (다음 단계 전 고려)**

- `createPiece`가 `TETROMINOES`의 `shape` 배열 참조를 그대로 반환 → 회전(단계 4) 구현 전 **깊은 복사** 필요
- 보드 셀이 `0`/비0만 구분 → 고정(단계 5) 후 타입별 색 반영을 위해 셀 데이터 모델 확장 검토
- `CELL_SIZE`(30)와 `.cell`(30px)이 연결되지 않음 → 한쪽만 변경 시 Grid·셀 크기 불일치 가능
- 낙하·입력 추가 시 `main.js` 비대화 → `game/state.js` 등 상태 모듈 분리 검토

**반드시 수정할 문제:** 단계 2 기준 즉시 버그 없음. 단계 4(회전) 전 `shape` 복사는 사실상 필수.

**선택적 개선:** CSS 변수로 크기·색 통일, `drawPiece` → `renderPiece` 네이밍 통일, 점수 UI를 `render.js`로 이동.

**커밋:** `docs: record step 2 code review in DEVELOPMENT.md`
