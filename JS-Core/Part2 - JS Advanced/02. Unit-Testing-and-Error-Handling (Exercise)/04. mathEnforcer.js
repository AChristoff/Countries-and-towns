let mathEnforcer = {

    addFive: (num) => {
        return typeof(num) !== 'number' ? undefined : num + 5
    },
    subtractTen: (num) => {
        return typeof(num) !== 'number' ? undefined : num - 10
    },
    sumNumbers: (firstNum, secondNum) => {
        return typeof(firstNum) !== 'number' || typeof(secondNum) !== 'number'
            ? undefined
            : firstNum + secondNum
    }
};

module.exports = mathEnforcer;