function acceptance() {

	let company = $('[name="shippingCompany"]').val();
    let product = $('[name="productName"]').val();
    let quantity = $('[name="productQuantity"]').val();
    let scrape = $('[name="productScrape"]').val();
    let warehouse = $('#warehouse');

    if (company && product && +quantity && +scrape) {

        let div = $('<div>');
        let p = $('<p>');
        let btn = $('<button type="button">Out of stock</button>');

        quantity -= scrape;

        if (quantity > 0) {

            p.text(`[${company}] ${product} - ${quantity} pieces`);
            p.appendTo(div);
            btn.appendTo(div);
            div.appendTo(warehouse);
        }

        btn.on('click', () => btn.parent().remove());
    }

    $('[name="shippingCompany"]').val('');
    $('[name="productName"]').val('');
    $('[name="productQuantity"]').val('');
    $('[name="productScrape"]').val('');
}