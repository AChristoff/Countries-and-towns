function solve() {

    let [loadProducts, buyProducts, log] = document.querySelectorAll('textarea');
    let [loadButton, buyButton, endBuyButton] = document.querySelectorAll('button');
    let productsObj = {};

    loadButton.addEventListener('click', load);
    function load() {
        let currentInputArr = [];
        currentInputArr = JSON.parse(loadProducts.value);

        for (let product of currentInputArr) {
            if (!Object.keys(productsObj).includes(product.name)) {
                productsObj[product.name] = {'quantity': product.quantity, 'price': product.price};
            } else {
                productsObj[product.name].quantity += product.quantity;
                productsObj[product.name].price += product.price;
            }
        }

        for (let product in productsObj) {
            log.value += `Successfully added ${productsObj[product].quantity} ${product}. Price: ${productsObj[product].price}\n`;
        }
    }

    let profit = 0;

    buyButton.addEventListener('click', (buy));
    function buy() {

        let buyProductsObj = JSON.parse(buyProducts.value);
        let orderedProduct = buyProductsObj.name;
        let orderedQuantity = buyProductsObj.quantity;

        if (!Object.keys(productsObj).includes(orderedProduct)) {
            log.value += 'Cannot complete order.\n';
        } else if (productsObj[orderedProduct].quantity < orderedQuantity) {
            log.value += 'Cannot complete order.\n';
        } else {
            console.log(productsObj);
            console.log(Object.keys(productsObj));
            console.log(orderedQuantity);
            console.log(productsObj[orderedProduct].price);
            console.log(productsObj[orderedProduct].quantity);

            let currentProfit = productsObj[orderedProduct].price * orderedQuantity;

            profit += currentProfit;

            log.value += `${orderedQuantity} ${orderedProduct} sold for ${currentProfit}.\n`;

            productsObj[orderedProduct].quantity -= orderedQuantity;

            if (productsObj[orderedProduct].quantity <= 0) {
                productsObj[orderedProduct].quantity = 0;
            }
        }
    }

    endBuyButton.addEventListener('click', end);

    function end() {
        log.value += `Profit: ${profit.toFixed(2)}.\n`;

        loadButton.removeEventListener('click', load);
        buyButton.removeEventListener('click', buy);
        endBuyButton.removeEventListener('click', end);
    }
}