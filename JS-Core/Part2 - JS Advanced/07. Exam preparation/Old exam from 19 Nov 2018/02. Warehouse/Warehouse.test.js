const Warehouse = require('./Warehouse');
const assert = require('chai').assert;

describe('Test Warehouse', function () {
    let warehouse;
    beforeEach(function () {
        warehouse = new Warehouse(10);
    });

    describe('capacity', function () {
        it('correct capacity', function () {
            assert.equal(warehouse.capacity, 10);
        });
        it('capacity 0', function () {
            assert.throw(() => warehouse.capacity = 0, 'Invalid given warehouse space');
        });
        it('negative capacity', function () {
            assert.throw(() => warehouse.capacity = -10, 'Invalid given warehouse space');
        });
    });

    describe('addProduct( type, product, quantity )', function () {
        it('full capacity', function () {
            warehouse.addProduct('Food', 'Potatoes', 10);
            assert.throw(() => warehouse.addProduct('Food', 'Potatoes', 5), 'There is not enough space or the warehouse is already full');
        });
        it('add new product from same type to capacity', function () {
            warehouse.addProduct('Food', 'Tomatoes', 2);
            assert.deepEqual(warehouse.addProduct('Food', 'Potatoes', 4), {Potatoes: 4, Tomatoes: 2});
        });
        it('add new product from different type to capacity', function () {
            warehouse.addProduct('Food', 'Potatoes', 4);
            assert.deepEqual(warehouse.addProduct('Drink', 'Water', 2), {Water: 2});
        });
        it('add more of product to capacity', function () {
            warehouse.addProduct('Food', 'Potatoes', 4);
            assert.deepEqual(warehouse.addProduct('Food', 'Potatoes', 4), {Potatoes: 8});
        });
    });

    describe('orderProducts( type )', function () {
        it('descending order by the quantity', function () {
            warehouse.addProduct('Food', 'Tomatoes', 2);
            warehouse.addProduct('Food', 'Potatoes', 4);
            assert.deepEqual(warehouse.orderProducts('Food'), {Potatoes: 4, Tomatoes: 2});
        });
    });

    describe('occupiedCapacity()', function () {
        it('show total quantity in the warehouse', function () {
            warehouse.addProduct('Food', 'Tomatoes', 2);
            warehouse.addProduct('Food', 'Potatoes', 4);
            warehouse.addProduct('Drink', 'Water', 2);
            assert.equal(warehouse.occupiedCapacity(), 8);
        });
    });

    describe('revision()', function () {
        it('empty warehouse', function () {
            assert.equal(warehouse.revision(), 'The warehouse is empty');
        });
        it('not empty warehouse', function () {
            warehouse.addProduct('Food', 'Tomatoes', 2);
            warehouse.addProduct('Food', 'Potatoes', 4);
            warehouse.addProduct('Drink', 'Water', 2);
            assert.equal(warehouse.revision(), 'Product type - [Food]\n- Tomatoes 2\n- Potatoes 4\nProduct type - [Drink]\n- Water 2');
        });
    });

    describe('scrapeAProduct( product, quantity )', function () {
        it('scrape part of the product`s quantity', function () {
            warehouse.addProduct('Food', 'Tomatoes', 2);
            warehouse.addProduct('Food', 'Potatoes', 4);
            assert.deepEqual(warehouse.scrapeAProduct('Potatoes', 2), {Potatoes: 2, Tomatoes: 2});
        });
        it('scrape all of the product`s quantity', function () {
            warehouse.addProduct('Food', 'Tomatoes', 2);
            warehouse.addProduct('Food', 'Potatoes', 4);
            assert.deepEqual(warehouse.scrapeAProduct('Potatoes'), {Potatoes: 0, Tomatoes: 2});
        });
        it('if product do not exists in warehouse', function () {
            warehouse.addProduct('Food', 'Tomatoes', 2);
            warehouse.addProduct('Food', 'Potatoes', 4);
            assert.throw(() => warehouse.scrapeAProduct('Apple', 3), 'Apple do not exists');
        });
    });
});
