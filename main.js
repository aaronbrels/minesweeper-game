document.addEventListener("DOMContentLoaded", () =>{
let grid = document.querySelector(".grid")
let width = 10 // let javascript know that are grid is 10 squares width
let squares = []
let amountOfBombs = 20 


// create the board
function createBoard() {
// get shuffled game array with random bombs
let bombArray = Array(amountOfBombs).fill("bomb") // "Array" is an array constructor
let emptyArray = Array(width*width - amountOfBombs).fill("valid")
let gamesArray = emptyArray.concat(bombArray)
let shuffledArray = gamesArray.sort(function(){
    return Math.random() -0.5
})


for (let i = 0; i < width*width; i++) {  // create a 100 squares
       let square = document.createElement("div") // create 100 elements for those 100 squares
       square.setAttribute("id", i) // grab the square just created and give a unique id # when it loops through
       square.classList.add(shuffledArray[i])
       grid.appendChild(square)
       squares.push(square)
    }
}
createBoard()


})