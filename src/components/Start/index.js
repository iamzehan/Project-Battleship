import "./style.css";
import template from "./index.html";
import { Player } from "../../game_logic";

export default class Start {
  constructor() {
    this.player = new Player();
    this.dialog = document.createElement("dialog");
    this.dialog.className = "container";
    this.select = document.createElement("select");
    this.select.className = "ships";
    this.select.innerHTML = template;
    this.dialog.appendChild(this.select);
    this.gameboard = document.body
      .querySelector("div.gameboard>div.player")
      .cloneNode(true);
    this.dialog.appendChild(this.gameboard);
    this.cells = this.gameboard.querySelectorAll(".row>div");
    this.#placingShipEvent();
  }

  #deployShipPreview(cell, length, align) {
    // get the cell numbers
    const [x, y] = cell.className.split("-")[1].split("");
    //bounds check
    if (
      (align === "h" && parseInt(y) + length > 10) ||
      (align === "v" && parseInt(x) + length > 10)
    ) {
      return null;
    }

    const cells = [];
    for (let i = 0; i < length; i++) {
      const cellNo =
        align === "h" ? `${x}${parseInt(y) + i}` : `${parseInt(x) + i}${y}`;
      const cell = this.dialog.querySelector(`.col-${cellNo}`);
      // collision check
      if (cell.classList.contains("deploy")) {
        return;
      }
      cells.push(cell);
    }
    cells.forEach((c) => {
      c.classList.toggle("preview");
    });
    return cells;
  }

  #deployShip(cell, length, align) {
    const cells = this.#deployShipPreview(cell, length, align);
    if (cells.length > 0) {
      cells.forEach((c) => {
        c.classList.add("deploy");
        // this.player.board.deploy();
      });
      return true;
    }
    return false;
  }
  #getShipVals(val) {
    let ship = val ? val : this.select.value;
    let selectedShip = this.player.ships[ship];
    let length = selectedShip.length;
    return [ship, selectedShip, length];
  }
  #placingShipEvent() {
    let [ship, selectedShip, length] = this.#getShipVals();

    this.select.addEventListener("change", (e) => {
      ship = e.target.value;
      selectedShip = this.player.ships[ship];
      length = selectedShip.length;
    });

    this.cells.forEach((cell) => {
      cell.addEventListener("mouseover", (e) => {
        if (this.select.value) this.#deployShipPreview(cell, length, "v");
      });
      cell.addEventListener("mouseout", () => {
        if (this.select.value) this.#deployShipPreview(cell, length, "v");
      });
      cell.addEventListener("click", () => {
        if (this.select.value) {
          const deployed = this.#deployShip(cell, length, "v");
          if (deployed) {
            let selected = this.select.querySelector(`.${ship}`);
            if (this.select.value) {
              this.select.removeChild(selected);
              if(this.select.value) [ship, selectedShip, length] = this.#getShipVals(
                this.select.value,
              );
              else this.select.style.visibility = "hidden";
            }
          }
        }
      });
    });
  }

  load() {
    this.dialog.close();
    return this.dialog;
  }
}
