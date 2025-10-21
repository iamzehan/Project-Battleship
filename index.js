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

export class GameBoard{
    constructor(length, coordinates){
        this.ship = new Ship(length);
        this.coordinates = coordinates;
        this.deploy();
    }

    deploy(long=false){
        const [row, columns] = this.coordinates;
        const occupy = [];
        if (long){
            let i = 0;
            while(i<this.ship.length){
                occupy.push(row, columns+i);
                i++;
            }
        }
        else{
            let i = 0;
            while(i<this.ship.length){
                occupy.push(row+1, columns);
                i++;
            }
        }
    }
}