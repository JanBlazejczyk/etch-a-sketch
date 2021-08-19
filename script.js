
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

createGrid(64);

// write a function that listens for hovering and changes the cell color for black
const cells = document.querySelectorAll('.grid-cell');
cells.forEach((cell) => cell.addEventListener("mouseenter", function (event) {
    event.target.classList.add('colored');
}))

// create a clear button which makes all the cells white again
const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", function () {
    cells.forEach(cell => cell.classList.remove('colored'));
})

// TODO:
// create a slider https://www.w3schools.com/howto/howto_js_rangeslider.asp for adjusting the size of the grid
const gridCountSlider = document.querySelector("#grid-size-slider");
console.log(gridCountSlider.value);
let showGridSize = document.querySelector(".slider-value");
showGridSize.innerHTML = gridCountSlider.value;

gridCountSlider.oninput = function () {
    showGridSize.innerHTML = this.value;
}

// make the grid reize to the slider's value when a resize button is clicked
const resizeBtn = document.querySelector("#resize-btn");
resizeBtn.addEventListener("click", function () {
    const sketchArea = document.querySelector("#grid-area");
    sketchArea.innerHTML = "";
    createGrid(gridCountSlider.value);
    // below functionalities does not work once the grid is resized
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell) => cell.addEventListener("mouseenter", function (event) {
        event.target.classList.add('colored');
    }))
    const clearBtn = document.querySelector("#clear-btn");
    clearBtn.addEventListener("click", function () {
        cells.forEach(cell => cell.classList.remove('colored'));
    })
})

// create a color picker so the user can paint in different colors
// create another color picker for te background color change
// make the divs change color only when the draving is activated (by clicking a mouse)
// make the mouse dissapper inside the grid area as we no longer need it
// style everything nicely with css so it has an etch a sketch toy look













