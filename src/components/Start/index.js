import "./style.css";

export default class Start {
  constructor() {
    this.dialog = document.createElement("dialog");
    this.dialog.className = "container";
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
    return (cells.length>0)?
    cells.forEach((c) => {
        c.classList.add("deploy");
      })
    :null;
  }
  #placingShipEvent() {
    this.cells.forEach((cell) => {
      cell.addEventListener("mouseover", (e) => {
        this.#deployShipPreview(cell, 3, "v");
      });
      cell.addEventListener("mouseout", () => {
        this.#deployShipPreview(cell, 3, "v");
      });
      cell.addEventListener("click", () => {
        this.#deployShip(cell, 3, "v");
      });
    });
  }

  load() {
    this.dialog.close();
    return this.dialog;
  }
}
