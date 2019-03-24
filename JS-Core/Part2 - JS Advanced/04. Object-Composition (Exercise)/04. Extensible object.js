function solve() {

    let myObj = {
        extend: function (template) {
            const entries = Object.entries(template);
            for (let [key, value] of entries) {
                if (typeof value === 'function') {
                    Object.getPrototypeOf(this)[key] = value;
                } else {
                    this[key] = value;
                }
            }
        }
    };

    return myObj;
}

let obj = solve();
console.log(Object.getPrototypeOf(obj));
console.log(obj);

obj.extend({
    method: function test() {
        console.log('Test');
    },
    property: 'someString'
});

console.log(Object.getPrototypeOf(obj));
console.log(obj);