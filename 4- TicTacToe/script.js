let currentPlayer = "X";
const NUMBER_OF_ROWS = 3;
const maxTurns = NUMBER_OF_ROWS ** 2;
let turnsCounter = 0;

const createBoardArray = () => {
  let board = [];
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    board.push(Array.from({ length: NUMBER_OF_ROWS }, () => "-"));
  }
  console.log(board);
  return board;
};

let board = createBoardArray();

const resetButton = document.querySelector("#reset");

const checkRows = (currentPlayer) => {
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    let rowWin = true;
    for (let col = 0; col < NUMBER_OF_ROWS; col++) {
      if (board[row][col] !== currentPlayer) {
        rowWin = false;
        break;
      }
    }
    if (rowWin) {
      return true;
    }
  }
  return false;
};

const checkColumns = (currentPlayer) => {
  for (let col = 0; col < NUMBER_OF_ROWS; col++) {
    let colWin = true;
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      if (board[row][col] !== currentPlayer) {
        colWin = false;
        break;
      }
    }
    if (colWin) {
      return true;
    }
  }
  return false;
};

//[0,0] [1,1] [2,2]
const checkDiagonals = (currentPlayer) => {
  let diagonalWin = true;
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    if (board[i][i] !== currentPlayer) {
      diagonalWin = false;
      break;
    }
  }
  return diagonalWin;
};

//[0,2] [1,1] [2,0]  3
//[0,3] [1,2] [2,1] [3,0]  4
const checkReverseDiagonals = (currentPlayer) => {
  let reverseDiagonalWin = true;
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    if (board[i][NUMBER_OF_ROWS - 1 - i] !== currentPlayer) {
      reverseDiagonalWin = false;
      break;
    }
  }
  return reverseDiagonalWin;
};

const resetBoard = () => {
  document.querySelector(".board").remove();
  createBoard();

  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    for (let j = 0; j < NUMBER_OF_ROWS; j++) {
      board[i][j] = "-";
    }
  }

  currentPlayer = "X";
  turnsCounter = 0;
};

const runDrawEvent = () => {
  setTimeout(() => {
    alert("Draw!");
    resetBoard();
  }, 100);
};

const runWinEvent = (currentPlayer) => {
  setTimeout(() => {
    alert(`Player ${currentPlayer} Won!`);
    resetBoard();
  }, 100);
};

const checkWin = (currentPlayer) => {
  const isRowWin = checkRows(currentPlayer);
  const isColumnWin = checkColumns(currentPlayer);
  const isDiagonalWin = checkDiagonals(currentPlayer);
  const isReverseDiagonalWin = checkReverseDiagonals(currentPlayer);
  if (isRowWin || isColumnWin || isDiagonalWin || isReverseDiagonalWin) {
    return true;
  }
};

const drawMarkInCell = (cell, currentPlayer) => {
  cell.querySelector(".value").textContent = currentPlayer;
  cell.classList.add(`cell--${currentPlayer}`);
};

const cellClickHandler = (event, index) => {
  const cell = event.target;
  const [row, col] = getCellPlacement(index, NUMBER_OF_ROWS);

  if (board[row][col] === "-") {
    turnsCounter++;
    board[row][col] = currentPlayer;
    drawMarkInCell(cell, currentPlayer);

    if (checkWin(currentPlayer)) {
      runWinEvent(currentPlayer);
    } else {
      if (turnsCounter === maxTurns) {
        runDrawEvent();
      }
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
};

const getCellPlacement = (index, noOfRows) => {
  const row = Math.floor(index / NUMBER_OF_ROWS);
  const col = index % NUMBER_OF_ROWS;
  return [row, col];
};

const createBoard = () => {
  const container = document.querySelector(".container");
  const board = document.createElement("div");
  board.classList.add("board");

  for (let i = 0; i < maxTurns; i++) {
    const cellElementString = `<div class="cell" role="button" tabindex="${i + 1}">
                                    <span class="value"></span>
                                </div>`;

    const cellElement = document.createRange().createContextualFragment(cellElementString);
    cellElement.querySelector(".cell").onclick = (event) => cellClickHandler(event, i);
    cellElement.querySelector(".cell").onkeydown = (event, index) => {
      if (event.key === "Enter") {
        cellClickHandler(event, i);
      }
    };
    board.appendChild(cellElement);
    document.documentElement.style.setProperty("--grid-rows", NUMBER_OF_ROWS);
  }
  container.insertAdjacentElement("afterbegin", board);
};

createBoard();
resetButton.addEventListener("click", resetBoard);
