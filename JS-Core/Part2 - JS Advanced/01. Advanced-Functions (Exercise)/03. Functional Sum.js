let add = (function () {

    let sum = 0;

    function add(number) {
        sum += number;

        console.log(sum);
        return add;
    }

    return add;

})();


let add2 = (function () {

    function add(number) {
        let sum = 0;
        sum += number;

        console.log(sum);
        return add;
    }

    return add;

})();




add(1)(6)(-3);

