class Stringer {
    constructor(_string, _length) {
        this.innerString = _string;
        this.innerLength = _length;
    }

    increase(num) {
        this.innerLength += num;
    }

    decrease(num) {
        this.innerLength -= num;
        if (this.innerLength < 0) {
            this.innerLength = 0;
        }
    }

    toString() {
        if (this.innerLength < this.innerString.length) {
            let newString = this.innerString.slice(0, this.innerLength);
            return `${newString}...`
        }
        return `${this.innerString}`
    }
}

let test = new Stringer("Viktor", 6);

console.log(test.toString()); //Test
test.decrease(3);
console.log(test.toString()); //Te...
