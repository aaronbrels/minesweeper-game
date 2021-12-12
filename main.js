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
       square.classList.add(shuffledArray[i]) // Adding class names to the squares with bombs in them ?????
       grid.appendChild(square)
       squares.push(square)
    }

    // add numbers
    for (let i = 0; i < squares.length; i++) {  // loop over the squares array
        let total = 0
        let isLeftEdge = (i % width === 0)  // (if i or the number from 0 to 99), if for example 10 is divisible by the width which is 10 and leaves a remainder of zero this means that 10 is at the left edge
        let isRightEdge = (i === width -1) // 


        if (squares[i].classList.contains("valid")) { // If the square we are looping over contains the class of valid do the following
            if (i > 0 && !isLeftEdge && squares[i -1].classList.contains("bomb")) total ++  // if i is bigger than 0 and is not on the left edge and the squares to the left of it contain a bomb add 1 to the total | only works if all 3 parts are true
        }
    }






}
createBoard()



})