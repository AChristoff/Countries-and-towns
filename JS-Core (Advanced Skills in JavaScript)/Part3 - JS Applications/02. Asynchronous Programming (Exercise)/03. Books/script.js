function attachEvents() {
    const spinner = $('#spinner');
    const baseUrl = 'https://baas.kinvey.com/appdata';
    const appKey = 'kid_Hy3FsSGF4';
    const collection = 'books';
    const username = 'guest';
    const password = 'guest';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    };

    $('#addButton').on('click', addBook);
    $('#showButton').on('click', showBooks);

    async function addBook() {
        spinner.show();

        let newBook = {
            title: $('#add-title').val(),
            author: $('#add-author').val(),
            isbn: $('#add-number').val(),
        };

        try {
            await $.ajax({
                headers,
                url: baseUrl + '/' + appKey + '/' + collection,
                method: 'POST',
                data: JSON.stringify(newBook),
            });
            showBooks();
        } catch (err) {
            console.log(err);
            spinner.hide();
        }

    }

    async function showBooks() {
        spinner.show();
        try {

            let bookList = await $.ajax({
                headers,
                url: baseUrl + '/' + appKey + '/' + collection,
                method: 'GET',
            });

            function makeList() {

            }

            let list = $('#book-list');
            list.empty();
            let tableHeader = $(`<th>Title</th>
                                 <th>Author</th>
                                 <th>ISBN</th>
                                 <th></th>
                                 <th></th>`);
            tableHeader.appendTo(list);
            bookList.forEach((book) => {
                let p = $(`<tr id="${book._id}">)
                               <td>${book.title}</td>
                               <td>${book.author}</td>
                               <td>${book.isbn}</td>
                               <td><button id="edit" class="edit">Edit</button></td>
                               <td><button id="delete" class="edit">Delete</button></td>
                           </tr>`);

                let editing = 1;
                p.find('#edit').on('click', (e) => {
                    editing++;
                    if (editing % 2 === 0) {
                        let row = e.target.parentNode.parentNode;
                        let [firstRow, , secondRow, , thirdRow, , edit, , del] = $(row.childNodes).toArray();
                        $(firstRow).empty();
                        $(secondRow).empty();
                        $(thirdRow).empty();
                        let titleInput = $(`<input id="edit-title" placeholder='edit title "${book.title}"'>`);
                        let authorInput = $(`<input id="edit-author" placeholder='edit author "${book.author}"'>`);
                        let isbnInput = $(`<input id="edit-number" placeholder='edit ISBN "${book.isbn}"'>`);
                        $(firstRow).append(titleInput);
                        $(secondRow).append(authorInput);
                        $(thirdRow).append(isbnInput);
                        $(edit).children().attr('class', 'editing');
                        let commitBtn = $(del).empty();
                        commitBtn.append('<button id="commit" class="edit">Commit</button>');
                        commitBtn.on('click', commitChanges);
                    } else {
                        let row = e.target.parentNode.parentNode;
                        let [firstRow, , secondRow, , thirdRow, , edit, , del] = $(row.childNodes).toArray();
                        $(firstRow).empty().text(`${book.title}`);
                        $(secondRow).empty().text(`${book.author}`);
                        $(thirdRow).empty().text(`${book.isbn}`);
                        $(edit).children().attr('class', 'edit');
                        $(del).children().text('Delete');
                    }
                });
                p.find('#delete').on('click', deleteBook);
                p.appendTo(list);
            });

            list.show();
            spinner.hide();
        } catch (err) {
            console.log(err);
            spinner.hide();
        }
    }

    showBooks().click;

    async function commitChanges() {
        spinner.show();
        let id = $(this).parent().toArray()[0].id;

        try {

            let book = await $.ajax({
                headers,
                url: baseUrl + '/' + appKey + '/' + collection + '/' + id,
                method: 'GET',
            });

            let titleCell = $(this).parent().children().toArray()[0];
            let authorCell = $(this).parent().children().toArray()[1];
            let isbnCell = $(this).parent().children().toArray()[2];
            titleCell = $(titleCell.firstChild).val();
            authorCell = $(authorCell.firstChild).val();
            isbnCell = $(isbnCell.firstChild).val();

            let editBook = {
                title: titleCell || book.title,
                author: authorCell || book.author,
                isbn: isbnCell || book.isbn,
            };

            await $.ajax({
                headers,
                url: baseUrl + '/' + appKey + '/' + collection + '/' + id,
                method: 'PUT',
                data: JSON.stringify(editBook),
            });
            showBooks();

        } catch (err) {
            console.log(err);
            spinner.hide();
        }
    }

    async function deleteBook() {
        spinner.show();
        let id = $(this).parent().parent().toArray()[0].id;
        try {
            await $.ajax({
                headers,
                url: baseUrl + '/' + appKey + '/' + collection + '/' + id,
                method: 'DELETE'
            });
        } catch (err) {
            console.log(err);
            spinner.hide()
        }
        showBooks();
    }
}



