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

    let status = statusRows || statusColumns

    return status;
  };

  return { name, token, fillColumn, check };
};

const playRound = (function () {
  const playerOne = player("asep", "x");

  playerOne.fillColumn(7, playerOne.token);
  playerOne.fillColumn(8, playerOne.token);
  playerOne.fillColumn(5, playerOne.token);

  console.log(gameBoard.displayBoard());
  console.log(playerOne.check());
})();
