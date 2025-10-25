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
    expect(myShip).toEqual({ length: 3, hitsTaken: 0, positions: [] });
  });

  test("Hit Ship", () => {
    myShip.hit();
    expect(myShip).toEqual({ length: 3, hitsTaken: 1, positions: [] });
  });

  test("Sink Ship", () => {
    while (!myShip.isSunk()) {
      myShip.hit();
    }
    expect(myShip).toEqual({ length: 3, hitsTaken: 3, positions: [] });
  });
});

describe("Gameboard operations", () => {
  beforeEach(() => {
    gameBoard = new GameBoard();
    myShip = new Ship(3);
  });
  afterEach(() => {
    myShip = null;
  });

  test("Deploy auto (horizontal)", () => {
    expect(gameBoard.deploy(myShip, [0, 9])).toBe(false);
    expect(gameBoard.deploy(myShip, [0, 0])).toBe(true);
  });

  test("Detect collisions (horizontal)", () => {
    expect(gameBoard.deploy(myShip, [0, 0])).toBe(true);
    // detect collisions
    expect(gameBoard.deploy(myShip, [0, 0])).toBe(false);
    expect(gameBoard.deploy(myShip, [0, 1])).toBe(false);
    expect(gameBoard.deploy(myShip, [0, 2])).toBe(false);
    // detect non-collisions
    expect(gameBoard.deploy(myShip, [0, 3])).toBe(true);
  });

  test("Deploy auto (vertical)", () => {
    expect(gameBoard.deploy(myShip, [9, 0], "vertical")).toBe(false);
    expect(gameBoard.deploy(myShip, [0, 0], "vertical")).toBe(true);
  });

  test("Detect collisions (vertical)", () => {
    expect(gameBoard.deploy(myShip, [0, 0], "vertical")).toBe(true);
    // detect collisions
    expect(gameBoard.deploy(myShip, [0, 0], "vertical")).toBe(false);
    expect(gameBoard.deploy(myShip, [1, 0], "vertical")).toBe(false);
    expect(gameBoard.deploy(myShip, [2, 0], "vertical")).toBe(false);
    // detect non-collisions
    expect(gameBoard.deploy(myShip, [0, 1], "vertical")).toBe(true);
  });

  test("Detect positions (horizontal)",()=> {
    gameBoard.deploy(myShip, [0, 0]);
    expect(myShip.positions).toEqual([[0,0],[0,1],[0,2]]);
  });
  test("Detect positions (vertical)",()=> {
    gameBoard.deploy(myShip, [0, 0], "vertical");
    expect(myShip.positions).toEqual([[0,0],[1,0],[2,0]]);
  });
});
