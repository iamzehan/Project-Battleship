import "./style.css";
import { Player } from "../../game_logic";

export default class Start {
  constructor() {
    this.player = new Player();
    this.dialog = document.createElement("dialog");
    this.dialog.className = "container";

    this.select = this.#createSelectElement();
    this.dialog.appendChild(this.select);

    this.align = this.#createAlignElement();
    this.dialog.appendChild(this.align);

    this.gameboard = document.body
      .querySelector("div.gameboard>div.player")
      .cloneNode(true);
    this.dialog.appendChild(this.gameboard);
    this.cells = this.gameboard.querySelectorAll(".row>div");
    this.#placingShipEvent();
  }

  #createSelectElement(){
    let select = document.createElement("select");
    select.className = "ships";
    Object.entries(this.player.ships).forEach(([k, v])=>{
      let option = document.createElement("option");
      option.className=k;
      option.value = k;
      option.textContent = k[0].toUpperCase()+k.slice(1,);
      select.appendChild(option)
    })
    return select;
  }
  #createAlignElement(){
    let align = document.createElement("select");
    align.className="align";
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    option1.textContent = "Horizontal";
    option2.textContent = "Vertical";

    option1.value = "horizontal";
    option2.value = "vertical"

    align.appendChild(option1);
    align.appendChild(option2);

    return align;
    
  }
  #deployShipPreview(cell, length, align) {
    // get the cell numbers
    const [x, y] = cell.className.split("-")[1].split("");
    //bounds check
    if (
      (align === "horizontal" && parseInt(y) + length > 10) ||
      (align === "vertical" && parseInt(x) + length > 10)
    ) {
      return null;
    }

    const cells = [];
    for (let i = 0; i < length; i++) {
      const cellNo =
        align === "horizontal" ? `${x}${parseInt(y) + i}` : `${parseInt(x) + i}${y}`;
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
        if (this.select.value) this.#deployShipPreview(cell, length, this.align.value);
      });
      cell.addEventListener("mouseout", () => {
        if (this.select.value) this.#deployShipPreview(cell, length, this.align.value);
      });
      cell.addEventListener("click", () => {
        if (this.select.value) {
          const coords = cell.className.split("-")[1].split("").map(Number);
          const deployed = this.#deployShip(cell, length, this.align.value);
          if (deployed) {
            this.player.board.deploy(selectedShip, coords, this.align.value);
            let selected = this.select.querySelector(`.${ship}`);
            if (this.select.value) {
              this.select.removeChild(selected);
              if(this.select.value) [ship, selectedShip, length] = this.#getShipVals(
                this.select.value,
              );
              else {
                this.select.style.visibility = "hidden";
                this.align.style.visibility = "hidden";
              }
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
