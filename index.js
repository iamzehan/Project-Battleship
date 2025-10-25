export class Ship {
  constructor(length) {
    this.length = length;
    this.hitsTaken = 0;
    this.positions = [];
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
    this.ships = {};
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
      this.ships[`${r}${c}`] = ship;
    }
    return true;
  }
  receiveAttack([x, y]) {
    if (this.board[x][y] === "S") {
      this.ships[`${x}${y}`].hit();
      this.board[x][y] = "o"; // record hit
      return true;
    } else {
      this.board[x][y] = "x"; // record missed
      return false;
    }
  }
}

export class Player {
  constructor() {
    this.board = new GameBoard();
    this.ships = {
      vessel: new Ship(1),
      corvette: new Ship(2),
      destroyer: new Ship(3),
      carrier: new Ship(4),
    };
  }
}
