import { Ship, GameBoard } from "./index";

let myShip = null;

describe("Ship class operations", () => {
  beforeEach(() => {
    myShip = new Ship(3);
  });
  afterEach(() => {
    myShip = null;
  });
  test("Create Ship", () => {
    expect(myShip).toEqual({ length: 3, hitsTaken: 0 });
  });

  test("Hit Ship", () => {
    myShip.hit();
    expect(myShip).toEqual({ length: 3, hitsTaken: 1 });
  });

  test("Sink Ship", () => {
    while (!myShip.isSunk()) {
      myShip.hit();
    }
    expect(myShip).toEqual({ length: 3, hitsTaken: 3 });
  });
});

describe("Gameboard operations", () => {
  beforeEach(() => {
    gameBoard = new GameBoard();
    
  });
  afterEach(() => {
    myShip = null;
  });

  test("Deploy", () => {
    myShip = new Ship(3);
    gameBoard.deploy(myShip, [0,0], true);
    expect(gameBoard.ships[0]).toEqual(myShip);
    expect(gameBoard.coordinates).toEqual([[[0,0],[0,1],[0,2]]])
  });
  test("Deploy auto", () => {
    myShip = new Ship(3);
    gameBoard.deploy(myShip, [0,9]);
    expect(gameBoard.ships[0]).toEqual(myShip);
    expect(gameBoard.coordinates).toEqual([[[0,9],[1,9],[2,9]]])
  });

});
