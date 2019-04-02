function attachEvents() {
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

    let date = $('#venueDate').val();
    let infoButtons;

    async function getList() {
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
            console.log(err);
            spinner.hide();
        }
    }

    function listVenue(venue) {
        let mainDIV = $('#venue-info');
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

            let venue = venueDIV.find('.venue-name').text();
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
                mainDIV.empty();
                let purchaseDIV =
                    $(`<span class="head">Confirm purchase</span>
                        <div class="purchase-info">
                            <span>${venue}</span>
                            <span>${qty} x ${price}</span>
                            <span>Total: ${qty * price} lv</span>
                            <input type="button" value="Confirm">
                        </div>`);
                purchaseDIV.appendTo(mainDIV);
            });
        });

        venueDIV.appendTo(mainDIV);
        spinner.hide();
    }
}