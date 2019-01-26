function coffeeMachine(ordersArr) {

    let income = 0;
    let change = 0;
    let milkPrice = 0.1;
    let sugarPrice = 0;
    let orderPrice = 0;

    for (const order of ordersArr) {

        let ordersInfo = order.split(', ');
        let [coins, drink] = ordersInfo.splice(0, 2);

        // -----------------------------TEA------------------------------------
        if (drink === 'tea') {

            milkPrice = 0.1;
            sugarPrice = 0;
            orderPrice = 0;

            let [milk, sugar] = ordersInfo;

            if (milk === 'milk') {

                if (+sugar > 0) {
                    sugarPrice = 0.1;
                }

                orderPrice += (sugarPrice + milkPrice + 0.8);
                change = coins - orderPrice;

                if (change >= 0) {
                    console.log(`You ordered ${drink}. Price: ${orderPrice.toFixed(2)}$ Change: ${change.toFixed(2)}$`);
                    income += orderPrice;

                } else {
                    console.log(`Not enough money for ${drink}. Need ${Math.abs(change).toFixed(2)}$ more.`);
                }

            } else {

                milkPrice = 0.1;
                sugarPrice = 0;
                orderPrice = 0;

                sugar = +milk;
                if (+sugar > 0) {
                    sugarPrice = 0.1;
                }

                orderPrice += (sugarPrice + 0.8);

                change = coins - orderPrice;

                if (change >= 0) {
                    console.log(`You ordered ${drink}. Price: ${orderPrice.toFixed(2)}$ Change: ${change.toFixed(2)}$`);
                    income += orderPrice;

                } else {
                    console.log(`Not enough money for ${drink}. Need ${Math.abs(change).toFixed(2)}$ more.`);
                }
            }

            // ------------------------------COFFEE-----------------------------------

        } else {

            milkPrice = 0.1;
            sugarPrice = 0;
            orderPrice = 0;

            let [type, milk, sugar] = ordersInfo;


            // ------------------------------DECAF-----------------------------------

            if (type === 'decaf') {

                if (milk === 'milk') {

                    if (+sugar > 0) {
                        sugarPrice = 0.1;
                    }

                    orderPrice += (sugarPrice + milkPrice + 0.9);

                    change = coins - orderPrice;

                    if (change >= 0) {
                        console.log(`You ordered ${drink}. Price: ${orderPrice.toFixed(2)}$ Change: ${change.toFixed(2)}$`);
                        income += orderPrice;
                    } else {
                        console.log(`Not enough money for ${drink}. Need ${Math.abs(change).toFixed(2)}$ more.`);
                    }

                } else {

                    sugar = +milk;
                    if (+sugar > 0) {
                        sugarPrice = 0.1;
                    }

                    orderPrice += (sugarPrice + 0.9);

                    change = coins - orderPrice;

                    if (change >= 0) {
                        console.log(`You ordered ${drink}. Price: ${orderPrice.toFixed(2)}$ Change: ${change.toFixed(2)}$`);
                        income += orderPrice;
                    } else {
                        console.log(`Not enough money for ${drink}. Need ${Math.abs(change).toFixed(2)}$ more.`);
                    }
                }

                // -----------------------------CAF------------------------------------

            } else {

                milkPrice = 0.1;
                sugarPrice = 0;
                orderPrice = 0;

                if (milk === 'milk') {

                    if (+sugar > 0) {
                        sugarPrice = 0.1;
                    }

                    orderPrice += (sugarPrice + milkPrice + 0.8);

                    change = coins - orderPrice;

                    if (change >= 0) {
                        console.log(`You ordered ${drink}. Price: ${orderPrice.toFixed(2)}$ Change: ${change.toFixed(2)}$`);
                        income += orderPrice;
                    } else {
                        console.log(`Not enough money for ${drink}. Need ${Math.abs(change).toFixed(2)}$ more.`);
                    }

                } else {

                    sugar = +milk;
                    if (+sugar > 0) {
                        sugarPrice = 0.1;
                    }

                    orderPrice += (sugarPrice + 0.8);

                    change = coins - orderPrice;

                    if (change >= 0) {
                        console.log(`You ordered ${drink}. Price: ${orderPrice.toFixed(2)}$ Change: ${change.toFixed(2)}$`);
                        income += orderPrice;
                    } else {
                        console.log(`Not enough money for ${drink}. Need ${Math.abs(change).toFixed(2)}$ more.`);
                    }
                }
            }
        }
    }

    console.log(`Income Report: ${income.toFixed(2)}$`);
}

coffeeMachine(
    ['1.00, coffee, caffeine, milk, 4',
        '0.40, tea, milk, 2',
        '1.00, coffee, decaf, milk, 0']
);