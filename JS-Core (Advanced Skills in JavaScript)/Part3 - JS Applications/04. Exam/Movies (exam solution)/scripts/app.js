const handlers = {};

$(() => {
    const app = Sammy('#root', function () {
        // load Handlebars
        this.use('Handlebars', 'hbs');

        // HOME -------------------------------------

        // home page routes
        this.get('index.html', handlers.getHome);
        this.get('#/home', handlers.getHome);
        this.get('#', handlers.getHome);
        this.get('/', handlers.getHome);

        // USER -------------------------------------

        // register page routes
        this.get('#/register', handlers.getRegister);
        this.post('#/register', handlers.postRegister);

        // login page routes
        this.get('#/login', handlers.getLogin);
        this.post('#/login', handlers.postLogin);

        // logout page routs
        this.get('#/logout', handlers.getLogout);

        // MOVIES -------------------------------------

        this.get('#/allMovies', handlers.getAllMovies);
        this.get('#/myMovies', handlers.getMyMovies);

        // create page routes
        this.get('#/addMovie', handlers.getCreateMovie);
        this.post('#/addMovie', handlers.postCreateMovie);

        // edit routs
        this.get('#/removeMovie/:id', handlers.getRemoveMovie);
        this.post('#/removeMovie/:id', handlers.postRemoveMovie);

        this.get('#/editMovie/:id', handlers.getEditMovie);
        this.post('#/editMovie/:id', handlers.postEditMovie);

        this.get('#/buyMovieTicket(/:location/:id)', handlers.getMovieTicket);

        // details rout
        this.get('#/detailsMovie/:id', handlers.getDetailsMovie);

        // search rout
        this.get('#/allMovies(/:genre)', handlers.getGenre);

    });
    app.run('#/home');
});
