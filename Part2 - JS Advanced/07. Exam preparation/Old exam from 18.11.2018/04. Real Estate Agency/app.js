function realEstateAgency() {

    let regBtn = $('[name="regOffer"]');
    let findBtn = $('[name="findOffer"]');
    let notification = $('#message');

    regBtn.on('click', () => {

        let price = $('[name="apartmentRent"]').val();
        let type = $('[name="apartmentType"]').val();
        let commission = $('[name="agencyCommission"]').val();
        let offers = $('#building');

        if (isNaN(type) && +price > 0 && +commission >= 0 && +commission <= 100) {

            let offerTags = ['Rent', 'Type', 'Commission'];
            let offerInfo = $('#regOffer input').toArray().map((x) => $(x).val());
            let div = $('<div class="apartment"></div>');

            for (let i = 0; i < offerInfo.length; i++) {
                let p = $('<p>');
                p.text(`${offerTags[i]}: ${offerInfo[i]}`);
                p.appendTo(div);
            }

            div.appendTo(offers);
            notification.text('Your offer was created successfully.');

        } else {
            notification.text('Your offer registration went wrong, try again.');
        }

        $('[name="apartmentRent"]').val('');
        $('[name="apartmentType"]').val('');
        $('[name="agencyCommission"]').val('');
    });

    findBtn.on('click', () => {

        let budget = $('[name="familyBudget"]').val();
        let searchedType = $('[name="familyApartmentType"]').val();
        let familyName = $('[name="familyName"]').val();
        let agencyProfitReport = $('#roof h1');
        let agencyProfit = +$('#roof h1').text().split(' ')[2];
        let prices = $('.apartment p:nth-child(1)').toArray().map((x) => $(x).text().split(' ')[1]);
        let types = $('.apartment p:nth-child(2)').toArray().map((x) => $(x).text().split(' ')[1]);
        let offers = $('.apartment').toArray();
        let commissionPercent = $('.apartment p:nth-child(3)').toArray().map((x) => $(x).text().split(' ')[1]);

        if (+budget > 0 && searchedType && familyName) {

            for (let i = 0; i < offers.length; i++) {

                function isTaken(offerIndex) {
                    if (isNaN(+prices[offerIndex])) {
                        return isTaken(offerIndex+1)
                    }
                    return offerIndex;
                }

                let offerRows = $(offers[isTaken(i)]).children().toArray();
                let currentCommission = +commissionPercent[i] / 100 * +prices[isTaken(i)];
                let totalPrice = +prices[isTaken(i)] + currentCommission;

                if (totalPrice <= budget && searchedType === types[isTaken(i)]) {

                    let apartment = $(offerRows[0]).parent();
                    let moveOutBtn = $('<button>MoveOut</button>');
                    moveOutBtn.on('click', () => {
                        apartment.remove();
                        notification.text(`They had found cockroaches in ${familyName}'s apartment`);
                    });

                    apartment.attr('style', 'border: 2px solid red');
                    $(offerRows[0]).text(familyName);
                    $(offerRows[1]).text('live here now');
                    $(offerRows[2]).remove();
                    moveOutBtn.appendTo(apartment);

                    agencyProfitReport.text(`Agency profit: ${agencyProfit + currentCommission * 2} lv.`);
                    notification.text('Enjoy your new home! :))');
                    break;

                } else {
                    notification.text('We were unable to find you a home, so sorry :(');
                }
            }

        } else {
            notification.text('We were unable to find you a home, so sorry :(');
        }

        $('[name="familyBudget"]').val('');
        $('[name="familyApartmentType"]').val('');
        $('[name="familyName"]').val('');
    });
}