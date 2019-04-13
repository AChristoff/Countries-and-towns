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

        // SONGS -------------------------------------

        this.get('#/allSongs', handlers.getAllSongs);
        this.get('#/mySongs', handlers.getMySongs);

        // create page routes
        this.get('#/createSong', handlers.getCreateSong);
        this.post('#/createSong', handlers.postCreateSong);

        // edit routs
        this.get('#/removeSong/:id', handlers.getRemoveSong);
        this.get('#/likeSong/:id', handlers.getLikeSong);
        this.get('#/listenSong/:id', handlers.getListenSong);

    });
    app.run('#/home');
});
