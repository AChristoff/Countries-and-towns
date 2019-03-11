let newArrayFunctionality = (function () {
    Array.prototype.last = function () {
        return this[this.length - 1]
    };

    Array.prototype.skip = function (n) {
        return this.slice(n)
    };

    Array.prototype.take = function (n) {
        return this.slice(0, n)
    };

    Array.prototype.sum = function () {
        return this.reduce((a, b) => a + b, 0)
    };

    Array.prototype.average = function () {
        return this.reduce((a, b) => a + b, 0) / this.length;
    };
})();


console.log([1, 2, 3, 7, 8].last());
console.log([1, 2, 3, 7, 8].skip(3));
console.log([1, 2, 3, 7, 8].take(3));
console.log([1, 2, 3, 7, 8].sum());
console.log([1, 2, 3, 7, 8].average());