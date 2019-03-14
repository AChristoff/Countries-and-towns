function solve([rows, cols, starR, starC]) {

    let matrix = [];
    for (let row = 0; row < rows; row++) {
        matrix[row] = [];
        for (let col = 0; col < cols; col++) {
            matrix[row][col] = Math.max(Math.abs(row - starR), Math.abs(col - starC)) + 1;
        }
    }

    for (let row of matrix) {
        console.log(row.join(' '));
    }
}