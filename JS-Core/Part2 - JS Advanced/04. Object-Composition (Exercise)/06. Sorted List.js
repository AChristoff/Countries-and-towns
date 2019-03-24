function sortedList() {
    let collection = (() => {

        let size = 0;
        let numbers = [];

        const add = function (el) {
            numbers.push(el);
            numbers.sort((a, b) => a - b);
            this.size++;
        };

        const remove =  function (index) {
            validateIndex(index);
            numbers.splice(index, 1);
            this.size--;
        };

        const get = function (index) {
            validateIndex(index);
            return numbers[index];
        };

        const validateIndex = (index) => {
            if (index < 0 || index >= numbers.length) {
                throw new RangeError('Index is out of bounds!');
            }
        };

        return {
            add,
            remove,
            get,
            size
        }

    })();

    return collection;
}

let list = sortedList();
list.add(5);
list.add(4);
list.add(3);
list.remove(1);
console.log(list.get(0));
console.log(list.size);