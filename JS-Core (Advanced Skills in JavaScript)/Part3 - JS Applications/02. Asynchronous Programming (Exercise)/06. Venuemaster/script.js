function attachEvents() {
    /*

    The service at the given address will respond
    with valid information only for this dates
    23-11 , 24-11 , 25-11 , 26-11 , 27-11
    , in this exact format.

     */

    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_BJ_Ke8hZg';
    const collection = 'venues';
    const username = 'guest';
    const password = 'pass';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    $('#getVenues').on('click', getList);
    let spinner = $('#spinner');
    let body = $('#venue-info');

    async function getList() {
        body.empty();
        let date = $('#venueDate').val();
        spinner.show();
        try {
            let venuesIDs = await $.ajax({
                headers,
                url: baseUrl + 'rpc/' + appKey + `/custom/calendar?query=${date}`,
                method: 'POST',
            });

            venuesIDs.forEach(async (_id) => {
                let venue = await $.ajax({
                    headers,
                    url: baseUrl + 'appdata/' + appKey + `/venues/${_id}`,
                    method: 'GET',
                });
                listVenue(venue);
            });

        } catch (err) {
            let errorMessage = $(`<div id="error"></div>`);
            errorMessage.text('We are very sorry! But we have available offers only for the following dates: 23-11, 24-11, 25-11, 26-11, 27-11.Thank you for choosing Venuemaster!');
            $('#venueDate').val('');
            $('#venueDate').attr('placeholder', 'Enter date in format DD-MM');
            body.append('<br>', errorMessage);
            spinner.hide();
            console.log(err);
        }
    }

    function listVenue(venue) {
        let mainDIV = $('#venue-info');
        let venueID = venue._id;
        let venueDIV =
            $(`<div class="venue" id="${venue._id}">
                        <span class="venue-name">
                            <input class="info" type="button" value="More info">${venue.name}
                        </span>
                        <div class="venue-details" style="display: none;">
                            <table>
                                <tr>
                                    <th>Ticket Price</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td class="venue-price">${venue.price} lv</td>
                                    <td><select class="quantity">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select></td>
                                    <td>
                                        <input class="purchase" type="button" value="Purchase">
                                    </td>
                                </tr>
                            </table>
                            <span class="head">Venue description:</span>
                            <p class="description">${venue.description}</p>
                            <p class="description">Starting time: ${venue.startingHour}</p>
                        </div>
                    </div>`);

        venueDIV.find('.info').on('click', (e) => {

            let selectedVenue = venueDIV.find('.venue-name').text();
            let purchaseButton = venueDIV.find('.purchase');

            let time = venueDIV
                .find('.description')
                .toArray()[1];
            time = $(time)
                .text()
                .split(' ')[2];

            let visibility = venueDIV.find('.venue-details');

            if (visibility.is(':visible')) {
                visibility.hide();
                e.target.value = 'More info';
            } else {
                visibility.show();
                e.target.value = 'Hide info';
            }

            purchaseButton.on('click', () => {
                let price = +venueDIV.find('.venue-price').text().split(' ')[0];
                let qty = +venueDIV.find('.quantity').val();
                let totalPrice = (price * qty).toFixed(2);
                mainDIV.empty();
                let purchaseDIV =
                    $(`<span class="head">Confirm purchase</span>
                        <div class="purchase-info">
                            <span>${selectedVenue}</span>
                            <span>${qty} x ${price.toFixed(2)}</span>
                            <span>Total: ${totalPrice} lv</span>
                            <input type="button" value="Confirm">
                        </div>`);
                
                purchaseDIV.find('input').on('click', confirm);

                async function confirm() {
                    spinner.show();
                    mainDIV.empty();
                    try {
                        let confirmation = await $.ajax({
                            headers,
                            url: baseUrl + `rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${selectedVenue}&qty=${qty} `,
                            method: 'POST'
                        });
                        console.log(confirmation);
                        let confirmationDIV = $(confirmation.html);
                        /* `<div class="ticket">
                                 <div class="left">
                                    <span class="head">Venuemaster</span>
                                    <span class="venue-name">undefined</span>
                                    <span class="bl">undefined</span>
                                    <br>
                                    <span class="bl">Admit 1</span>
                                    <span class="bl">NaN lv</span>
                                 </div>
                                 <div class="right">
                                    <span>Venue code</span>
                                    <br>
                                    <span>Kankun</span>
                                    <span class="head">Venuemaster</span>
                                </div>
                            </div>`; */
                        confirmationDIV.find('.venue-name').text(`${selectedVenue}`);
                        $(confirmationDIV.find('.bl').toArray()[0]).text(`${time}`);
                        $(confirmationDIV.find('.bl').toArray()[2]).text(`${totalPrice} lv`);
                        $(confirmationDIV.find('.right').children().toArray()[2]).text(`${venueID}`);
                        $('<span>You may print this page as your ticket</span>').appendTo(mainDIV);
                        confirmationDIV.appendTo(mainDIV);
                        spinner.hide();
                    } catch (err) {
                        console.log(err);
                        spinner.hide();
                    }
                }

                purchaseDIV.appendTo(mainDIV);
                
            });
        });

        venueDIV.appendTo(mainDIV);
        spinner.hide();
    }
}
