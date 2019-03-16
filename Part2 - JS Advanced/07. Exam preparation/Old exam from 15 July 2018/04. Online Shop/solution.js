function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);

    let product = $('.custom-select');
    let price = $('#price');
    let quantity = $('#quantity');
    let submitBtn = $('#submit');
    let inventory = $('.display');
    let capacity = $('#capacity');
    let sum = $('#sum');

    product.on('input', () => {
        let isEmpty = product.val() === '';
        submitBtn.attr('disabled', isEmpty);
    });

    submitBtn.on('click', () => {
        let totalQty = Number(capacity.val()) + Number(quantity.val());

        if (totalQty < 150) {
            addProduct();
        } else if (totalQty === 150) {
            addProduct();
            disableInput();
        }

        reset();
    });

    function addProduct() {
        let li = $(`<li>Product: ${product.val()} Price: ${price.val()} Quantity: ${quantity.val()}</li>`);
        li.appendTo(inventory);
        recordAndDisplayQty();
        recordAndDisplayPrice();
    }

    function recordAndDisplayQty() {
        capacity.val(Number(capacity.val()) + Number(quantity.val()))
    }

    function recordAndDisplayPrice() {
        let priceSum = Number(sum.val()) + Number(price.val());
        sum.val(priceSum)
    }

    function reset() {
        product.val('');
        price.val(1);
        quantity.val(1);
        submitBtn.attr('disabled', true);
    }

    function disableInput() {
        capacity.val('full');
        capacity.addClass('fullCapacity');
        product.attr('disabled', true);
        price.attr('disabled', true);
        quantity.attr('disabled', true);
    }
}