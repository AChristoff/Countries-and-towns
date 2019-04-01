function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_ryMDW1COE';
    const collection = 'biggestCatches';
    const username = 'alex';
    const password = '123';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    let spinner = $('#spinner');
    $('.load').on('click', loadCatches);
    $('.add').on('click', addCatch);

    async function loadCatches() {
        spinner.show();
        try {
            let catches = await $.ajax({
                url: baseUrl + 'appdata/' + appKey + '/' + collection,
                method: 'GET',
                headers
            });

            $('#catches').empty();

            for (let catchInfo of catches) {

                let div = $(`<div class="catch" data-id="${catchInfo._id}">
            <label>Angler</label>
            <input type="text" class="angler" value="${catchInfo.angler}"/>
            <label>Weight</label>
            <input type="number" class="weight" value="${catchInfo.weight}"/>
            <label>Species</label>
            <input type="text" class="species" value="${catchInfo.species}"/>
            <label>Location</label>
            <input type="text" class="location" value="${catchInfo.location}"/>
            <label>Bait</label>
            <input type="text" class="bait" value="${catchInfo.bait}"/>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${catchInfo.captureTime}"/>
        </div>`);

                let updateBtn = $('<button class="update">Update</button>');
                updateBtn.on('click', updateCatch);
                let deleteBtn = $('<button class="delete">Delete</button>');
                deleteBtn.on('click', deleteCatch);

                div.append(updateBtn, deleteBtn);
                div.appendTo($('#catches'));
            }
        } catch (e) {
            console.log(e);
        }
        spinner.hide();
    }

    async function addCatch() {
        spinner.show();
        let angler = $('#addForm input.angler').val();
        let weight = Number($('#addForm input.weight').val());
        let species = $('#addForm input.species').val();
        let location = $('#addForm input.location').val();
        let bait = $('#addForm input.bait').val();
        let captureTime = Number($('#addForm input.captureTime').val());
        let catchObj = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };

        try {
            await $.ajax({
                url: baseUrl + 'appdata/' + appKey + '/' + collection,
                method: 'POST',
                headers,
                data: JSON.stringify(catchObj)
            });

            loadCatches();
        } catch (e) {
            console.log(e);
            spinner.hide();
        }

    }

    async function updateCatch() {
        spinner.show();
        let id = $(this).parent().data('id');
        let angler = $(this).parent().find('input.angler').val();
        let weight = Number($(this).parent().find('input.weight').val());
        let species = $(this).parent().find('input.species').val();
        let location = $(this).parent().find('input.location').val();
        let bait = $(this).parent().find('input.bait').val();
        let captureTime = Number($(this).parent().find('input.captureTime').val());
        let catchUpdate = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };

        try {
            await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'PUT',
                data: JSON.stringify(catchUpdate)
            })
        } catch (error) {
            console.log(error);
        }
        spinner.hide();
    }

    async function deleteCatch() {
        spinner.show();
        let id = $(this).parent().data('id');

        try {
            await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection + '/' + id,
                method: 'DELETE',
            });

            loadCatches();

        } catch (error) {
            console.log(error);
            spinner.hide();
        }
    }
}