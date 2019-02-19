// Revealing Module Pattern

let vectorCalculator = (function () {

    const add = ([xA, yA], [xB, yB]) => [xA + xB, yA + yB];
    const multiply = ([xA, yA], scalar) => [xA * scalar, yA * scalar];
    const length = ([xA, yA]) => Math.sqrt(xA ** 2 + yA ** 2);
    const dot = ([xA, yA], [xB, yB]) =>xA * xB + yA * yB;
    const cross = ([xA, yA], [xB, yB]) => xA * yB - yA * xB;

    return {
        add,
        multiply,
        length,
        dot,
        cross
    }

})();
console.log(vectorCalculator.cross([3, 7], [1, 0]));

