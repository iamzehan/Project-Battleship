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
    this.placingShipEvent();
  }

  #placeShipPreview(cell, length, align){
    const [x, y] = cell.className.split("-")[1].split("")
    if (align==="h" && parseInt(y)+length>10) {
      return;
    }
    if( align==="v" && parseInt(x)+length > 10) {
      return;
    }
    for(let i=0; i<length; i++){
      try{
      const cellNo = align==='h'?`${x}${parseInt(y)+i}`:`${parseInt(x)+i}${y}`;
      const cell = this.dialog.querySelector(`.col-${cellNo}`);
       cell.classList.toggle("preview")
      }catch{
        return;
      }
    }
  }
  placingShipEvent() {
    this.cells.forEach((cell) => {
      cell.addEventListener("mouseover", (e)=> {
        this.#placeShipPreview(cell, 3, "v");
      });
      cell.addEventListener("mouseout", ()=>{
        this.#placeShipPreview(cell, 3, "v");
      })
    });
  }

  load() {
    this.dialog.close();
    return this.dialog;
  }
}
