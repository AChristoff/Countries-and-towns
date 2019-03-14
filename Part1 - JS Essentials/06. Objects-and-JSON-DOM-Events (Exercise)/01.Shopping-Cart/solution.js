function solve() {

    let [milkBtn, breadBtn, tomatoesBtn, buyBtn] = document.querySelectorAll('#exercise button');
    let output = document.querySelector('textarea');
    let pElements = Array.from(document.querySelectorAll('.product p')).map((x) => x.textContent);

    let productsList = [];
    let priceList = [];

    onClick(milkBtn, pElements[0], +pElements[1].split(' ')[1]);
    onClick(breadBtn, pElements[2], +pElements[3].split(' ')[1]);
    onClick(tomatoesBtn, pElements[4], +pElements[5].split(' ')[1]);

    buyBtn.addEventListener('click', () => {

        let list = productsList.filter((el, idx, arr) => {
            if (arr.indexOf(el) === idx) {
                return el;
            }
        }).join(', ');

        let totalPrice = priceList.reduce((a, b) => a + b);
        output.value += `You bought ${list} for ${totalPrice.toFixed(2)}.\n`;
    });

    function onClick(button, productName, productPrice) {

        button.addEventListener('click', () => {
            output.value += `Added ${productName} for ${productPrice.toFixed(2)} to the cart.\n`;
            productsList.push(productName);
            priceList.push(productPrice);
        });
    }
}