let sketchArea = document.querySelector("#grid-area");

// takes gridCount (int) - number of rows and pixels in each row
// creates grid inside of the container
const createGrid = (gridCount) => {
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

// initialize a default grid of 64x64 when the page loads
createGrid(64);

let rainbowColorIndex = 0;

const incrementColorIndex = (colorIndex) => {
    if (colorIndex >= 5) {
        colorIndex = 0;
    } else {
        colorIndex += 1;
    }
    return colorIndex;
}

// changes the cell color to drawingColorPickerValue when the cell is hovered
const cells = document.querySelectorAll('.grid-cell');
cells.forEach((cell) => cell.addEventListener("mouseenter", (event) => {
    if (drawingMode === true && rainbowMode === false) {
        event.target.style.backgroundColor = paintColorPickerValue;
    } else if (drawingMode === true && rainbowMode === true) {
        // red, orange, yellow, green, blue, purple
        const colors = ["#FF0000", "#ffa500", "#ffff00", "#00ff00", "#0000ff", "#800080"];
        event.target.style.backgroundColor = colors[rainbowColorIndex];
        rainbowColorIndex = incrementColorIndex(rainbowColorIndex);
    }
}))

// makes all the cells white again
const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", () => {
    cells.forEach(cell => cell.style.backgroundColor = "#D4D4D4");
})

// creates a slider for adjusting grid size and shows it's value
const gridCountSlider = document.querySelector("#grid-size-slider");
let showGridSize = document.querySelector(".slider-value");
showGridSize.innerHTML = gridCountSlider.value;

gridCountSlider.addEventListener("input", () => {
    showGridSize.innerHTML = gridCountSlider.value;
})

// make the grid resize to the slider's value when a resize button is clicked
const resizeBtn = document.querySelector("#resize-btn");
resizeBtn.addEventListener("click", () => {
    const sketchArea = document.querySelector("#grid-area");
    sketchArea.innerHTML = "";
    createGrid(gridCountSlider.value);
    // PROBLEM below functionalities does not work once the grid is resized if they are not written here
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell) => cell.addEventListener("mouseenter", (event) => {
        if (drawingMode === true && rainbowMode === false) {
            event.target.style.backgroundColor = paintColorPickerValue;
        } else if (drawingMode === true && rainbowMode === true) {
            // red, orange, yellow, green, blue, purple
            const colors = ["#FF0000", "#ffa500", "#ffff00", "#00ff00", "#0000ff", "#800080"];
            event.target.style.backgroundColor = colors[rainbowColorIndex];
            rainbowColorIndex = incrementColorIndex(rainbowColorIndex);
        }
    }))

    const clearBtn = document.querySelector("#clear-btn");
    clearBtn.addEventListener("click", () => {
        cells.forEach(cell => cell.style.backgroundColor = "#D4D4D4");
    })
})

// create a color picker so the user can paint in different colors
let paintColorPicker = document.querySelector("#paint-color-picker");
let paintColorPickerValue = document.querySelector("#paint-color-picker").value;

// make the color picker change the drawing color
paintColorPicker.addEventListener("input", () => {
    paintColorPickerValue = document.querySelector("#paint-color-picker").value;
    rainbowMode = false;
})


// TODO
// ---make the divs change color only when the draving is activated (by clicking a mouse)
// create a boolean called drawing
let drawingMode = false;
let showDrawingMode = document.querySelector(".drawing-mode-state");
showDrawingMode.innerHTML = "Off";
// add listiner to clicking anywhere on the grid area
// assign to the listener a function that will change the drawing from false to true and vice versa
sketchArea.addEventListener("click", () => {
    if (drawingMode === true) {
        drawingMode = false;
        showDrawingMode.innerHTML = "Off";
        rainbowColorIndex = 0;
    } else {
        drawingMode = true;
        showDrawingMode.innerHTML = "On";
    }
})

// add listener to clicking the button that changes the state of the rainbowMode
let rainbowMode = false;
const rainbowModeBtn = document.querySelector("#rainbowmode-btn");
rainbowModeBtn.addEventListener("click", () => {
    if (rainbowMode === false) {
        rainbowMode = true;
    } else {
        rainbowMode = false;
    }
})

// style everything nicely with css so it has an etch a sketch toy look













