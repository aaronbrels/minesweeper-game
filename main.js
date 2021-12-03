document.addEventListener("DOMContentLoaded", () =>{
let grid = document.querySelector(".grid")
let width = 10 // let javascript know that are grid is 10 squares width
let squares = []


// create the board
function createBoard() {
    for (let i = 0; i < width*width; i++) {
       let square = document.createElement("div")
       square.setAttribute("id", i)
       grid.appendChild(square)
       squares.push(square)
    }
}
createBoard()


})