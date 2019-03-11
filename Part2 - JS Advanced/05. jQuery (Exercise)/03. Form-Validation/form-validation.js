function validate() {

    let username = $('#username');
    let email = $('#email');
    let password = $('#password');
    let confirmPassword = $('#confirm-password');
    let companyInfo = $('#companyInfo');

    let isCompany = $('#company');

    isCompany.on('click', function () {
        if (companyInfo.css('display') === 'none') {
            companyInfo.css('display', 'block');
        } else {
            companyInfo.css('display', 'none');
        }
    });

    let submitBtn = $('#submit');

    submitBtn.on('click', function (e) {
        e.preventDefault();

        $('#valid').css('display', 'none');

        let isValid = true;

        let nameRgx = /^[A-Za-z0-9]{3,20}$/g;
        let emailRgx = /^(.+)?@(.+)?(.)(.+)?$/g;
        let passwordRgx = /^.{5,15}$/g;
        let companyIdRgx = / /g;

        if (!nameRgx.test(username.val())) {
            username.attr('style', 'border-color: red');
            isValid = false;
        } else {
            username.attr('style', 'none');
        }

        if (!emailRgx.test(email.val())) {
            email.attr('style', 'border-color: red');
            isValid = false;
        } else {
            email.attr('style', 'none');
        }

        if (password.val() === confirmPassword.val()) {
            if (!passwordRgx.test(password.val())) {
                password.attr('style', 'border-color: red');
                isValid = false;
            } else {
                password.attr('style', 'none');
                confirmPassword.attr('style', 'none');
            }
        } else {
            password.attr('style', 'border-color: red');
            confirmPassword.attr('style', 'border-color: red');
        }

        if (companyInfo.css('display') === 'block') {
            //TODO
        }



        if (isValid) {
            $('#valid').css('display', 'block');
        }
    });
}
