function firstSolve(inputArr) {

    let step = inputArr.pop();
    let resultArr = inputArr.reduce((acc, el, idx) => {
        if (idx % step === 0) {
            acc.push(el);
        }
        return acc;
    }, []);

    console.log(resultArr.join('\n'));
}



function secondSolve(input) {

    input.map((x) => +x);

    let lastElement = input[input.length-1];

    for (let i = 0; i < input.length-1; i++) {

        if (i % lastElement === 0) {
            console.log(input[i]);
        }
    }
}