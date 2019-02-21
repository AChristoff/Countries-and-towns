let lookupChar = require('./03. lookupChar');
let assert = require('chai').assert;

describe ('Lookup for a Char', function () {

    it('should return undefined if first param is not a string', function () {
        let testInput = 20;
        let expected = lookupChar(testInput, 1);
        assert.equal(expected, undefined)
    });

    it('should return undefined if second param is not an int', function () {
        let testInput = 'ABC';
        let expected = lookupChar(testInput, 1.5);
        assert.equal(expected, undefined)
    });

    it('should return "Incorrect index" if second param is out of the string`s range', function () {
        let testInput = 'ABC';
        let expected = lookupChar(testInput, 3);
        assert.equal(expected, 'Incorrect index')
    });

    it('should return "Incorrect index" if second param < 0', function () {
        let testInput = 'ABC';
        let expected = lookupChar(testInput, -1);
        assert.equal(expected, 'Incorrect index')
    });

    it('should return character at the specified index if params are valid', function () {
        let testInput = 'ABC';
        let expected = lookupChar(testInput, 2);
        assert.equal(expected, 'C')
    });
});
