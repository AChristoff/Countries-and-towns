class Kitchen {
    constructor(budget) {
        this.budget = budget;
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(products) {
        for (let product of products) {
            let [productName, productQuantity, productPrice] = product.split(' ');
            if (this.budget >= productPrice) {
                this.budget -= productPrice;
                this.productsInStock[productName] = (this.productsInStock[productName] += Number(productQuantity)) || Number(productQuantity);
                this.actionsHistory.push(`Successfully loaded ${productQuantity} ${productName}`)
            } else {
                this.actionsHistory.push(`There was not enough money to load ${productQuantity} ${productName}`)
            }
        }
        return this.actionsHistory.join('\n');
    }

    addToMenu(meal, products, price) {
        if (!this.menu[meal]) {
            this.menu[meal] = {products, price};
            return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
        } else {
            return `${meal} is already in our menu, try something different.`;
        }
    }

    showTheMenu() {
        let printedMenu = [];
        let meals = Object.entries(this.menu);
        if (!meals.length) {
            return 'Our menu is not ready yet, please come later...'
        } else {
            meals.forEach((meal) => printedMenu.push(`${meal[0]} - $ ${meal[1].price}\n`));
            return printedMenu.join('');
        }
    }

    makeTheOrder(meal) {
        if (!this.menu[meal]) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        } else {
            for (let product of this.menu[meal].products) {
                let [neededProduct, neededQuantity] = product.split(' ');
                let isProductInStock = this.productsInStock.hasOwnProperty(neededProduct);
                let isQuantityEnough = this.productsInStock[neededProduct] >= neededQuantity;
                if (isProductInStock && isQuantityEnough) {
                    this.productsInStock[neededProduct] -= neededQuantity
                } else {
                    return `For the time being, we cannot complete your order (${meal}), we are very sorry...`
                }
            }
            this.budget += this.menu[meal].price;
            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`
        }
    }
}