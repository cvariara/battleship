import Ship from "./Ship";

class Gameboard {
  constructor() {
    this.board = this.makeBoard();
    this.missedAttacks = [];
    this.attackedCoords = [];
  }

  makeBoard() {
    let boardArray = [];
    let boardRow = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        boardRow.push("");
      }
      boardArray.push(boardRow);
      boardRow = [];
    }
    return boardArray;
  }

  isPlaceShipValid(length, x, y) {
    if (x > 10 || x < 0 || x + length > 10 || y > 10 || y < 0) {
      return false;
    } else {
      for (let i = x; i < x + length; i++) {
        if (this.board[y][i] !== "") return false;
      }
    }
    return true;
  }

  placeShip(ship, x, y) {
    if (this.isPlaceShipValid(ship.length, x, y)) {
      for (let i = 0; i < ship.length; i++) {
        this.board[y][x + i] = { name: ship, id: i };
      }
    }
  }

  receiveAttack(x, y) {
    if (!this.attackedCoords.some((coord) => coord.x === x && coord.y === y)) {
      if (this.board[y][x] !== "") {
        let ship = this.board[y][x].name;
        let id = this.board[y][x].id;
        ship.hit(id);
      } else {
        this.missedAttacks.push({ x, y });
      }
      this.attackedCoords.push({ x, y });
    }
  }

  allSunk(...ships) {
    let counter = 0;
    ships.forEach((ship) => {
      if (ship.isSunk()) counter++;
    });
    if (counter === 5) return true;
    return false;
  }
}

export default Gameboard;
