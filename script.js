// CREATE GRID FUNCTIONALITY
// takes gridCount (int) - number of rows and pixels in each row
// creates grid inside of the grid area container
const sketchArea = document.querySelector("#grid-area");
const createGrid = (gridCount) => {
    // create a number of rows (specified by gridCount) in the grid
    for (let i = 1; i <= gridCount; i++) {
        let row = document.createElement('div');
        row.classList.add("grid-row");
        sketchArea.appendChild(row);
        // for each row append the same number of cells as is the number of rows
        for (let rowNum = 1; rowNum <= gridCount; rowNum++) {
            let cell = document.createElement("div");
            cell.classList.add("grid-cell");
            row.appendChild(cell);
        }
    }
}

// initialize a default grid of 64 x 64 when the page loads
createGrid(64);


// CHANGE GRID SIZE FUNCTIONALITY
// create a slider for adjusting grid size and shows it's value
const gridCountSlider = document.querySelector("#grid-size-slider");
const resizeBtn = document.querySelector("#resize-btn");
let showGridSize = document.querySelector(".slider-value");
showGridSize.innerHTML = gridCountSlider.value;

gridCountSlider.addEventListener("input", () => {
    showGridSize.innerHTML = gridCountSlider.value;
})

// make the grid resize to the slider's value when a resize button is clicked
resizeBtn.addEventListener("click", () => {
    // whole grid area is first cleared
    sketchArea.innerHTML = "";
    createGrid(gridCountSlider.value);
    // PROBLEM below functionalities does not work once the grid is resized if they are not written here
    // BEGGINING OF THE REPEATED CODE
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
    // END OF REPEATED CODE
})


// PICKING COLOR FUNCTIONALITY
// create a color picker so the user can paint in different colors
const paintColorPicker = document.querySelector("#paint-color-picker");
let paintColorPickerValue = document.querySelector("#paint-color-picker").value;

// make the color picker change the drawing color
// when the user chooses a new color, rainbow mode is switched off
paintColorPicker.addEventListener("input", () => {
    paintColorPickerValue = document.querySelector("#paint-color-picker").value;
    rainbowMode = false;
})


// DRAWING FUNCTIONALITY
// for each grid cell adds a listener to change the color on mouse enter event if the drawing mode is on
// if the rainbow mode is also on, it picks the color from the colors list and increments the index
// using incrementColorIndex function
let drawingMode = false;
let rainbowMode = false;
let rainbowColorIndex = 0;
const cells = document.querySelectorAll('.grid-cell');
cells.forEach((cell) => cell.addEventListener("mouseenter", (event) => {
    if (drawingMode === true && rainbowMode === false && eraseMode === false) {
        event.target.style.backgroundColor = paintColorPickerValue;
    }
    else if (drawingMode === true && rainbowMode === true) {
        // red, orange, yellow, green, blue, purple
        const colors = ["#FF0000", "#ffa500", "#ffff00", "#00ff00", "#0000ff", "#800080"];
        event.target.style.backgroundColor = colors[rainbowColorIndex];
        rainbowColorIndex = incrementColorIndex(rainbowColorIndex);
    }
    else if (drawingMode === true && rainbowMode === false && eraseMode === true) {
        event.target.style.backgroundColor = "#D4D4D4";
    }
}))

// takes the color index (int) and returns it incremented by 1
// if the index === 5 it switches it back to 0 (there are only 6 colors in rainbow mode)
const incrementColorIndex = (colorIndex) => {
    if (colorIndex >= 5) {
        colorIndex = 0;
    } else {
        colorIndex += 1;
    }
    return colorIndex;
}


// TOGGLE DRAWING MODE FUNCTIONALITY
// add listener to clicking anywhere on the grid area
// assign to the listener a function that will change the drawing mode from false to true and vice versa
// function also resets the color index: each time the user activates the drawing mode, rainbow colors start
// from the beggining
sketchArea.addEventListener("click", () => {
    if (drawingMode === true) {
        drawingMode = false;
        rainbowColorIndex = 0;
        drawingModeBtnState(drawingMode);
    } else {
        drawingMode = true;
        drawingModeBtnState(drawingMode);
        if (rainbowMode === false) {
            colorPickerBtnState(rainbowMode);
            rainbowModeBtnState(rainbowMode);
        }
    }
})


