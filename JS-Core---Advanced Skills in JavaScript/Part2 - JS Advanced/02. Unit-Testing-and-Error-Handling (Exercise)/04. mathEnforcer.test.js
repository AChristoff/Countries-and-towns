let mathEnforcer = require('./04. mathEnforcer');
let assert = require('chai').assert;

describe('mathEnforcer', function () {

    describe('addFive', function () {
        it('should return undefined if addFive param is NaN', function () {
            let param = '5';
            let expected = mathEnforcer.addFive(param);
            assert.equal(expected, undefined);
        });
        it('should return addFive param + 5', function () {
            let param = 5;
            let expected = mathEnforcer.addFive(param);
            assert.equal(expected, 10);
        });
        it('should return the sumNumbers of addFive negative param + 5', function () {
            let param = -5;
            let expected = mathEnforcer.addFive(param);
            assert.equal(expected, 0);
        });
        it('should return the sumNumbers of addFive float param + 5 (+- 0.01)', function () {
            let param = 1.02;
            let expected = mathEnforcer.addFive(param);
            assert.closeTo(expected, 6.02, 0.01)
        });
    });

    describe('subtractTen', function () {
        it('should return undefined if subtractTen param is NaN', function () {
            let param = '10';
            let expected = mathEnforcer.subtractTen(param);
            assert.equal(expected, undefined);
        });
        it('should return subtractTen param - 10', function () {
            let param = 10;
            let expected = mathEnforcer.subtractTen(param);
            assert.equal(expected, 0);
        });
        it('should return the sumNumbers of subtractTen negative param - 10', function () {
            let param = -10;
            let expected = mathEnforcer.subtractTen(param);
            assert.equal(expected, -20);
        });
        it('should return the sumNumbers of subtractTen float param - 10 (+- 0.01)', function () {
            let param = 10.02;
            let expected = mathEnforcer.subtractTen(param);
            assert.closeTo(expected, 0.02, 0.01)
        });
    });

    describe('sumNumbers', function () {
        it('should return undefined if the firstParam of sumNumbers is NaN', function () {
            let firstParam = '5';
            let expected = mathEnforcer.sumNumbers(firstParam, 10);
            assert.equal(expected, undefined);
        });
        it('should return undefined if the secondParam of sumNumbers is NaN', function () {
            let secondParam = '10';
            let expected = mathEnforcer.sumNumbers(5, secondParam);
            assert.equal(expected, undefined);
        });
        it('should return the sum of firstParam and secondParam', function () {
            let firstParam = 5;
            let secondParam = 10;
            let expected = mathEnforcer.sumNumbers(firstParam, secondParam);
            assert.equal(expected, 15);
        });
        it('should return floating point sum if firstParam is float (+- 0.01)', function () {
            let firstParam = 5.02;
            let secondParam = 10;
            let expected = mathEnforcer.sumNumbers(firstParam, secondParam);
            assert.closeTo(expected, 15.02, 0.01);
        });
        it('should return floating point sum if secondParam is float (+- 0.01)', function () {
            let firstParam = 5;
            let secondParam = 10.02;
            let expected = mathEnforcer.sumNumbers(firstParam, secondParam);
            assert.closeTo(expected, 15.02, 0.01);
        });
    });
});
