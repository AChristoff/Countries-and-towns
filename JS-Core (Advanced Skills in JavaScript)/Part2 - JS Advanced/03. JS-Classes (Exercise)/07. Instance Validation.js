class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get clientId() {
        return this._clientId;
    }

    set clientId(id) {
        let idRdx = /^[\d]{6}$/g;

        if (typeof id === 'string' && idRdx.test(+id)) {
            this._clientId = id;
        } else {
            throw TypeError('Client ID must be a 6-digit number');
        }
    }

    get email() {
        return this._email;
    }

    set email(mail) {
        let mailRdx = /^[\w]+@[A-Za-z.]+$/g;

        if (mailRdx.test(mail)) {
            this._email = mail;
        } else {
            throw TypeError('Invalid e-mail');
        }
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(name) {
        this._firstName = this.validateNames('First', name);
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(name) {
        this._lastName = this.validateNames('Last', name);
    }

    validateNames(position, name) {
        let nameRdx = /^[A-Za-z]{3,20}$/g;

        if (nameRdx.test(name)) {
            return name;
        } else if (name.length < 3 || name.length > 20) {
            throw TypeError(`${position} name must be between 3 and 20 characters long`);
        } else {
            throw TypeError(`${position} name must contain only Latin characters`);
        }
    }
}

let checkingAccount1 = new CheckingAccount('123456', 'alex@abv.com', 'Alex', 'Hristov');
console.log(checkingAccount1);