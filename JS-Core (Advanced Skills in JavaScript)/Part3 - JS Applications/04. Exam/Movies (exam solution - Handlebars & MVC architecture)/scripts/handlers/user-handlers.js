// REGISTER

handlers.getRegister = function (context) {
    context.loadPartials({
        header: './views/common/header.hbs',
        footer: './views/common/footer.hbs'
    }).then(function () {
        this.partial('./views/user/register.hbs')
    }).catch((err) => console.log(err));
};

handlers.postRegister = function (context) {
    let username = context.params.username;
    let password = context.params.password;
    let repeatPassword = context.params.repeatPassword;
    if (password !== repeatPassword) {
        notify.showError('Passwords don`t match!');
        return
    }

    if (username.length < 3) {
        return notify.showError('Username must be more than two characters long')
    } else if (password.length < 6) {
        return notify.showError('Password must be more than five characters long')
    }

    userService
        .register(username, password)
        .then((res) => {
            userService.saveSession(res);
            context.redirect('#/home');
            notify.showInfo('User registration successful.');
        }).catch((err) => {
        notify.showError(err.responseJSON.description)
    });
};

// LOGIN

handlers.getLogin = function (context) {
    context.loadPartials({
        header: './views/common/header.hbs',
        footer: './views/common/footer.hbs'
    }).then(function () {
        this.partial('./views/user/login.hbs')
    }).catch((err) => console.log(err));
};

handlers.postLogin = function (context) {
    let username = context.params.username;
    let password = context.params.password;
    userService
        .login(username, password)
        .then((res) => {
            userService.saveSession(res);
            context.redirect('#/home');
            notify.showInfo('Login successful.');
        }).catch((err) => {
        console.log(err);
        notify.showError(err.responseJSON.description);
    });
};

// LOGOUT

handlers.getLogout = function (context) {
    userService
        .logout()
        .then(() => {
            sessionStorage.clear();
            context.redirect('#/login');
            notify.showInfo('Logout successful.');
        }).catch((err) => console.log(err));
};