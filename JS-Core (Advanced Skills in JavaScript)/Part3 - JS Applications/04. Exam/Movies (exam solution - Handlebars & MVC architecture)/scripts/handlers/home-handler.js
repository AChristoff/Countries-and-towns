handlers.getHome = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './views/common/header.hbs',
        footer: './views/common/footer.hbs',
    }).then(function () {
        this.partial('./views/home/index.hbs')
    }).catch(err => console.log(err))

};
