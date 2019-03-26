function attachEvents() {

    const url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';

    $('#btnLoad').on('click', onLoad => {
        $.ajax({
            method: 'GET',
            url,
            success: loadContacts
        })
    });

    function loadContacts(data) {
        let phonebook = $('#phonebook');
        phonebook.empty();
        for (let [id, personInfo] of Object.entries(data)) {

            let li = $(`<li>${personInfo.person}: ${personInfo.phone}\t</li>`);
            let deleteBtn = $(`<button>Delete</button>`);

            deleteBtn.appendTo(li);
            li.appendTo(phonebook);

            deleteBtn.on('click', onDelete => {
                $.ajax({
                    method: 'DELETE',
                    url: `https://phonebook-nakov.firebaseio.com/phonebook/${id}.json`,
                    success: () => {
                        $('#btnLoad').click();
                    }
                })
            })
        }
    }


    $('#btnCreate').on('click', onCreateContact => {

        $.ajax({
            method: 'POST',
            url,
            data: JSON.stringify({
                person: $('#person').val(),
                phone: $('#phone').val()
            }),
            success: () => {
                $('#person').val('');
                $('#phone').val('');
                $('#btnLoad').click();
            }
        })
    })
}