const sketchArea = document.querySelector("#grid-area");

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
createGrid(25);