export class Ship {
    constructor(length){
        this.length = length;
        this.hitsTaken = 0;
    }
    hit(){
        this.hitsTaken++;
    }
    isSunk(){
        return this.length === this.hitsTaken;
    }
}