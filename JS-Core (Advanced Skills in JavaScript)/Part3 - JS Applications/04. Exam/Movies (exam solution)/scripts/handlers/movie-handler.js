handlers.getAllMovies = function (context) {

    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');
    let userID = sessionStorage.getItem('userID');

    movieService.getAllMovies()
        .then((res) => {

            res.forEach((movie) => {
                movie.isCreator = movie._acl.creator === userID;
            });

            context.movies = movieService.sortMovies(res);

            context.loadPartials({
                header: './views/common/header.hbs',
                footer: './views/common/footer.hbs',
                movie: './views/movie/allMovie.hbs',
            }).then(function () {
                this.partial('./views/movie/allMovies.hbs')
            });
        })
};

handlers.getGenre = function (context) {

    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');
    let genre = context.params.search.toLowerCase();

    movieService.getGenre(genre)
        .then((res) => {

            context.movies = movieService.sortMovies(res);

            context.loadPartials({
                header: './views/common/header.hbs',
                footer: './views/common/footer.hbs',
                movie: './views/movie/allMovie.hbs',
            }).then(function () {
                this.partial('./views/movie/allMovies.hbs')
            });
        })

};

handlers.getMyMovies = function (context) {

    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');
    let userID = sessionStorage.getItem('userID');

    console.log(userID);

    movieService.getMyMovies(userID)
        .then((res) => {
            console.log(res);
            res.forEach((song) => {
                song.isCreator = song._acl.creator === userID;
            });

            context.movies = movieService.sortMovies(res);

            context.loadPartials({
                header: './views/common/header.hbs',
                footer: './views/common/footer.hbs',
                movie: './views/movie/myMovie.hbs',
            }).then(function () {
                this.partial('./views/movie/myMovies.hbs')
            });

        })

};

handlers.getCreateMovie = function (context) {

    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './views/common/header.hbs',
        footer: './views/common/footer.hbs',
    }).then(function () {
        this.partial('./views/movie/createMovie.hbs')
    });

};

handlers.postCreateMovie = function (context) {

    let title = context.params.title;
    let description = context.params.description;
    let imageUrl = context.params.imageUrl;
    let tickets = Number(context.params.tickets);
    let genres = context.params.genres.toLowerCase();

    if (title.length < 6) {
        return notify.showError('Title must be more than 5 characters long')
    } else if (description.length < 10) {
        return notify.showError('Description must be more than 9 characters long')
    } else if (!imageUrl.startsWith('http')) {
        return notify.showError('Link must start with "http://" or "https://"')
    } else if (typeof tickets !== 'number') {
        return notify.showError('Available Tickets must ne a number!')
    } else if (genres === '') {
        return notify.showError('Genre is required!')
    }

    movieService.createMovie({...context.params, genres})
        .then(() => {
            notify.showInfo('Movie created successfully.');
            context.redirect('#/myMovies');
        });
};

handlers.getRemoveMovie = function (context) {

    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');
    let movieID = context.params.id;

    movieService.getMovie(movieID)
        .then(function (res) {

            context._id = movieID;
            context.title = res.title;
            context.description = res.description;
            context.imageUrl = res.imageUrl;
            context.tickets = res.tickets;
            context.genres = res.genres;

            context.loadPartials({
                header: './views/common/header.hbs',
                footer: './views/common/footer.hbs'
            })
                .then(function () {

                    this.partial('./views/movie/deleteMovie.hbs');
                })
                .catch(function (error) {
                    notify.handleError(error);
                })
        })
        .catch(function (error) {
            notify.handleError(error);
        })
};

handlers.postRemoveMovie = function (context) {
    let movieID = context.params.id;

    movieService.removeMovie(movieID)
        .then(() => {
            notify.showInfo('Movie removed successfully!');
            context.redirect('#/myMovies');
        });
};

handlers.getMovieTicket = function (context) {
    let movieID = context.params.id;
    let location = context.params.splat[0];

    console.log(movieID);
    console.log(location);
    movieService.getMovie(movieID)
        .then(function (res) {

            let movieName = res.title;

            //Edin old params --------------------------
            let updatedMovieObj = res;

            if (Number(updatedMovieObj.tickets) < 1) {
               notify.showError(`No available tickets for ${movieName}!`);
                if (location === 'detailsMovie') {
                    return context.redirect(`#/${location}/${movieID}`);
                } else {
                    return context.redirect(`#/${location}`);
                }
            }

            let remainingTickets = Number(updatedMovieObj.tickets) - 1;
            //Set new params ---------------------------
            updatedMovieObj.tickets = remainingTickets;
            //--------------------------------------

            movieService.editMovie(movieID, updatedMovieObj)
                .then(function () {
                    notify.showInfo(`Successfully bought ticket for ${movieName}!`);
                    if (location === 'detailsMovie') {
                        context.redirect(`#/${location}/${movieID}`);
                    } else {
                        context.redirect(`#/${location}`);
                    }
                })
                .catch(function (err) {
                    notify.showError(err);
                })
        });
};

handlers.getDetailsMovie = function (context) {

    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');
    let movieID = context.params.id;

    movieService.getMovie(movieID)
        .then(function (res) {

            context._id = movieID;
            context.title = res.title;
            context.description = res.description;
            context.imageUrl = res.imageUrl;
            context.tickets = res.tickets;
            context.genres = res.genres;

            context.loadPartials({
                header: './views/common/header.hbs',
                footer: './views/common/footer.hbs'
            })
                .then(function () {

                    this.partial('./views/movie/detailsMovie.hbs');
                })
                .catch(function (error) {
                    notify.handleError(error);
                })
        })
        .catch(function (error) {
            notify.handleError(error);
        })
};

handlers.getEditMovie = function (context) {

    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');
    let movieID = context.params.id;

    movieService.getMovie(movieID)
        .then(function (res) {

            context._id = movieID;
            context.title = res.title;
            context.description = res.description;
            context.imageUrl = res.imageUrl;
            context.tickets = res.tickets;
            context.genres = res.genres;

            context.loadPartials({
                header: './views/common/header.hbs',
                footer: './views/common/footer.hbs'
            })
                .then(function () {

                    this.partial('./views/movie/editMovie.hbs');
                })
                .catch(function (error) {
                    notify.handleError(error);
                })
        })
        .catch(function (error) {
            notify.handleError(error);
        })
};

handlers.postEditMovie = function (context) {
    let movieID = context.params.id;
    let movieName = context.params.title;

    movieService.editMovie(movieID, {...context.params})
        .then(() => {
            notify.showInfo(`${movieName} was edited successfully!`);
            context.redirect('#/myMovies');
        });
};