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

  const fillColumn = (coordinat, token) => {

    for (let i = 0; i < gameBoard.rows; ++i) {
      for (let j = 0; j < gameBoard.columns; ++j) {
        if (gameBoard.displayBoard()[i][j] === coordinat) {
          gameBoard.displayBoard()[i][j] = token;
        }
      }
    }
  };

  return { name, token, fillColumn };
};

const playRound = (function () {
  const playerOne = player("asep", "x");
  const playerTwo = player("evah", "o");

  playerOne.fillColumn(1, playerOne.token);
  playerTwo.fillColumn(2, playerTwo.token);

  console.log(gameBoard.displayBoard());
})();
