(function () {
    String.prototype.ensureStart = function (substring) {
        if (!this.startsWith(substring)) {
            return `${substring}${this}`
        }
        return this.toString();
    };

    String.prototype.ensureEnd = function (substring) {
        if (!this.endsWith(substring)) {
            return `${this}${substring}`
        }
        return this.toString();
    };

    String.prototype.isEmpty = function () {
        return this.length <= 0;
    };

    String.prototype.truncate = function (n) {
        if (n < 4) {
            return '.'.repeat(n);
        }

        if (n >= this.length) {
            return this.toString();
        }

        const lastIndexOfSpace = this.toString().substr(0, n - 2).lastIndexOf(' ');

        if (lastIndexOfSpace !== -1) {
            return this.substr(0, lastIndexOfSpace) + '...';
        } else {
            return this.substr(0, n - 3) + '...';
        }

    };

    String.format = function (string, ...args) {
        for (let i = 0; i < args.length; i++) {
            string = string.replace(`{${i}}`, args[i]);
        }
        return string
    }
})();

let str = 'my string';
console.log(str = str.ensureStart('my'));
console.log(str = str.ensureStart('hello '));
console.log(str = str.truncate(16));
console.log(str = str.truncate(14));
console.log(str = str.truncate(8));
console.log(str = str.truncate(4));
console.log(str = str.truncate(2));
console.log(str = String.format('The {0} {1} fox',
    'quick', 'brown'));
console.log(str);