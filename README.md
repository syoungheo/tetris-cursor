# 테트리스 (교육용)

HTML, CSS, JavaScript만 사용하는 브라우저 테트리스 프로젝트입니다.

## 실행 방법

1. 이 저장소를 클론하거나 다운로드합니다.
2. `src/index.html` 파일을 브라우저에서 엽니다.

   - **방법 A**: 파일 탐색기에서 `src/index.html`을 더블클릭합니다.
   - **방법 B**: 브라우저 주소창에 파일 경로를 입력합니다.  
     예: `file:///C:/DEV/tetris-cursor/src/index.html`
   - **방법 C**: ES module 사용으로 `file://`에서 동작하지 않으면 로컬 서버로 `src` 폴더를 서빙합니다.  
     예: `npx serve src`

3. 화면에 빈 게임 보드, 점수(0), 시작 버튼, 조작법 안내가 보이면 정상입니다.

## 테스트 실행

[Node.js](https://nodejs.org/) 18 이상이 필요합니다.

```bash
npm test
```

자동·수동 테스트 상세는 [TESTING.md](TESTING.md)를 참고하세요.

## 프로젝트 구조

```
src/
  index.html          # 화면 구조
  style.css           # 스타일
  js/
    main.js           # DOM 연결, 이벤트
    render.js         # CSS Grid DOM 렌더링 (inline style)
    game/             # 순수 게임 로직 (단위 테스트 대상)
      constants.js
      board.js
      tetromino.js
tests/
  board.test.js       # 단위 테스트
  tetromino.test.js   # 단위 테스트
```

## 현재 상태

테트로미노 7종 정의, CSS Grid DOM 보드, 상단 중앙 블록 표시까지 완료되었습니다.

구현 단계별 상세 이력은 [DEVELOPMENT.md](DEVELOPMENT.md)를 참고하세요.
