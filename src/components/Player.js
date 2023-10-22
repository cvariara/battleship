class Player {
  constructor(name) {
    this.name = name;
    this.turn = true;
  }

  getName() {
    return this.name;
  }

  startTurn() {
    if (!this.turn) {
      this.turn = true;
    }
  }

  endTurn(opponent) {
    if (this.turn) {
      this.turn = false;
      opponent.startTurn();
    }
  }

  checkTurn() {
    return this.turn;
  }

  attack(x, y, enemyBoard) {
    if (this.checkTurn()) {
      enemyBoard.receiveAttack(x, y);
    }
  }
}

export default Player;