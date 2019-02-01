function firstSolve(inputArr) {

    let resultArr = inputArr.reduce((acc, el, idx) => {
        if (el === 'add') {
            acc.push(idx + 1);
        } else {
            acc.pop();
        }
        return acc;
    }, []);

    if (resultArr.length <= 0) {
        console.log('Empty');
    } else {
        console.log(resultArr.join('\n'));
    }
}



function secondSolve(input) {

    let counter = 0;
    let resultArr = [];

    for (let command of input) {
        counter++;

        (command === 'add') ? resultArr.push(counter) : resultArr.pop();
    }

    (resultArr.length === 0) ? console.log('Empty') : resultArr.map((x) => console.log(x));
}