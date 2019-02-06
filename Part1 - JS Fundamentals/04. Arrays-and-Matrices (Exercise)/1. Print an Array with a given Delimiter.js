function firstSolve(input) {

    let lastElement = input.pop();
    console.log(input.join(lastElement))

}



function secondSolve(inputArr) {

    let delimiter = inputArr.pop();

    let result = inputArr.reduce((acc, el, idx) => {
        if (idx === 0) {
            acc += el;
        } else {
            acc += delimiter + el;
        }
        return acc;
    }, '');

    console.log(result);
}

