function greatestCommonDivisor(firstNum, secondNum) {

    let higherNum = Math.max(firstNum, secondNum);
    let lowerNum = Math.min(firstNum, secondNum);
    let GCD = 0;

    let devisor = Math.floor(higherNum / lowerNum);
    let residue = higherNum % lowerNum;

    if (residue === 0) {

        console.log(lowerNum);
        
    } else {

        while (residue !== 0) {

            GCD = residue;

            devisor = Math.floor(lowerNum / residue);
            residue = lowerNum % residue;
        };

        console.log(GCD);
    }
}

greatestCommonDivisor(15, 5);