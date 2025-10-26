import { Ship, GameBoard, Player } from "../game_logic";
import "./style.css";

const cells = document.querySelectorAll("div.attack>div.row>div");
const comp = new Player();

comp.board.deploy(comp.ships.destroyer, [0, 0]);
comp.board.deploy(comp.ships.corvette, [5, 9], "vertical");

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const [x, y] = cell.className.split("");
    if (comp.board.receiveAttack([parseInt(x), parseInt(y)])) {
      cell.innerHTML = "<span class='marker'>🔥</span>";
      cell.classList.add("hit");
    } else {
      cell.innerHTML = "<span class='marker'>🌊</span>";
      cell.classList.add("miss");
    }
  });
});
