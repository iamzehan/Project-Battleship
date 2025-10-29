import { Ship, GameBoard, Player } from "./game_logic";
import Start from "./components/Start";
import "./style.css";

const players={
  "player":null,
  "computer":new Player()
}

document.addEventListener("DOMContentLoaded", () => {
  let dialog = new Start();
  document.body.appendChild(dialog.dialog);
  dialog.open();
  dialog.startBtn.addEventListener("click", () => {
    const gameboard = document.querySelector("div.gameboard>div.player");
    const rows = dialog.gameboard.querySelectorAll("div.row");
    gameboard.innerHTML = "";
    rows.forEach((row) => {
      gameboard.appendChild(row);
    });
    players["player"] = dialog.player;
  });
});

const toggleBetween=()=> {
  const turn = document.querySelectorAll(".players > h2");
  const attack = document.querySelectorAll(".gameboard > div");
  turn.forEach((t)=> {
    t.classList.toggle("turn");
  })
  attack.forEach((a)=> {
    a.classList.toggle("attack");
  })
}

const getCells=()=>{
  return document.querySelectorAll("div.attack>div.row>div");
}

const getCurrentTurn=()=> {
  const turn = document.querySelector(".turn");
  console.log(turn)
  return (turn.textContent === "You")? "computer"
: "player";
}

const comp = players["computer"];
comp.board.deploy(comp.ships.destroyer, [0, 0]);
comp.board.deploy(comp.ships.corvette, [5, 9], "vertical");
players["computer"] = comp;

let cells = getCells();

let current = players[getCurrentTurn()];

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const [x, y] = cell.className.split("-")[1].split("").map(Number);
    if (current.board.receiveAttack([x, y])) {
      cell.innerHTML = "<span class='marker'>🔥</span>";
      cell.classList.add("hit");
    } else {
      cell.innerHTML = "<span class='marker'>🌊</span>";
      cell.classList.add("miss");
    }
    toggleBetween();
    cells = getCells();
    current = players[getCurrentTurn()];
  });
});
