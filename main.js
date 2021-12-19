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
    

    // normal click
    square.addEventListener("click", function(){  // on click i'm invoking the function click and into that click function i'm passing into it square
        click(square) 

    })
}

    // add numbers
    for (let i = 0; i < squares.length; i++) {  // loop over the squares array
        let total = 0
        let isLeftEdge = (i % width === 0)  // (if i or the number from 0 to 99), if for example 10 is divisible by the width which is 10 and leaves a remainder of zero this means that 10 is at the left edge
        let isRightEdge = (i === width -1) // 


        if (squares[i].classList.contains("valid")) { // If the square we are looping over contains the class of valid do the following
            if (i > 0 && !isLeftEdge && squares[i -1].classList.contains("bomb")) total ++  // if i is bigger than 0 and is not on the left edge and the squares to the left of it contain a bomb add 1 to the total | only works if all 3 parts are true
            if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains("bomb")) total++  // if i is larger than 9 we want to check the square that is southwest to the one we are in currently, and is not at the right hand edge, and if the square and the index +1 -the whole width contains a bomb, add one to the total 
            if (i > 10 && squares[i - width].classList.contains("bomb")) total++ // if i is bigger than 10 and the square directly above it contains a bomb add one | don't need to check for right or left edge
            if (i > 11 && !isLeftEdge && squares[i-1].classList.contains("bomb")) total++ // if i is bigger than 11 and is not at the left edge and the square directly to the left of it and one row up contains a bomb add one to total
            if (i < 98 && !isRightEdge && squares[i +1].classList.contains("bomb")) total++ // if i is smaller than 98, and is not at the right edge, and the square directly to the right of it contains a bomb, add one 
            if (i < 90 && isLeftEdge && squares[i -1 +width].classList.contains("bomb")) total ++ // if i is smaller than 90, and not at the left edge, and the square directly to the left and one whole width below add one to the total
            if (i < 88 && !isRightEdge && squares[i + 1 +width].classList.contains("bomb")) total ++ // if i is smaller than 88, and is not at the right edge, and if the square to the right of it and one row down contains a bomb add 1
            if (i < 89 && squares[i +width].classList.contains("bomb")) total++ // if i is smaller than 89, and the square directly below it contains a bomb add 1 to total

            squares[i].setAttribute("data", total) // give each square a data attribute | this total indicates if any given square has a bomb in the square to the left of it or to the southwest of it if both has total of two | "data" is just a random name given
            
        
        }
    }
}
createBoard()

})

// click on square actions 
function click (square) {
    if (square.classList.contains("bomb")) {
        console.log("Game Over") // can change this
    } else {
        let total = square.getAttribute("data") // getAttribute will get the number associated with the square
        if(total != 0) {
            square.classList.add("checked") // if the square is 0 add the class of checked to it
        }
    }
}
