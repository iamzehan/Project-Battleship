import {Ship} from './index';

let myShip = null;
beforeEach(()=> {
    myShip = new Ship(3);
})

test("Create Ship", ()=> {
    expect(myShip).toEqual({length:3, hitsTaken:0})
})

test("Hit Ship", ()=> {
    myShip.hit();
    expect(myShip).toEqual({length:3, hitsTaken: 1})
})

test("Sink Ship", ()=> {
    while(!myShip.isSunk()){
        myShip.hit();
    }
    expect(myShip).toEqual({length:3, hitsTaken: 3})
})