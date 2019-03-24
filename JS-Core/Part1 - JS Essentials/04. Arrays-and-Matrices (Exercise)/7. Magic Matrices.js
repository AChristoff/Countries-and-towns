function solve(matrix) {

    let rowSum = 0;

    for (let row = 0; row < matrix.length; row++) {
        let currentSum = 0;
        for (let col = 0; col < matrix[row].length; col++) {
            currentSum += matrix[row][col];
        }

        if (row === 0) {
            rowSum = currentSum;
        } else if (rowSum !== currentSum) {
            return console.log(false);
        }
    }


    for (let col = 0; col < matrix[0].length; col++) {
        let colsSum = 0;
        for (let row = 0; row < matrix.length; row++) {
            colsSum += matrix[col][row];
        }

        if (colsSum !== rowSum) {
            return console.log(false);
        }
    }

    console.log(true);
}


solve([[1, 2, 0],
    [0, 0],
    [0, 1, 0]]);