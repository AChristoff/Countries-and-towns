function leapYear() {

    let button = document.querySelector('button');
    let inputYear = document.querySelector('input');
    let h2ElementText = document.querySelector('h2');
    let divElement = document.querySelector('#year div');

    button.addEventListener('click', clickEvent);

    function clickEvent(event) {

        console.log(inputYear.value);

        if (inputYear.value % 4 === 0 && inputYear.value % 100 !== 0) {

             h2ElementText.textContent = 'Leap Year';
             divElement.textContent = inputYear.value;


        } else if (inputYear.value % 400 === 0) {

            h2ElementText.textContent = 'Leap Year';
            divElement.textContent = inputYear.value;

        } else {

            h2ElementText.textContent = 'Not Leap Year';
            divElement.textContent = inputYear.value;
        }

        inputYear.value = '';
    }
}