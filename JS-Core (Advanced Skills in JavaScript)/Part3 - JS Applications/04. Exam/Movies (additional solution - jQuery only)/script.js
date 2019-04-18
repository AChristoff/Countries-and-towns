function attachEvents() {

    // kinvey data
    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_KEY = 'kid_Ske7sdiK4';
    const APP_SECRET = '01648cde5f6249419291757697bcf5d7';
    const headersBasic = {
        'Authorization': `Basic ${btoa(APP_KEY + ':' + APP_SECRET)}`
    };
    const headersKinvey = {
        'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
    };

    // ---  isLogged
    (() => {
        if (sessionStorage.getItem('authtoken')) {
            $('.logged-in').show();
            $('.logged-out').hide();
        }
    })();

    // ---  utils
    function hideAll() {
        $('.background').hide();

        $('#registerForm').hide();
        $('#loginForm').hide();

        $('#addMovie').hide();
        $('#myMovies').hide();
        $('#cinema').hide();
        $('#editMovie').hide();
        $('#deleteMovie').hide();
        $('#detailsMovie').hide();


    }

    function showView(view) {
        $(`.${view}`).on('click', () => {
            hideAll();
            $(`#${view}`).show();
        });
        (() => {
            let username = sessionStorage.getItem('username');
            $('#welcome').text(`Welcome, ${username}!`);
            if (sessionStorage.getItem('authtoken')) {
                $('.logged-in').show();
                $('.logged-out').hide();
            }
        })();
    }

    function saveSession(res) {
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('authtoken', res._kmd.authtoken);
        sessionStorage.setItem('userId', res._id);
    }

    // ---  change view
    showView('home');
    showView('registerForm');
    showView('loginForm');
    showView('addMovie');
    showView('myMovies');
    showView('cinema');

    // --- button actions
    $('#registerBtn').on('click', async function (event) {

        event.preventDefault();
        console.log('click login');
        let username = $('#registerUsername').val();
        let password = $('#registerPassword').val();

        try {
            let res = await $.ajax({
                headers: headersBasic,
                method: 'POST',
                url: BASE_URL + 'user' + '/' + APP_KEY,
                data: {
                    username,
                    password,
                }
            });

            saveSession(res);
            notify.showInfo('User registration successful.');
            setTimeout(function () {
                location.reload()
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    });

    $('#loginBtn').on('click', async function (event) {

        event.preventDefault();
        console.log('click login');
        let username = $('#loginUsername').val();
        let password = $('#loginPassword').val();

        try {
            let res = await $.ajax({
                headers: headersBasic,
                method: 'POST',
                url: BASE_URL + 'user' + '/' + APP_KEY + '/' + 'login',
                data: {
                    username,
                    password,
                }
            });

            saveSession(res);
            notify.showInfo('Login successful.');
            setTimeout(function () {
                location.reload()
            }, 2000);

        } catch (err) {
            console.log(err);
            notify.showError(err.responseJSON.description);
        }
    });

    $('#logoutBtn').on('click', async function (event) {
        event.preventDefault();
        console.log('click logout');

        try {
            await $.ajax({
                headers: headersKinvey,
                method: 'POST',
                url: BASE_URL + 'user' + '/' + APP_KEY + '/' + '_logout',
            });

            sessionStorage.clear();
            notify.showInfo('Logout successful.');
            setTimeout(function () {
                location.reload()
            }, 2000);

        } catch (err) {
            console.log(err);
        }
    });

    $('#addMovieBtn').on('click', async function (event) {
        event.preventDefault();
        console.log('click create');

        let title = $('#title');
        let imageUrl = $('#imageUrl');
        let description = $('#description');
        let genres = $('#genres');
        let tickets = $('#tickets');

        try {
            let newMovie = {
                title: title.val(),
                imageUrl: imageUrl.val(),
                description: description.val(),
                genres: genres.val().toLowerCase(),
                tickets: tickets.val(),
            };

            await $.ajax({
                headers: headersKinvey,
                url: BASE_URL + 'appdata' + '/' + APP_KEY + '/' + 'movies',
                method: 'POST',
                data: newMovie,
            });

            notify.showInfo(`Movie ${title.val()} created successfully.`);
            setTimeout(function () {
                $('#myMoviesBtn').click();
            }, 1000);

        } catch (err) {
            console.log(err);
        }

    });

    $('#allMoviesBtn').on('click', async function (event) {
        event.preventDefault();
        $('.allMovies').empty();
        try {

            let movieList = await $.ajax({
                headers: headersKinvey,
                url: BASE_URL + 'appdata' + '/' + APP_KEY + '/' + 'movies',
                method: 'GET',
            });

            movieList
                .sort((a, b) => Number(b.tickets) - Number(a.tickets))
                .forEach((movie) => {
                    let allMovieDiv = $(`<div id=${movie._id} class="movie">
                <h1>Details</h1>
                <h2>Title: ${movie.title}</h2>
                <img src="${movie.imageUrl}">
                <p>Available Tickets: ${movie.tickets}</p>
                <button class="buy-ticket"><a>Buy Ticket</a></button>
                <button class="details"><a>Details</a></button>
            </div>`);
                    allMovieDiv.find('.buy-ticket').on('click', buyTicket);
                    allMovieDiv.find('.details').on('click', movieDetails);
                    $('.allMovies').append(allMovieDiv);
                });

        } catch (err) {
            console.log(err);
        }

    });

    $('#myMoviesBtn').on('click', async function (event) {

        event.preventDefault();
        $('.myMoviesDiv').empty();
        try {

            let movieList = await $.ajax({
                headers: headersKinvey,
                url: BASE_URL + 'appdata' + '/' + APP_KEY + '/' + 'movies',
                method: 'GET',
            });

            movieList
                .filter((movie) => movie._acl.creator === sessionStorage.getItem('userId'))
                .sort((a, b) => Number(b.tickets) - Number(a.tickets))
                .forEach((movie) => {
                    let myMovieDiv = $(`
                <div id=${movie._id} class="movie">
                <h2>Title: ${movie.title}</h2>
                <img src="${movie.imageUrl}">
                <p>Available Tickets: ${movie.tickets}</p>
                <button class="edit-movie"><a>Edit</a></button>
                <button class="delete-movie"><a>Delete</a></button>
                <button class="buy-ticket"><a>Buy Ticket</a></button>
                <button class="detailsMovie"><a>Details</a></button>
            </div>`);
                    myMovieDiv.find('.edit-movie').on('click', editMovie);
                    myMovieDiv.find('.delete-movie').on('click', deleteMovie);
                    myMovieDiv.find('.buy-ticket').on('click', buyTicket);
                    myMovieDiv.find('.detailsMovie').on('click', movieDetails);
                    $('.myMoviesDiv').append(myMovieDiv);
                })

        } catch (err) {
            console.log(err);
        }
    });

    async function movieDetails() {
        hideAll();
        $('#detailsMovie').empty().show();

        let movieId = event.path[2].id;
        await loadMovieDetails('movie', movieId);
    }

    async function deleteMovie() {
        hideAll();
        $('#deleteMovie').empty().show();

        let movieId = event.path[2].id;
        await loadDeleteMovie(movieId);
    }

    async function editMovie() {
        hideAll();
        $('#editMovie').empty().show();

        let movieId = event.path[2].id;
        await loadEditMovie(movieId);
    }

    async function buyTicket() {
        hideAll();
        let movieId = event.path[2].id;
        let location = event.path[3].id;
        showView(`${location}`);
        $(`#${location}`).empty().show();
        console.log(location);

        if (location === 'detailsMovie') {
            await updateTickets(movieId);
            await loadMovieDetails('updatedMovieObj', movieId);
        } else if (location === 'my-movies') {
            await updateTickets(movieId);
            await $('#myMoviesBtn').click();
        } else if (location === 'all-movies') {
            await updateTickets(movieId);
            await $('#allMoviesBtn').click();
        }

    }

    async function updateTickets(movieId) {
        try {

            let movie = await $.ajax({
                headers: headersKinvey,
                url: BASE_URL + 'appdata' + '/' + APP_KEY + '/' + `movies/${movieId}`,
                method: 'GET',
            });

            if (Number(movie.tickets) < 1) {

                notify.showError(`No available tickets fo ${movie.title}`);
                loadMovieDetails('movie', movieId);
                return
            }

            let updatedMovieObj = {
                title: movie.title,
                imageUrl: movie.imageUrl,
                description: movie.description,
                genres: movie.genres,
                tickets: Number(movie.tickets) - 1,
            };

            await $.ajax({
                headers: headersKinvey,
                url: BASE_URL + 'appdata' + '/' + APP_KEY + '/' + `movies/${movieId}`,
                method: 'PUT',
                data: updatedMovieObj,
            });

            notify.showInfo(`Successfully bought ticket for ${movie.title}!`);
        } catch (err) {
            console.log(err);
        }
    }

    // --- additional views
    async function loadMovieDetails(variable, movieId) {
        try {
            let variable = await $.ajax({
                headers: headersKinvey,
                url: BASE_URL + 'appdata' + '/' + APP_KEY + '/' + `movies/${movieId}`,
                method: 'GET',
            });

            let detailsMovieDiv = $(`<div id=${variable._id} class="movie detailsMovie">
            <h1>Details</h1>
            <h2>Title: ${variable.title}</h2>
            <img src="${variable.imageUrl}">
            <p>${variable.description}</p>
            <h2>Genres</h2>
            <ul class="genres">
                <li>${variable.genres}</li>
            </ul>
            <p>Available Tickets: ${variable.tickets}</p>
            <button><a class="buy-ticket">Buy Ticket</a></button>
            </div>`);

            detailsMovieDiv.find('.buy-ticket').on('click', buyTicket);
            $('#detailsMovie').append(detailsMovieDiv);
        } catch (err) {
            console.log(err);
        }
    }

    async function loadDeleteMovie(movieId) {
        try {
            let movie = await $.ajax({
                headers: headersKinvey,
                url: BASE_URL + 'appdata' + '/' + APP_KEY + '/' + `movies/${movieId}`,
                method: 'GET',
            });

            let deleteMovieDiv = $(`
                <h1>Delete movie</h1>
                <form>
                    <label>Title</label>
                        <input type="text" name="title" value="${movie.title}" disabled="">
                    <label>Image Url</label>
                        <input type="text" name="imageUrl" value="${movie.imageUrl}"
                        disabled="">
                    <label>Description</label>
                         <textarea type="text" name="description"
                        disabled="">${movie.description}</textarea>
                    <label>Genres</label>
                        <input type="text" name="genres" value="${movie.genres}" disabled="">
                    <label>Available Tickets</label>
                        <input type="number" name="tickets" value="${movie.tickets}" disabled="">
                        <input class="delete-movie" type="submit" value="Delete">
                </form>`);
            $('#deleteMovie').append(deleteMovieDiv);

            deleteMovieDiv.find('.delete-movie').on('click', async (e) => {
                e.preventDefault();
                console.log('del');
                try {
                    await $.ajax({
                        headers: headersKinvey,
                        url: BASE_URL + 'appdata' + '/' + APP_KEY + '/' + `movies/${movieId}`,
                        method: 'DELETE',
                    });
                    console.log('after del');
                    notify.showInfo(`Movie ${movie.title} removed successfully!`);
                    setTimeout(function () {
                        $('#myMoviesBtn').click();
                    }, 1000);
                } catch (err) {
                    console.log(err);
                }
            });

        } catch (err) {
            console.log(err);
        }
    }

    async function loadEditMovie(movieId) {
        try {

            let movie = await $.ajax({
                headers: headersKinvey,
                url: BASE_URL + 'appdata' + '/' + APP_KEY + '/' + `movies/${movieId}`,
                method: 'GET',
            });

            let editMovieDiv = $(`
                <h1>Edit movie</h1>
                <form>
                    <label>Title</label>
                    <input type="text" name="title" value="${movie.title}" id="editTitle">
                    <label>Image Url</label>
                    <input type="text" name="imageUrl" id="editImage"
                           value="${movie.imageUrl}">
                    <label>Description</label>
                    <textarea type="text" id="editDescription"
                              name="description">${movie.description}</textarea>
                    <label>Genres</label>
                    <input type="text" name="genres" value="${movie.genres}" id="editGenres">
                    <label>Available Tickets</label>
                    <input type="number" name="tickets" value="${movie.tickets}" id="editTickets">
                    <input class="edit-movie" type="submit" value="Edit">
                </form>`);
            $('#editMovie').append(editMovieDiv);

            editMovieDiv.find('.edit-movie').on('click', async (e) => {
                    e.preventDefault();

                    try {

                        let title = $('#editTitle');
                        let imageUrl = $('#editImage');
                        let description = $('#editDescription');
                        let genres = $('#editGenres');
                        let tickets = $('#editTickets');

                        let editedMovie = {
                            title: title.val(),
                            imageUrl: imageUrl.val(),
                            description: description.val(),
                            genres: genres.val(),
                            tickets: tickets.val(),
                        };

                        await $.ajax({
                            headers: headersKinvey,
                            url: BASE_URL + 'appdata' + '/' + APP_KEY + '/' + `movies/${movieId}`,
                            method: 'PUT',
                            data: editedMovie
                        });
                        console.log('after del');
                        notify.showInfo(`Movie ${movie.title} edited successfully!`);
                        setTimeout(function () {
                            $('#myMoviesBtn').click();
                        }, 1000);
                    } catch (err) {
                        console.log(err);
                    }
                }
            );

        } catch (err) {
            console.log(err);
        }
    }

    $('#searchBtn').on('click', async (e) => {
        e.preventDefault();
        let genre = $('#search').val().toLowerCase();

        $('.allMovies').empty();
        try {

            let movieList = await $.ajax({
                headers: headersKinvey,
                url: BASE_URL + 'appdata' + '/' + APP_KEY + '/' + `movies?query={"genres":{"$regex":"^.*${genre}.*"}}`,
                method: 'GET',
            });

            if (!movieList.length) {
                notify.showError('No movies in this genre');
            }

            movieList
                .sort((a, b) => Number(b.tickets) - Number(a.tickets))
                .forEach((movie) => {
                    let allMovieDiv = $(`<div id=${movie._id} class="movie">
                <h1>Details</h1>
                <h2>Title: ${movie.title}</h2>
                <img src="${movie.imageUrl}">
                <p>Available Tickets: ${movie.tickets}</p>
                <button class="buy-ticket"><a>Buy Ticket</a></button>
                <button class="details"><a>Details</a></button>
            </div>`);
                    allMovieDiv.find('.buy-ticket').on('click', buyTicket);
                    allMovieDiv.find('.details').on('click', movieDetails);
                    $('.allMovies').append(allMovieDiv);
                });

        } catch (err) {
            console.log(err);
        }

    });
}