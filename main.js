document.addEventListener("DOMContentLoaded", () =>{
let grid = document.querySelector(".grid")
let width = 10 // let javascript know that are grid is 10 squares width
let squares = []
let bombAmount = 20 
let flags = 0
let isGameOver = false



// create the board

function createBoard() {
// get shuffled game array with random bombs
let bombArray = Array(bombAmount).fill("bomb") // "Array" is an array constructor
let emptyArray = Array(width*width - bombAmount).fill("valid")
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

    //control and left click
    square.oncontextmenu = function(e) { // pass through e for event in the function
        e.preventDefault()
        addFlag(square)
    }
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

// add Flag with right click
function addFlag(square) {
    if (isGameOver) return
    if (squares.classList.contains("checked") && (flags < bombAmount)){ // if the squares are not already checked i.e. does not contain the class of checked, and the flags that are placed are less than the bomb amount
        if(!square.classList.contains("flag")) { // if a square does not contain a flag already add a class of flag to it (this line and the next is what this note is for)
            square.classList.add("flag")
            square.innerHTML = " ????"
            flags ++ // add 1 to flags variable
            checkForWin()
        } else {
            square.classList.remove("flag")
            square.innerHTML = ""
            flags --
        }
    }
}


// click on square actions 
function click (square) {
    let currentId = square.id
    if(isGameOver) return // if game is over we return out of the function
    if(square.classList.contains("checked") || square.classList.contains("flag")) return 
    if (square.classList.contains("bomb")) {
         gameOver(square)
    } else {
        let total = square.getAttribute("data") // getAttribute will get the number associated with the square
        if(total != 0) {
            square.classList.add("checked") // if the square is 0 add the class of checked to it
            square.innerHTML = total // once square has been checked we want to display the total and the square at the same time
            return 
        }
        checkSquare(square, currentId) // function that passes through the square you just clicked, and passes through the square's id
    }
    square.classList.add("checked") // if the square doesn't fall into the two categories above
}

// check neighboring squares once square is clicked
function checkSquare(square, currentId) {
    let isLeftEdge = (currentId % width === 0) // 
    let isRightEdge = (currentId % width === width -1)
    
    setTimeout(() => {
        if (currentId > 0 && isLeftEdge){
            let newId = squares[parseInt(currentId) -1].id // get id of the square that is directly to the left of the currentId
            let newSquare = document.getElementById(newId) //
            click(newSquare) // pass back throuch the click function to be checked again
        } 
        if (currentId > 9 && !isRightEdge) {
            let newId = squares[parseInt(currentId) +1 -width].id // get the id of the square directly to the right of the currentId
            let newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId > 10) {
            let newId = squares[parseInt(currentId -width)].id // get the id of the square directly above the currentId
            let newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId > 11 && !isLeftEdge) {
            let newId = squares[parseInt(currentId) -1 -width].id // get the id of the square directly the 1 left of it and 1 row up
            let newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId < 98 && !isRightEdge) {
            let newId = squares[parseInt(currentId) +1 ].id
            let newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId < 90 && !isLeftEdge) {
            let newId = squares[parseInt(currentId) -1 +width ].id
            let newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId < 88 && !isRightEdge) {
            let newId = squares[parseInt(currentId) +1 +width ].id
            let newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 89) {
            let newId = squares[parseInt(currentId) +width ].id
            let newSquare = document.getElementById(newId)
            click(newSquare)
        }
    }, 10 )
}

 //game over
 function gameOver(square) {
    console.log ('BOOM! Game Over!')
    isGameOver = true

    //show ALL the bombs
    squares.forEach(square => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = '????'
        
      }
    })
  }
            
    //Check for win
    function checkForWin() {
       let matches = 0 

        for(let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains("flag") && squares[i].classList.contains("bomb")) {
              matches ++  
            }
            if (matches === bombAmount) {
                console.log("YOU WIN")
                isGameOver = true
            }
        }
    }
    
    

            
 })