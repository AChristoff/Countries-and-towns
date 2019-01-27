function validate() {

    let button = document.querySelector('button');
    let input = document.querySelector('input');
    let output = document.querySelector('#response');

    let sum = 0;
    let result = 0;

    button.addEventListener('click', clickEvent);

    function clickEvent(event) {

            let weights = [2, 4, 8, 5, 10, 9, 7, 3, 6];

            for (let i = 0; i < weights.length; i++) {

                sum += weights[i] * +input.value[i];
            }

            if (sum % 11 === 10) {

                result = 0

            } else {

                result = sum % 11;
            }

        if (result === +input.value[9]) {

            output.textContent = 'This number is Valid!';

        } else {

            output.textContent = 'This number is NOT Valid!';
        }
    }
}