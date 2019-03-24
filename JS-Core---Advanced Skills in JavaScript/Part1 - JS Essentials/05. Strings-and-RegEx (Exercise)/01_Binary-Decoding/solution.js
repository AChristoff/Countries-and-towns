function solve() {

    let input = document.getElementById('str').value;
    let result = document.getElementById('result');

    let sum = 0;
    let inputArr = [...input];

    inputArr.forEach(x => sum += +x);

    do {
        sum = [...sum.toString()].reduce((a, b) => Number(a) + Number(b))
    } while (sum > 9);


    inputArr.splice(0, sum);
    inputArr.splice(-sum);

    let inputMidArray = [];

    while (inputArr.length > 1) {
        inputMidArray.push((inputArr
            .splice(0, 8))
            .reduce((a, b) => a + b));
    }


    let validator = /[A-Za-z ]+/;
    let resultArr = [];

    for (let row of inputMidArray) {

        let decimalValue = parseInt(row, 2);
        let char = String.fromCharCode(decimalValue);

        if (validator.test(char)) {
            resultArr.push(char)
        }
    }

    result.textContent = resultArr.join('');
}