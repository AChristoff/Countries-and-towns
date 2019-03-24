class SortedList {
    constructor() {
        this.list = [];
        this.size = 0;
    }

    add(element) {
        this.list.push(element);
        this.size++;
        this.sort();
    }

    remove(index) {
        if (index >= 0 && index < this.size) {
            this.list.splice(index, 1);
            this.size--;
            this.sort();
        } else {
            throw new Error('Index is out of bounds')
        }
    }

    get(index) {
        return this.list[index];
    }

    sort() {
        return this.list = this.list.sort((a, b) => a - b);
    }
}


let list1 = new SortedList();
list1.add(6);
list1.add(4);
list1.add(5);
list1.remove(1);
console.log(list1);