function solution() {

    let toyType = $('#toyType');
    let toyPrice = $('#toyPrice');
    let toyDescription = $('#toyDescription');
    let giftShop = $('#christmasGiftShop');

    let typeRgx = /^[A-Za-z\s]+$/g;
    let priceRgx = /^[\d.]+$/g;
    let descriptionRgx = /^.{50,}$/g;

    let addBtn = $('button');
    addBtn.on('click', function () {
        if (typeRgx.test(toyType.val())
            && priceRgx.test(toyPrice.val())
            && descriptionRgx.test(toyDescription.val())) {

            let div = $('<div>');
            let img = $('<img>');
            let h2 = $('<h2>');
            let p = $('<p>');
            let buyBtn = $('<button>');

            div.attr('class', 'gift');
            img.attr('src', 'gift.png');
            h2.text(toyType.val());
            p.text(toyDescription.val());
            buyBtn.text(`Buy it for $${toyPrice.val()}`);

            div.append(img, h2, p, buyBtn);
            giftShop.append(div);

            buyBtn.on('click', function () {
               div.remove();
            });

            toyType.val('');
            toyPrice.val('');
            toyDescription.val('');
            giftShop.val('');
        }
    });
}