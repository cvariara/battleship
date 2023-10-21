class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.numOfHits = 0;
    this.sunk = false;
    this.shipArr = this.createShipArr();
  }

  createShipArr() {
    let array = []
    for (let i = 0; i < this.length; i++) {
      array.push({ hit: false });
    }
    return array;
  }

  hit(id) {
    this.numOfHits++;
    this.shipArr[id].hit = true;
  }

  isSunk() {
    if (this.numOfHits === this.length) this.sunk = true;
    return this.sunk;
  }
}

export default Ship;