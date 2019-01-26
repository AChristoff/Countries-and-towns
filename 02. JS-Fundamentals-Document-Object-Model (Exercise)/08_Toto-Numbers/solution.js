function solve() {

    let getNumbersBtn = document.getElementsByTagName('button')[0];
    getNumbersBtn.addEventListener('click', event);

    function event() {
        let input = document.getElementsByTagName('input')[0].value;
        let numbers = input.split(' ').map(Number);

        for (let num of numbers) {
            if (num < 1 || num > 49) {
                return;
            }
        }

        if (numbers.length !== 6) {
            return;
        }

        let allNumbersDiv = document.getElementById('allNumbers');

        for (let i = 1; i <= 49; i++) {
            let currentDiv = document.createElement('div');
            currentDiv.textContent = i;
            currentDiv.setAttribute('class', 'numbers');

            for (let num of numbers ) {
                if(num === +currentDiv.textContent) {
                    currentDiv.style.background = 'orange';
                }
            }

            allNumbersDiv.appendChild(currentDiv);
        }

        //getNumbersBtn.removeEventListener('click', event);
          getNumbersBtn.disabled = true;
        document.getElementsByTagName('input')[0].disabled = true;
    }
}