// MENU BUTTONS FUNCTIONALITY
// initialize the drawing mode button and color picker button respectively
const drawingModeContainer = document.querySelector(".show-drawing-mode-state");
const paintColorPickerContainer = document.querySelector(".paint-color-picker-container");

// function for changing drawing mode button state
// takes drawing mode (bool) and adds the class button-on if it's true
// if it's false it removes the button-on class and the button is off
const drawingModeBtnState = (drawingMode) => {
    if (drawingMode === true) {
        drawingModeContainer.classList.add("button-on");
    } else {
        drawingModeContainer.classList.remove("button-on");
    }
}

// function for changing rainbow mode button state
// takes rainbow mode (bool) and adds the class button-on if it's true
// if it's false it removes the button-on class and the button is off
const rainbowModeBtnState = (rainbowMode) => {
    if (rainbowMode === true) {
        rainbowModeBtn.classList.add("button-on");
    } else {
        rainbowModeBtn.classList.remove("button-on");
    }
}

// function for changing rainbow mode button state
// takes rainbow mode (bool) and adds the class button-on if it's false
// if the rainbow mode is true, it removes the button-on class from the color picker button
// indicating that the user now paints in rainbow mode, not in color mode
const colorPickerBtnState = (rainbowMode) => {
    if (rainbowMode === false) {
        paintColorPickerContainer.classList.add("button-on");
    }
    else {
        paintColorPickerContainer.classList.remove("button-on");
    }
}

const eraseModeBtnState = (eraseMode) => {
    if (eraseMode === false) {
        eraseBtn.classList.remove("button-on");
    }
    else {
        eraseBtn.classList.add("button-on");
    }
}

// activate and deactivate the rainbow mode when the rainbow mode button is clicked
const rainbowModeBtn = document.querySelector("#rainbowmode-btn");
rainbowModeBtn.addEventListener("click", () => {
    if (rainbowMode === false) {
        rainbowMode = true;
        eraseMode = false;
        eraseModeBtnState(eraseMode)
        rainbowModeBtnState(rainbowMode);
        colorPickerBtnState(rainbowMode);
    } else {
        rainbowMode = false;
        rainbowModeBtnState(rainbowMode);
        colorPickerBtnState(rainbowMode);
    }
})

// activate color mode when the color picker button is clicked
paintColorPickerContainer.addEventListener("click", () => {
    rainbowMode = false;
    rainbowModeBtnState(rainbowMode);
    colorPickerBtnState(rainbowMode);
})

// adds button-hovered class which highlights the button when mouse enters it
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
        button.classList.add("button-hovered");
    })
})

// removes button-hovered class which highlights the button when mouse leaves it
buttons.forEach((button) => {
    button.addEventListener("mouseleave", () => {
        button.classList.remove("button-hovered");
    })
})

// add listener to clicking on the drawing mode button
// assign to the listener a function that will change the drawing mode from false to true and vice versa
// function also resets the color index: each time the user activates the drawing mode, rainbow colors start
// from the beggining
drawingModeContainer.addEventListener("click", () => {
    if (drawingMode === true) {
        drawingMode = false;
        rainbowColorIndex = 0;
        drawingModeBtnState(drawingMode);

    }
    else {
        drawingMode = true;
        drawingModeBtnState(drawingMode);
        if (rainbowMode === false) {
            colorPickerBtnState(rainbowMode);
        }

    }
})

// CLEAR CANVAS FUNCTIONALITY
// makes all the cells grey again when the clear button is pushed 
// (grey is the initial color of the drawing canvas)
const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", () => {
    cells.forEach(cell => cell.style.backgroundColor = "#D4D4D4");
})


/*
TODO:
-add an erase button
-drawing button should display Drawing On / Drawing Off instead of Drawing mode
-color picker and rainbow mode should be next to each other
-make the resize container layout nice
-make the slider show 64 when the page reloads
*/

// ERASE MODE FUNCTIONALITY
const eraseBtn = document.querySelector("#eraser-btn");
let eraseMode = false;
// clicking the button needs to switch drawing color to the color of the canvas
eraseBtn.addEventListener("click", () => {
    if (eraseMode === false) {
        eraseMode = true;
        rainbowMode = false;
        rainbowModeBtnState(rainbowMode);
        colorPickerBtnState(rainbowMode);
        eraseModeBtnState(eraseMode);
    }
    else {
        eraseMode = false;
        eraseModeBtnState(eraseMode);
    }
})

// enabling erase mode should disable color picking mode