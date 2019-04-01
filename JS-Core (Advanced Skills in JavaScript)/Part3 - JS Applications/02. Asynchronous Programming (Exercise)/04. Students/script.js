function students() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_BJXTsSi-e';
    const collection = 'students';
    const username = 'guest';
    const password = 'guest';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    let addBtn = $('#addButton');
    let showBtn = $('#showButton');
    let spinner = $('#spinner');

    showBtn.on('click', showStudents);
    addBtn.on('click', addStudent);

    async function showStudents() {
        spinner.show();
        try {
            let studentsList = await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection,
                method: 'GET'
            });

            let sortedList = studentsList.sort((a, b) => a.ID - b.ID);

            sortedList.forEach((student) => {
                let newRow = $(`<tr>
                    <th>${student.ID}</th>
                    <th>${student.FirstName}</th>
                    <th>${student.LastName}</th>
                    <th>${student.FacultyNumber}</th>
                    <th>${student.Grade}</th>
                    </tr>`);
                newRow.appendTo($('#results'))
            });
        } catch (err) {
            console.log(err);
        }
        spinner.hide();
    }

    async function addStudent() {
        spinner.show();
        let studentObj = {
            ID: +$('#ID').val(),
            FirstName: $('#firstName').val(),
            LastName: $('#lastName').val(),
            FacultyNumber: $('#number').val(),
            Grade: +$('#grade').val()
        };

        try {
            await $.ajax({
                headers,
                url: baseUrl + 'appdata/' + appKey + '/' + collection,
                method: 'POST',
                data: JSON.stringify(studentObj)
            });

            showStudents();

            $('#ID').val('');
            $('#firstName').val('');
            $('#lastName').val('');
            $('#number').val('');
            $('#grade').val('');

        } catch (err) {
            console.log(err);
        }
    }
}