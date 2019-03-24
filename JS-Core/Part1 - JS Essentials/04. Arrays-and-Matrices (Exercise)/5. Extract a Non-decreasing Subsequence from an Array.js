function solve(input) {

    let biggestNum = input[0];
    let resultArr = [];

    for (let num of input) {

        if (num >= biggestNum) {
            resultArr.push(num);
            biggestNum = num;
        }
    }

    console.log(resultArr.join('\n'));
}