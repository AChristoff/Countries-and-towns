function fruit(fruitName, grams, price) {

    let kilogram = grams / 1000;
    let money = price * kilogram;

    console.log(`I need ${money.toFixed(2)} leva to buy ${kilogram.toFixed(2)} kilograms ${fruitName}.`);
}

fruit('orange', 2500, 1.80);