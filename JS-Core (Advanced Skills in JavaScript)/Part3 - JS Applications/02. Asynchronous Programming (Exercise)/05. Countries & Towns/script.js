function countriesAndTowns() {
    console.log('hi');
    //

    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_B14Gi9kt4';
    const collection = 'countriesAndTowns';
    const username = 'guest';
    const password = 'guest';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };


    $('#showCountriesButton').on('click', showCountries);
    $('#addCountry').on('click', addCountry);
    let spinner = $('#spinner');

    async function showCountries() {
        spinner.show();
        try {
            let countriesList = await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection,
                method: 'GET'
            });

            console.log(countriesList);
            let mainSpan = $('span.main');
            mainSpan.empty();
            countriesList.forEach((countryObj) => {
                let id = countryObj._id;
                let countrySpan = $(`<span data-id="${id}">`);
                let countryBtn = $(`<button class="country">${countryObj.Country}</button>`);
                countryBtn.on('click', showTowns);
                let input = $('<input id="edit" type="text" placeholder="Edit country">');
                let editBtn = $(`<button class="options">Edit</button>`);
                editBtn.on('click', editCountry);
                let deleteBtn = $(`<button class="options">Delete</button>`);
                deleteBtn.on('click', deleteCountry);
                let line = $('<hr>');

                countrySpan.append(countryBtn, input, editBtn, deleteBtn, line);
                mainSpan.append(countrySpan)

            });

        } catch (err) {
            console.log(err);
        }
        spinner.hide();
    }

    async function addCountry() {
        spinner.show();
        let input = $('#country');
        let newCountry = {Country: input.val()};

        try {
            let countriesList = await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection,
                method: 'POST',
                data: JSON.stringify(newCountry)
            });
            input.val('');
            showCountries();
        } catch (err) {
            console.log(err);
        }
        spinner.hide();
    }

    async function deleteCountry() {
        spinner.show();
        let id = $(this).parent().data('id');

        try {
            await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'DELETE',
            });

            showCountries();

        } catch (error) {
            console.log(error);
            spinner.hide();
        }
    }

    async function editCountry() {
        spinner.show();
        let id = $(this).parent().data('id');
        let input = $(this).parent().children('#edit');

        let newCountry = {Country: input.val()};

        try {
            let countriesList = await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'PUT',
                data: JSON.stringify(newCountry)
            });
            showCountries();
        } catch (err) {
            console.log(err);
        }
    }

    async function showTowns() {
        spinner.show();
        let id = $(this).parent().data('id');
        try {
            let countryInfo = await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'GET'
            });

            console.log(countryInfo);
            let entries = Object.entries(countryInfo);
            let towns = [];
            for (let [key, value] of entries) {
                if (key.includes('Town')) {
                    towns.push(value);
                }
            }

            spinner.hide()
        } catch (err) {
            console.log(err);
        }
    }
}