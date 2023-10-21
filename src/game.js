import Ship from "./components/Ship";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import AI from "./components/AI";

export function game() {
  // Players
  const player = new Player("Chris");
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

  placeShipAI(submarine);
  placeShipAI(cruiser);
  placeShipAI(destroyer);
  placeShipAI(battleship);
  placeShipAI(carrier);
  console.log(battlefieldOpponent.board);

  //const ships = document.querySelector(".ships");

  function loadShip(shipData) {
    console.log(shipData);
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
    console.log(data, x, y);
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
        console.log(destroyer.length, x, y);
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
    //console.log(battlefieldPlayer.board);
  }

  function startGame() {
    const oppBoard = document.querySelector("#battlefieldOpponent > .grid");
    const playerBoard = document.querySelector("#battlefieldPlayer > .grid");
    const turnDisplay = document.querySelector(".turn");
  
    const currentPlayer = player.checkTurn() ? player : computer;
    const opponentBoard = player.checkTurn() ? battlefieldOpponent : battlefieldPlayer;
  
    turnDisplay.textContent = `${currentPlayer.getName()}'s Turn...`;
  
    if (currentPlayer.checkTurn()) {
      oppBoard.parentElement.classList.remove("opacity");
      playerBoard.parentElement.classList.add("opacity");
  
      oppBoard.addEventListener("click", (e) => {
        if (currentPlayer.checkTurn()) {
          console.log(currentPlayer)
          const x = parseInt(e.target.dataset.x);
          const y = parseInt(e.target.dataset.y);
          console.log(x,y, opponentBoard, oppBoard)
          currentPlayer.attack(x, y, computer, opponentBoard);
          boardEvents("battlefieldOpponent", battlefieldOpponent);
  
          // Check if the game is over and display a message if it is
          // if (battlefieldOpponent.allSunk()) {
          //   turnDisplay.textContent = `${currentPlayer.getName()} wins!`;
          //   return; // Game over, don't continue.
          // }
  
          // Switch to the computer's turn after a delay
          setTimeout(() => {
            computer.attack(player, battlefieldPlayer);
            boardEvents("battlefieldPlayer", battlefieldPlayer);
  
            // Check if the game is over and display a message if it is
            // if (battlefieldPlayer.allSunk()) {
            //   turnDisplay.textContent = `${computer.getName()} wins!`;
            //   return; // Game over, don't continue.
            // }
  
            startGame(); // Continue the game
          }, 1000);
        }
      });
    }
  }
  

  function boardEvents(boardName, board) {
    const boardDOM = document.querySelector(`#${boardName} > .grid`);
    const boardArr = board.board;
    const missedAttacksArr = board.missedAttacks;
    //console.log(boardDOM, boardArr, missedAttacksArr)

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
