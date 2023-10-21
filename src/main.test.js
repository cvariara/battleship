import Ship from "./components/Ship";
import Gameboard from "./components/Gameboard";

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship("ship", 3);
  });

  test("initializes correctly", () => {
    expect(ship.length).toBe(3);
    expect(ship.numOfHits).toBe(0);
    expect(ship.sunk).toBe(false);
  });

  test("increase numOfHit when hit", () => {
    ship.hit();
    expect(ship.numOfHits).toBe(1);
  });

  test("if hit once, it has not sunk", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    expect(ship.sunk).toBe(false);
  });

  test("if hit three times, it sunk", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
    expect(ship.sunk).toBe(true);
  });
});

describe("Gameboard", () => {
  let gb;

  beforeEach(() => {
    gb = new Gameboard();
  });

  test("initialize board", () => {
    expect(gb.board).toEqual([
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
    expect(gb.missedAttacks).toEqual([]);
  });

  test("place ship", () => {
    let ship = new Ship("ship", 3);
    gb.placeShip(ship, 3, 3);
    expect(gb.board).toEqual([
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      [
        "",
        "",
        "",
        { name: "ship", id: 0 },
        { name: "ship", id: 1 },
        { name: "ship", id: 2 },
        "",
        "",
        "",
        "",
        
      ],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });
});
