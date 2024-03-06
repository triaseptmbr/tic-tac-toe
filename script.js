const gameBoard = (() => {
  const rows = 3;
  const columns = 3;
  const array = [];
  let numberOfColumn = 1;

  for (let i = 0; i < rows; ++i) {
    array[i] = [];
    for (let j = 0; j < columns; ++j) {
      array[i][j] = numberOfColumn;
      numberOfColumn++;
    }
  }

  const displayBoard = () => {
    return array;
  };

  return { rows, columns, displayBoard };
})();

const player = (name, token) => {
  const dataToken = [];

  const fillColumn = (coordinat, token) => {
    for (let i = 0; i < gameBoard.rows; ++i) {
      for (let j = 0; j < gameBoard.columns; ++j) {
        if (gameBoard.displayBoard()[i][j] === coordinat) {
          if (typeof gameBoard.displayBoard()[i][j] === "string") {
            break;
          }

          gameBoard.displayBoard()[i][j] = token;
          dataToken.push(`${i}${j}`);
        }
      }
    }
  };

  const check = () => {
    const dataTokenRows = [];
    const dataTokenColumns = [];
    let statusRows;
    let statusColumns;
    let statusRowsDiagonal;
    let statusColumnsDiagonal;

    dataToken.forEach((element) => {
      dataTokenRows.push(element.substring(0, 1));
    });

    dataToken.forEach((element) => {
      dataTokenColumns.push(element.substring(1, 2));
    });

    for (let i = 1; i < dataTokenRows.length; ++i) {
      if (dataTokenRows[i - 1] !== dataTokenRows[i]) {
        statusRows = 0;
        break;
      }
      statusRows = 1;
    }

    for (let i = 1; i < dataTokenColumns.length; ++i) {
      if (dataTokenColumns[i - 1] !== dataTokenColumns[i]) {
        statusColumns = 0;
        break;
      }
      statusColumns = 1;
    }

    for (let i = 1; i < dataTokenRows.length; ++i) {
      if (dataTokenRows[i - 1] === dataTokenRows[i]) {
        statusRowsDiagonal = 0;
        break;
      }
      statusRowsDiagonal = 1;
    }

    for (let i = 1; i < dataTokenColumns.length; ++i) {
      if (dataTokenColumns[i - 1] === dataTokenColumns[i]) {
        statusColumnsDiagonal = 0;
        break;
      }
      statusColumnsDiagonal = 1;
    }

    let status = statusRows || statusColumns;

    if (
      status === 0 &&
      statusRowsDiagonal === 1 &&
      statusColumnsDiagonal === 1
    ) {
      status = 1;
    }

    return status;
  };

  return { name, token, fillColumn, check };
};

const displayBoard = () => {
  const grid = document.querySelector("#gameboard");

  if (grid.hasChildNodes()) {
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
  }

  grid.style.setProperty("--rows", gameBoard.rows);
  grid.style.setProperty("--columns", gameBoard.columns);

  let index = 1;
  gameBoard.displayBoard().forEach((element) => {
    element.forEach((elementOfElement) => {
      const column = document.createElement("div");
      const token = document.createElement("span");

      if (typeof elementOfElement === "string") {
        token.textContent = elementOfElement;
      } else {
        token.textContent = "";
      }

      grid.appendChild(column);
      column.appendChild(token);

      column.setAttribute("data-coordinat", index);
      index++;
    });
  });
  let clickColumn = document.querySelectorAll("#gameboard > div");

  const playerOne = player("asep", "x");

  clickColumn = document.querySelectorAll("#gameboard > div");
  clickColumn.forEach((element) => {
    element.addEventListener("click", function (e) {
      let coordinat = Number(e.target.dataset.coordinat);
      playerOne.fillColumn(coordinat, playerOne.token);
      console.log(gameBoard.displayBoard());
      displayBoard();
    });
  });
};

const playRound = (() => {
  const playerOne = player("asep", "x");
  displayBoard();

  const clickColumn = document.querySelectorAll("#gameboard > div");
  clickColumn.forEach((element) => {
    element.addEventListener("click", function (e) {
      let coordinat = Number(e.target.dataset.coordinat);
      playerOne.fillColumn(coordinat, playerOne.token);
      console.log(gameBoard.displayBoard());
      displayBoard();
    });
  });
})();
