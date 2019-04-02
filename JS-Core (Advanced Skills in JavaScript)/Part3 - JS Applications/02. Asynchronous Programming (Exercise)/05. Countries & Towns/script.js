function countriesAndTowns() {

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

    // - - - Countries CRUD

    async function showCountries() {
        spinner.show();
        try {
            let countriesList = await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection,
                method: 'GET'
            });

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
                let list = $(`<p class="list"></p>`);
                let line = $('<hr>');

                countrySpan.append(countryBtn, input, editBtn, deleteBtn, list, line);
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
        } catch (err) {
            console.log(err);
        }
        showCountries();
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

        } catch (err) {
            console.log(err);
            spinner.hide();
        }
    }

    async function editCountry() {
        spinner.show();
        let id = $(this).parent().data('id');
        let input = $(this).parent().children('#edit');
        let countryInfo = {};

        try {
            countryInfo = await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'GET',
            });
        } catch (err) {
            console.log(err);
        }

        let newCountry = {
            Country: input.val(),
            Towns: countryInfo.Towns
        };

        console.log(newCountry);

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

    // - - - Towns CRUD
    
    async function showTowns() {
        spinner.show();
        let counter = 0;
        let id = $(this).parent().data('id');
        try {
            let list = $(this).parent().children('.list').show();
            list.empty();
            let countryInfo = await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'GET'
            });

            let townsArr = countryInfo.Towns;

            function addTownButtons(text) {
                counter++;
                let div = $(`<div class="towns" data-id="${id}"></div>`);
                let input = $('<input id="inputTown" type="text" placeholder="Town name">');
                let add = $('<button id="add" class="towns">add</button>');
                add.on('click', addTown);
                let edit = $('<button id="edit" class="towns">edit</button>');
                edit.on('click', editTown);
                let del = $('<button id="del" class="towns">delete</button>');
                del.on('click', deleteTown);

                if (text !== 'Add New Town') {
                    let li = $(`<li class="town-name">${text}</li>`);
                    div.append(li, input, edit, del);
                } else {
                    let lh = $(`<lh class="town-name">${text}</lh>`);
                    div.append(lh, input, add);
                }


                div.appendTo(list);
                spinner.hide();
            }

            addTownButtons('Add New Town');

            if (townsArr) {
                townsArr.forEach((town) => {
                    addTownButtons(town);
                })
            }


        } catch (err) {
            console.log(err);
        }
        spinner.hide()
    }

    async function addTown() {
        spinner.show();
        let id = $(this).parent().parent().parent().data('id');
        let input = $(this).parent().children('#inputTown');

        try {

            let countryInfo = await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'GET',
            });

            let town = $(this).parent().children('#inputTown').val();

            let updatedTowns = countryInfo.Towns;

            if (updatedTowns) {
                updatedTowns.push(input.val());
            } else {
                updatedTowns = [`${town}`]
            }

            let newTown = {
                Country: countryInfo.Country,
                Towns: updatedTowns,
            };

            await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'PUT',
                data: JSON.stringify(newTown)
            });

            $(this).parent().parent().parent().children('.country').click();

        } catch (err) {
            console.log(err);
            spinner.hide();
        }
    }

    async function editTown() {
        spinner.show();
        let id = $(this).parent().parent().parent().data('id');

        try {

            let countryInfo = await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'GET',
            });

            let town = $(this).parent().children('.town-name').text();
            let indexOfTown = countryInfo.Towns.indexOf(town);
            let updatedTown = $(this).parent().children('#inputTown').val();
            let updatedTowns = countryInfo.Towns.splice(indexOfTown, 0, updatedTown);
            updatedTowns = countryInfo.Towns.filter((x) => x !== town);

            let newTown = {
                Country: countryInfo.Country,
                Towns: updatedTowns,
            };

            await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'PUT',
                data: JSON.stringify(newTown)
            });

            $(this).parent().parent().parent().children('.country').click();

        } catch (err) {
            console.log(err);
            spinner.hide();
        }
    }

    async function deleteTown() {
        spinner.show();
        let id = $(this).parent().parent().parent().data('id');

        try {

            let countryInfo = await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'GET',
            });

            let town = $(this).parent().children('.town-name').text();
            let updatedTowns = countryInfo.Towns.filter((x) => x !== town);

            let newTown = {
                Country: countryInfo.Country,
                Towns: updatedTowns,
            };

            await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'PUT',
                data: JSON.stringify(newTown)
            });

            $(this).parent().parent().parent().children('.country').click();

        } catch (err) {
            console.log(err);
            spinner.hide();
        }
    }
}