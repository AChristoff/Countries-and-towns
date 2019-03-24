function solve(inputArr) {

    inputArr.pop();
    let regExValidator = /%([A-Z][a-z]+)%[^|$%.]*<(\w+)>[^|$%.]*\|(\d+)\|[^|$%.0-9]*(\d\d+.?\d+?|\d+.?\d+?|\d+)\$/;
    let totalIncome = 0;
    let bill = 0;

    for (let order of inputArr) {
        if (order.match(regExValidator)) {

            let [, customer, product, count, price] = order.match(regExValidator);

            bill = count * price;

            console.log(`${customer}: ${product} - ${bill.toFixed(2)}`);
            totalIncome += bill;
        }
    }

    console.log(`Total income: ${totalIncome.toFixed(2)}`);
}

solve([ '%George%<Croissant>|2|10.3$',
    '%Peter%<Gum>|1|1.3$',
    '%Maria%<Cola>|1|2.4$',
    'end of shift' ]
);