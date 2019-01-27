function solve() {

    let number = document.querySelector('#exercise > input');
    let output = document.querySelector('#exercise > #output');
    let num = 0;
    let [chopElement, diceElement, spliceElement, bakeElement, filletElement] = document.querySelectorAll('#operations > button');

    function getCurrentNumber() {
        num = +(output.textContent) || number.value;
        return num;
    }

    function addEvents() {

        let chopBtn = chopElement.addEventListener('click', chop);

        let diceBtn = diceElement.addEventListener('click', dice);

        let sliceBtn = spliceElement.addEventListener('click', splice);

        let bakeBtn = bakeElement.addEventListener('click', bake);

        let filletBtn = filletElement.addEventListener('click', fillet);
    }

    addEvents();

    function chop() {
        getCurrentNumber();
        num /=2;
        output.textContent = String(num);
    }

    function dice() {
        getCurrentNumber();
        num = Math.sqrt(num);
        output.textContent = String(num);
    }

    function splice() {
        getCurrentNumber();
        num = ++num;
        output.textContent = String(num);
    }

    function bake() {
        getCurrentNumber();
        num *= 3;
        output.textContent = String(num);
    }

    function fillet() {
        getCurrentNumber();
        num *= 0.8;
        output.textContent = String(num);
    }
}