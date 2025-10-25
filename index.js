export class Ship {
  constructor(length) {
    this.length = length;
    this.hitsTaken = 0;
    this.positions = []
  }
  hit() {
    this.hitsTaken++;
  }
  isSunk() {
    return this.length === this.hitsTaken;
  }
}

export class GameBoard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill("~"));
  }

  deploy(ship, [row, col], direction = "horizontal") {
    if (direction === "horizontal" && col + ship.length > 10) {
      return false;
    } else if (direction === "vertical" && row + ship.length > 10) {
      return false;
    }

    for (let i = 0; i < ship.length; i++) {
      const r = direction === "horizontal" ? row : row + i;
      const c = direction === "horizontal" ? col + i : col;
      if (this.board[r][c] !== "~") {
        return false;
      }
    }

    for (let i = 0; i < ship.length; i++) {
      const r = direction === "horizontal" ? row : row + i;
      const c = direction === "horizontal" ? col + i : col;
      this.board[r][c] = "S";
      ship.positions.push([r, c]);
    }
    return true;
  }
}
// const gameBoard = new GameBoard();
// const myShip = new Ship(3);
// gameBoard.deploy(myShip, [0, 9]);
// console.log(gameBoard)
