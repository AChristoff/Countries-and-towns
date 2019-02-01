function solve(input) {

    let matrix = [];

    for (const string of input) {

        let newRow = string.split(' ').map((x) => +x);
        matrix.push(newRow);
    }

    let firstDiagSum = 0;
    let secondDiagSum = 0;

    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[r].length; c++) {
            if (r === c) {
                firstDiagSum += matrix[r][c];
            }

            if (r + c === matrix[r].length - 1) {
                secondDiagSum += matrix[r][c];
            }
        }
    }

    if (firstDiagSum === secondDiagSum) {

        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {

                if (r === c) {
                    continue;
                }
                if (r + c === matrix[r].length - 1) {
                    continue;
                }

                matrix[r][c] = secondDiagSum;
            }
        }
    }

    for (const row of matrix) {
        console.log(row.join(' '));
    }
}