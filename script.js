
// takes gridCount (int) - number of rows and pixels in each row
// creates grid inside of the container
const createGrid = (gridCount) => {
    const sketchArea = document.querySelector("#grid-area");
    // create a number of rows (specified by gridCount) in the grid
    for (let i = 1; i <= gridCount; i++) {
        let row = document.createElement('div');
        row.classList.add("grid-row");
        sketchArea.appendChild(row);
        // for each row append the same number of cells as the number of rows
        for (let rowNum = 1; rowNum <= gridCount; rowNum++) {
            let cell = document.createElement("div");
            cell.classList.add("grid-cell");
            row.appendChild(cell);
        }
    }
}

createGrid(12);

// write a function that listens for hovering and changes the cell color for black
const cells = document.querySelectorAll('.grid-cell');
cells.forEach((cell) => cell.addEventListener("mouseenter", function (event) {
    event.target.classList.add('colored');
}))

// TODO:
// create a clear button which makes all the cells white again
// create a slider https://www.w3schools.com/howto/howto_js_rangeslider.asp for adjusting the size of the grid
// create a color picker so the user can paint in different colors
// make the divs chenge collor only when the mouse button is pressed (if it's not pressed just make another background color just on hover - as a coursor)
// make the mouse dissappera inside the grid area as we no longer need it
// style everything nicely with css so it has an etch a sketch toy look















