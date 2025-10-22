export class Ship {
  constructor(length) {
    this.length = length;
    this.hitsTaken = 0;
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
    this.ships = [];
    this.coordinates = [];
  }

  #byColumn(row, col, limit){
    const occupy = [];
    let i = 0;
      while (i < limit) {
        occupy.push([row, col + i]);
        i++;
      }
    return occupy; 
  }

  #byRow(row, col, limit){
    const occupy = [];
    let i = 0;
      while (i < limit) {
        occupy.push([row + i, col]);
        i++;
      }
      return occupy;
  }

  deploy(ship, coordinates, long = false) {
    const row = coordinates[0];
    const col = coordinates[1];
    this.ships.push(ship);
    if (long === true) {
      this.coordinates.push(this.#byColumn(row, col, ship.length))
    } else if (long == false) {
      this.coordinates.push(this.#byRow(row, col, ship.length))
    }
  }
}
// const gameBoard = new GameBoard();
// const myShip = new Ship(3);
// gameBoard.deploy(myShip, [0, 9]);
// console.log(gameBoard)
