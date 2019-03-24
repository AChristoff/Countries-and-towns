let robotChef = (function () {

    const elementsStorage = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    };

    const recipes = {
        apple: {carbohydrate: 1, flavour: 2},
        coke: {carbohydrate: 10, flavour: 20},
        burger: {carbohydrate: 5, fat: 7, flavour: 3},
        omelet: {protein: 5, fat: 1, flavour: 1},
        cheverme: {protein: 10, carbohydrate: 10, fat: 10, flavour: 10}
    };

    return function processor(input) {
        input = input.split(' ');
        let command = input[0];

        if (command === 'restock') {

            let currentElement = input[1];
            let quantity = +input[2];

            elementsStorage[currentElement] += quantity;
            return 'Success';

        } else if (command === 'prepare') {

            let currentRecipe = input[1];
            let quantityNeeded = input[2];

            for (let recipe in recipes) {
                if (recipe === currentRecipe) {

                    let neededQuantity = Object.entries(recipes[currentRecipe]);
                    for (let [element, quantityByRecipe] of neededQuantity) {

                        if (recipes[currentRecipe][element] * quantityNeeded > elementsStorage[element]) {
                            return `Error: not enough ${element} in stock`;
                        }
                    }
                }
            }

            let neededQuantity = Object.entries(recipes[currentRecipe]);
            for (let [element, quantityByRecipe] of neededQuantity) {
                elementsStorage[element] -= recipes[currentRecipe][element] * quantityNeeded;

            }
            return 'Success';

        } else if (command === 'report') {

            return Object.entries(elementsStorage).map((kvp) => `${kvp[0]}=${kvp[1]}`).join(' ');
        }
    }

})();

console.log(robotChef('restock carbohydrate 10'));
console.log(robotChef('restock flavour 10'));
console.log(robotChef('prepare apple 1'));
console.log(robotChef('restock fat 10'));
console.log(robotChef('prepare burger 1'));
console.log(robotChef('report'));