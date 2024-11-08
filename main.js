import { Ship } from "../test.js";
import { Computer } from "../test.js";
import { Player } from "../test.js";
import { GameBoard } from "../test.js";

const playerBoard = document.querySelector(".playerBoard");
const computerBoard = document.querySelector(".computerBoard");


let player = new Player();
let computer = new Computer();
let four = new Ship(4);
let three = new Ship(3);
// player.board.placeShip([1, 2, 3, 4], four);
computer.board.placeShip([98, 99, 100], three);
computer.board.placeShip([77, 78, 79], three);
computer.board.placeShip([14, 13, 12, 11], three);

console.log(computer.board.board[99])


console.log(computer.board.allShipsSunk)
console.log(player.board.allShipsSunk)
// computer.attack(player);
// computer.attack(player)
console.log(player.board.board)

// makeComputerBoard();

let ko =0
// while (player.board.allShipsSunk != true && computer.board.allShipsSunk != true){

let mainList = [];
let cur = []
for (let i =1; i< 101; i++){
    cur[cur.length] = i;
    if (i%10==0){
        mainList.push(cur)
        cur =[]
    }else{
        continue
    }
}

console.log(mainList)
function isPlacementValid(arr){
    for (let list of mainList){
        let score = 0;
        for (let item of arr){
            if (list.includes(item)){
                score++
            }
        }
        if (score == arr.length){
            for (let cor of arr){
                if (typeof player.board.board[cor -1] == "object"){
                    return false
                }
            }
            // if (typeof player.board.board[arr[0]-1])
            return true
        }
    }
    return false
}
let data = 1
firstShip()
function firstShip(){
    data = 1;
    while (playerBoard.firstChild){
        playerBoard.removeChild(playerBoard.firstChild)
    }
    for (let item of player.board.board){

        let square = document.createElement("div");
        square.setAttribute("data", data)
        square.style.cursor = "pointer"
        square.classList.add("firstselected")
        
        if (item ==  "missed"){
            square.style.backgroundColor = "red"
        }else if (item == "destroyed"){
            square.style.backgroundColor = "black"
        }
        square.addEventListener("click", (e)=>{
            const cor = e.target.getAttribute("data")
            

            // console.log(cor)
            let arr = [Number(cor), Number(cor)+1, Number(cor)+2, Number(cor)+3];
            // console.log(arr)
            if (isPlacementValid(arr)){
                let ship = new Ship(4);
                player.board.placeShip(arr, ship);
                // e.target.classList.add("selected")
                secondShip();
            }
            // console.log(isPlacementValid(arr))
        })
        playerBoard.appendChild(square)
        data++
    }
}

function secondShip(){
    data = 1
    while (playerBoard.firstChild){
        playerBoard.removeChild(playerBoard.firstChild)
    }
    for (let item of player.board.board){

        let square = document.createElement("div");
        square.setAttribute("data", data)
        square.style.cursor = "pointer"
        square.classList.add("secondselected")

        if (item ==  "missed"){
            square.style.backgroundColor = "red"
        }else if (typeof item == "object"){
            square.style.backgroundColor = "black"
        }
        square.addEventListener("click", (e)=>{
            const cor = e.target.getAttribute("data")
            let arr = [Number(cor), Number(cor)+1, Number(cor)+2];
            if (isPlacementValid(arr)){
                let ship = new Ship(3);
                player.board.placeShip(arr, ship);
                thirdShip();
            }
        })
        playerBoard.appendChild(square)
        data++
    }
}
function thirdShip(){
    console.log("im in third")
    data = 1
    while (playerBoard.firstChild){
        playerBoard.removeChild(playerBoard.firstChild)
    }
    for (let item of player.board.board){

        let square = document.createElement("div");
        square.setAttribute("data", data)
        square.style.cursor = "pointer"
        square.classList.add("thirdselected")

        if (item ==  "missed"){
            square.style.backgroundColor = "red"
        }else if (typeof item == "object"){
            square.style.backgroundColor = "black"
        }
        square.addEventListener("click", (e)=>{
            const cor = e.target.getAttribute("data")
            let arr = [Number(cor), Number(cor)+1];
            if (isPlacementValid(arr)){
                let ship = new Ship(2);
                player.board.placeShip(arr, ship);
                // setTimeout(gameStart, 1000)
                gameStart();
            }
        })
        playerBoard.appendChild(square)
        data++
    }
}
// make computer board
for (let item of computer.board.board){
    let square = document.createElement("div");

    if (item ==  "missed"){
        square.style.backgroundColor = "red"
    }else if (item == "destroyed"){
        square.style.backgroundColor = "black"
    }

    computerBoard.appendChild(square)
}
// make player board
// for (let item of player.board.board){

//     let square = document.createElement("div");
//     if (item ==  "missed"){
//         square.style.backgroundColor = "red"
//     }else if (item == "destroyed"){
//         square.style.backgroundColor = "black"
//     }
    
//     playerBoard.appendChild(square)
// }

function gameStart(){
    makeComputerBoard();
    makePlayerBoard();
}
function makePlayerBoard(){
    while (playerBoard.firstChild){
        playerBoard.removeChild(playerBoard.firstChild)
    }
for (let item of player.board.board){

    let square = document.createElement("div");
    if (item ==  "missed"){
        square.style.backgroundColor = "red"
    }else if (item == "destroyed"){
        square.style.backgroundColor = "green"
    }else if (typeof item == "object"){
        square.style.backgroundColor = "black"
    }
    
    playerBoard.appendChild(square)
}
}

function makeComputerBoard(){
    while (computerBoard.firstChild){
        computerBoard.removeChild(computerBoard.firstChild)
    }
    let data = 1;

    for (let item of computer.board.board){
        let square = document.createElement("div");
        square.setAttribute("data", data)

        if (item ==  "missed"){
            square.style.backgroundColor = "red"
        }else if (item == "destroyed"){
            square.style.backgroundColor = "green"
        }
        square.addEventListener("click", (e)=>{
            if (player.board.allShipsSunk != true && computer.board.allShipsSunk != true && player.board.firedShots.includes(e.target.getAttribute("data")) == false){
                const cor = e.target.getAttribute("data")
                player.attack(computer, cor)
                makeComputerBoard();
                if (computer.board.allShipsSunk != true){
                    computer.attack(player);
                    makePlayerBoard();
                    if (player.board.allShipsSunk == true){
                        console.log("computer won")
                    }
                }else{
                    console.log("player won")
                }
                
            }
            
            // if (computer.board.allShipsSunk == true){
            //     return "gameover";
            // }
            // computer.attack(player)
            // makePlayerBoard();
            // console.log("tetetetetetet")
        })
        computerBoard.appendChild(square)
        data++
    }
    }
console.log("congrats ")
// import { anotherOne } from "./test.js";
// anotherOne()
