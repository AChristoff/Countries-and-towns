function sameNumbers(inputNum) {

    let inputString = inputNum.toString().split('');
    
    let previousNum = +inputString[0];
    let sum = 0;
    let flag = true;

    for (const currentNum of inputString) {

        sum += +currentNum;

        if (+currentNum !== previousNum) {
            flag = 'false';
        }

        previousNum = +currentNum;
    }

    console.log(flag);
    console.log(sum);

}

sameNumbers(2222);
