const Calculator = require('./Calculator');
const assert = require('chai').assert;

describe('Calculator', function () {

    let calculator;

    beforeEach(function () {
        calculator = new Calculator();
    });

    it('Should be not empty Array', function () {
        assert.isArray(calculator.expenses);
        assert.isEmpty(calculator.expenses);
    });

    describe('add()', function () {
        it('Add primitive Types to the Array', function () {
            calculator.add(5);
            calculator.add(1.5);
            calculator.add('text');
            calculator.add(true);

            assert.deepEqual(calculator.expenses, [5, 1.5, 'text', true]);
        });

        it('Add reference Types to the Array', function () {
            calculator.add([1]);
            calculator.add({key: 'value'});

            assert.deepEqual(calculator.expenses, [[1], {key: 'value'}]);
        });
    });

    describe('divideNums()', function () {
        it('divide integers data in Array', function () {
            calculator.add(8);
            calculator.add(2);
            calculator.add(2);

            assert.equal(calculator.divideNums(), [2]);
        });

        it('divide floating data in Array', function () {
            calculator.add(8.5);
            calculator.add(2);

            assert.closeTo(calculator.divideNums(), 4.26, 0.01);
        });

        it('divide by zero data in Array', function () {
            calculator.add(10);
            calculator.add(0);

            assert.equal(calculator.divideNums(), 'Cannot divide by zero');
        });

        it('divide empty Array', function () {

            assert.throw(() => calculator.divideNums(), 'There are no numbers in the array!');
        });

        it('divide no num Array', function () {
            calculator.add('A');
            calculator.add([true, false]);

            assert.throw(() => calculator.divideNums(), 'There are no numbers in the array!');
        });
    });

    describe('toString()', function () {
        it('full Array', function () {
            calculator.add(5);
            calculator.add('A');
            calculator.add(100);

            assert.equal(calculator.toString(), '5 -> A -> 100');
        });

        it('empty Array', function () {
            assert.equal(calculator.toString(), 'empty array');
        });
    });

    describe('orderBy()', function () {
        it('sort Numbers', function () {
            calculator.add(12);
            calculator.add(8);
            calculator.add(10);
            calculator.add(4);

            let result = calculator.expenses.sort((a, b) => a - b).join(', ');

            assert.deepEqual(calculator.orderBy(), result);
        });
    });

    describe('orderBy()', function () {
        it('sort Mixed', function () {
            calculator.add('Z');
            calculator.add('A');
            calculator.add(1);
            calculator.add(-10);

            let result = calculator.expenses.map((x) => String(x)).sort((a, b) => a.localeCompare(b)).join(', ');

            assert.deepEqual(calculator.orderBy(), result);
        });
    });
});

