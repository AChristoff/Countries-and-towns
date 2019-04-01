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

            let entries = Object.entries(countryInfo);

            for (let [key, value] of entries) {
                if (key.includes('Town') && value !== '') {
                    counter++;
                    let div = $(`<div class="towns" data-id="${key}"></div>`);
                    let p = $(`<p>${value}</p>`);
                    let input = $('<input id="inputTown" type="text" placeholder="add/edit town">');
                    let add = $('<button id="add" class="towns">add</button>');
                    add.on('click', addTown);
                    let edit = $('<button id="edit" class="towns">edit</button>');
                    edit.on('click', editTown);
                    let del = $('<button id="del" class="towns">delete</button>');
                    del.on('click', deleteTown);

                    div.append(p, input, add, edit, del);
                    div.appendTo(list);
                }
                if (key.includes('kmd') && counter === 0) {
                    counter++;
                    let div = $(`<div class="towns" data-id="${key}"></div>`);
                    let p = $(`<p>No towns yet</p>`);
                    let input = $('<input id="inputTown" type="text" placeholder="add town">');
                    let add = $('<button id="add" class="towns">add</button>');
                    add.on('click', firstTown);

                    div.append(p, input, add);
                    div.appendTo(list);
                    spinner.hide();
                }
            }
        } catch (err) {
            console.log(err);
        }
        spinner.hide()
    }

    async function firstTown() {
        spinner.show();
        let townId = $(this).parent().data('id');
        let id = $(this).parent().parent().parent().data('id');
        let country = $(this).parent().parent().parent().children('.country').text();
        let town = $(this).parent().children('#inputTown').val();
        let newTown = {
            'Town-1': town,
            Country: country,
        };

        try {

            await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'PUT',
                data: JSON.stringify(newTown)
            });

            $(this).parent().parent().parent().children('.country').click();
        } catch (error) {
            console.log(error);
            spinner.hide();
        }
    }
    
    function addTown() {
        
    }

    function editTown() {
        console.log('edit');
        console.log($(this).parent());
    }

    async function deleteTown() {
        spinner.show();
        let townId = $(this).parent().data('id');
        let deletedTown = {[townId]: ''};
        console.log(deletedTown);
        let id = $(this).parent().parent().parent().data('id');


        try {

            let townInfo = await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'GET',
            });

            console.log(townInfo);
            // await $.ajax({
            //     headers,
            //     url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
            //     method: 'PUT',
            //     data: JSON.stringify(deletedTown)
            // });

            showTowns();

        } catch (error) {
            console.log(error);
            spinner.hide();
        }
    }
}