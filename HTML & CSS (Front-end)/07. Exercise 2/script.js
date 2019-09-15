const difference = (a, b) => {
    let s = a.filter(x => !b.includes(x));
    let z = b.filter(x => !a.includes(x));
    let c = [8];
    return s.concat(z, c);
};

console.log(difference([1, 2, 3], [1, 2, 4, 5]));

const obj = {
    a: 1,
    b: 2,
    z: {alpha: 1}
};

let newObj = {...obj};
newObj.c = 8;
newObj.z.alpha = 12;
let newObj2 = Object.assign({}, obj);
newObj2.c = 10;
newObj2.z.alpha = 3;

let arr = [1, 3, 18];
let newArr = [...arr];
newArr.push(200);
let newArr2 = arr.map((x) => x);
newArr2.push(5);


console.log(arr);
console.log(newArr);
console.log(newArr2);

console.log(obj);
console.log(newObj);
console.log(newObj2);