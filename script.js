let sketchArea = document.querySelector("#grid-area");
let rainbowColorIndex = 0;
const paintColorPickerContainer = document.querySelector(".paint-color-picker-container");
const clearBtn = document.querySelector("#clear-btn");
const gridCountSlider = document.querySelector("#grid-size-slider");
let showGridSize = document.querySelector(".slider-value");
const resizeBtn = document.querySelector("#resize-btn");

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

clearBtn.addEventListener("click", () => {
    cells.forEach(cell => cell.style.backgroundColor = "#D4D4D4");
})

// creates a slider for adjusting grid size and shows it's value
showGridSize.innerHTML = gridCountSlider.value;

gridCountSlider.addEventListener("input", () => {
    showGridSize.innerHTML = gridCountSlider.value;
})

// make the grid resize to the slider's value when a resize button is clicked

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
const drawingModeContainer = document.querySelector(".show-drawing-mode-state")
// add listiner to clicking anywhere on the grid area
// assign to the listener a function that will change the drawing from false to true and vice versa
sketchArea.addEventListener("click", () => {
    if (drawingMode === true) {
        drawingMode = false;
        rainbowColorIndex = 0;
        drawingModeContainer.classList.remove("button-on");

    } else {
        drawingMode = true;
        drawingModeContainer.classList.add("button-on");
        if (rainbowMode === false) {
            paintColorPickerContainer.classList.add("button-on");
        }

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

rainbowModeBtn.addEventListener("click", () => {
    if (rainbowMode === false) {
        rainbowModeBtn.classList.remove("button-on");
        paintColorPickerContainer.classList.add("button-on");
    } else {
        rainbowModeBtn.classList.add("button-on");
        paintColorPickerContainer.classList.remove("button-on");
    }

})

// style everything nicely with css so it has an etch a sketch toy look
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
        button.classList.add("button-hovered");
    })
})

buttons.forEach((button) => {
    button.addEventListener("mouseleave", () => {
        button.classList.remove("button-hovered");
    })
})

/* Make it so clicking color button would activate the color mode and desactivate rainbow mode */
drawingModeContainer.addEventListener("click", () => {
    if (drawingMode === true) {
        drawingMode = false;
        rainbowColorIndex = 0;
        drawingModeContainer.classList.remove("button-on");

    } else {
        drawingMode = true;
        drawingModeContainer.classList.add("button-on");
        if (rainbowMode === false) {
            paintColorPickerContainer.classList.add("button-on");
        }

    }
})

paintColorPickerContainer.addEventListener("click", () => {
    rainbowMode = false;
    rainbowModeBtn.classList.remove("button-on");
    paintColorPickerContainer.classList.add("button-on");
})


/*
TODO:
-clean up the code
-add an erase button
-drawing button should display Drawing On / Drawing Off instead of Drawing mode
-color picker and rainbow mode should be next to each other
- make the resize container layout nice
- make the slider show 64 when the page reloads
*/

