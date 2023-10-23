import Ship from "./components/Ship";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import AI from "./components/AI";

export function game() {
  // Players
  const player = new Player("Player");
  const computer = new AI();

  // Boards
  const battlefieldPlayer = new Gameboard();
  const battlefieldOpponent = new Gameboard();

  createBoard("battlefieldPlayer");
  createBoard("battlefieldOpponent");

  // Ships
  const submarine = new Ship("submarine", 2);
  const cruiser = new Ship("cruiser", 3);
  const destroyer = new Ship("destroyer", 4);
  const battleship = new Ship("battleship", 4);
  const carrier = new Ship("carrier", 5);

  loadShip(submarine);
  loadShip(cruiser);
  loadShip(destroyer);
  loadShip(battleship);
  loadShip(carrier);

  // AI Ships
  const submarineAI = new Ship("submarine", 2);
  const cruiserAI = new Ship("cruiser", 3);
  const destroyerAI = new Ship("destroyer", 4);
  const battleshipAI = new Ship("battleship", 4);
  const carrierAI = new Ship("carrier", 5);

  placeShipAI(submarineAI);
  placeShipAI(cruiserAI);
  placeShipAI(destroyerAI);
  placeShipAI(battleshipAI);
  placeShipAI(carrierAI);

  function loadShip(shipData) {
    const ships = document.querySelector(".ships");
    const ship = document.createElement("div");

    ship.classList.add("ship");
    ship.setAttribute("draggable", true);
    ship.setAttribute("id", shipData.name);

    for (let i = 0; i < shipData.length; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      ship.appendChild(block);
    }

    ship.addEventListener("dragstart", drag);

    ships.appendChild(ship);
  }

  function createBoard(boardName) {
    const board = document.querySelector(`#${boardName} > .grid`);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-square");
        cell.setAttribute("data-x", j);
        cell.setAttribute("data-y", i);
        if (boardName === "battlefieldPlayer") {
          cell.addEventListener("dragover", (e) => {
            e.preventDefault();
          });
          cell.addEventListener("drop", (e) => {
            e.preventDefault();
            dropShip(e);
          });
        } else if (boardName === "battlefieldOpponent") {
          board.parentElement.classList.add("opacity");
        }
        board.appendChild(cell);
      }
    }
  }

  function placeShipAI(ship) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (!battlefieldOpponent.isPlaceShipValid(ship.length, x, y)) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    battlefieldOpponent.placeShip(ship, x, y);
  }

  function dropShip(e) {
    const data = e.dataTransfer.getData("text");
    const x = parseInt(e.target.getAttribute("data-x"));
    const y = parseInt(e.target.getAttribute("data-y"));

    const ships = document.querySelector(".ships");
    const board = document.querySelector("#battlefieldPlayer > .grid");
    switch (data) {
      case "submarine":
        if (battlefieldPlayer.isPlaceShipValid(submarine.length, x, y)) {
          battlefieldPlayer.placeShip(submarine, x, y);
          var ship = ships.querySelector(`#${data}`);
          for (let i = 0; i < submarine.length; i++) {
            const cell = board.querySelector(
              `[data-x='${x + i}'][data-y='${y}']`
            );
            cell.style.backgroundColor = "var(--ship-color)";
            cell.style.borderColor = "rgb(41, 41, 41)";
          }
          ships.removeChild(ship);
        }
        break;
      case "cruiser":
        if (battlefieldPlayer.isPlaceShipValid(cruiser.length, x, y)) {
          battlefieldPlayer.placeShip(cruiser, x, y);
          var ship = ships.querySelector(`#${data}`);
          for (let i = 0; i < cruiser.length; i++) {
            const cell = board.querySelector(
              `[data-x='${x + i}'][data-y='${y}']`
            );
            cell.style.backgroundColor = "var(--ship-color)";
            cell.style.borderColor = "rgb(41, 41, 41)";
          }
          ships.removeChild(ship);
        }
        break;
      case "destroyer":
        if (battlefieldPlayer.isPlaceShipValid(destroyer.length, x, y)) {
          battlefieldPlayer.placeShip(destroyer, x, y);
          var ship = ships.querySelector(`#${data}`);
          for (let i = 0; i < destroyer.length; i++) {
            const cell = board.querySelector(
              `[data-x='${x + i}'][data-y='${y}']`
            );
            cell.style.backgroundColor = "var(--ship-color)";
            cell.style.borderColor = "rgb(41, 41, 41)";
          }
          ships.removeChild(ship);
        }
        break;
      case "battleship":
        if (battlefieldPlayer.isPlaceShipValid(battleship.length, x, y)) {
          battlefieldPlayer.placeShip(battleship, x, y);
          var ship = ships.querySelector(`#${data}`);
          for (let i = 0; i < battleship.length; i++) {
            const cell = board.querySelector(
              `[data-x='${x + i}'][data-y='${y}']`
            );
            cell.style.backgroundColor = "var(--ship-color)";
            cell.style.borderColor = "rgb(41, 41, 41)";
          }
          ships.removeChild(ship);
        }
        break;
      case "carrier":
        if (battlefieldPlayer.isPlaceShipValid(carrier.length, x, y)) {
          battlefieldPlayer.placeShip(carrier, x, y);
          var ship = ships.querySelector(`#${data}`);
          for (let i = 0; i < carrier.length; i++) {
            const cell = board.querySelector(
              `[data-x='${x + i}'][data-y='${y}']`
            );
            cell.style.backgroundColor = "var(--ship-color)";
            cell.style.borderColor = "rgb(41, 41, 41)";
          }
          ships.removeChild(ship);
        }
        break;
    }
    if (ships.childElementCount === 0) {
      startGame();
    }
  }

  function startGame() {
    const oppBoard = document.querySelector("#battlefieldOpponent > .grid");
    const playerBoard = document.querySelector("#battlefieldPlayer > .grid");
    const turnDisplay = document.querySelector(".turn");

    const currentPlayer = player.checkTurn() ? player : computer;
    const opponentBoard = player.checkTurn()
      ? battlefieldOpponent
      : battlefieldPlayer;

    turnDisplay.textContent = `${currentPlayer.getName()}'s Turn...`;

    // Player chooses where to attack
    if (currentPlayer === player) {
      oppBoard.parentElement.classList.remove("opacity");
      playerBoard.parentElement.classList.add("opacity");

      oppBoard.addEventListener("click", function handleMove(e) {
        const x = parseInt(e.target.dataset.x);
        const y = parseInt(e.target.dataset.y);

        oppBoard.removeEventListener("click", handleMove);
        if (
          opponentBoard.attackedCoords.some(
            (coord) => coord.x === x && coord.y === y
          )
        ) {
          startGame();
          return;
        }

        currentPlayer.attack(x, y, opponentBoard);
        boardEvents("battlefieldOpponent", battlefieldOpponent);

        if (
          opponentBoard.allSunk(
            submarineAI,
            cruiserAI,
            destroyerAI,
            battleshipAI,
            carrierAI
          )
        ) {
          endGame(currentPlayer, turnDisplay);
          return;
        }

        currentPlayer.endTurn(computer);
        startGame();
      });
    }

    if (currentPlayer === computer) {
      oppBoard.parentElement.classList.add("opacity");
      playerBoard.parentElement.classList.remove("opacity");
      // Switch to the computer's turn after a delay
      setTimeout(() => {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        if (
          opponentBoard.attackedCoords.some(
            (coord) => coord.x === x && coord.y === y
          )
        ) {
          startGame();
          return;
        }

        currentPlayer.attack(x, y, opponentBoard);
        boardEvents("battlefieldPlayer", battlefieldPlayer);

        if (
          opponentBoard.allSunk(
            submarine,
            cruiser,
            destroyer,
            battleship,
            carrier
          )
        ) {
          endGame(currentPlayer, turnDisplay);
          return;
        }

        currentPlayer.endTurn(player);
        startGame(); // Continue the game
      }, 1000);
    }
  }

  function endGame(winner, turnDisplay) {
    const restart = document.querySelector(".restart");
    turnDisplay.textContent = `${winner.getName()} is the winner!`;

    restart.style.visibility = "visible";
    restart.addEventListener("click", () => {
      window.location.reload();
    });
  }

  function boardEvents(boardName, board) {
    const boardDOM = document.querySelector(`#${boardName} > .grid`);
    const boardArr = board.board;
    const missedAttacksArr = board.missedAttacks;

    boardArr.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell.name) {
          if (cell.name.shipArr[cell.id].hit === true) {
            let selected = boardDOM.querySelector(
              `[data-x='${x}'][data-y='${y}']`
            );
            selected.classList.add("hit");
            selected.textContent = "X";
          }
        }
      });
    });

    missedAttacksArr.forEach((attack) => {
      let selected = boardDOM.querySelector(
        `[data-x='${attack.x}'][data-y='${attack.y}']`
      );
      selected.classList.add("missed");
      selected.textContent = "X";
    });
  }

  function drag(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }
}
