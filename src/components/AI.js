import Player from "./Player";

class AI extends Player {
  constructor() {
    super();
    this.name = "Computer";
    this.turn = false;
  }

  attack(enemy, enemyBoard) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    if (this.checkTurn()) {
      enemyBoard.receiveAttack(x, y);
      this.endTurn(enemy); 
    }
  }
}

export default AI;