let isOddOrEven = require('./02. oddOrEven');
let assert = require('chai').assert;
let expect = require('chai').expect;

describe('Even or Odd', function () {
    it('should return undefined if we pass a number', function () {
        let number = 20;
        let expected = isOddOrEven(number);
        expect(expected).to.be.equal(undefined);
    });
    it('should return "even" if we pass a string with even length', function () {
        let string = 'Alex';
        let expected = isOddOrEven(string);
        expect(expected).equal('even');
    });
    it('should return "odd" if we pass a string with odd length', function () {
        let string = 'Alexi';
        let expected = isOddOrEven(string);
        assert.equal(expected, 'odd');
    });
});