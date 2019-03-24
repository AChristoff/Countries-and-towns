function solve() {

    let button = document.querySelector('#exercise button').addEventListener('click', clicked);
    let [handStart, handEnd] = document.querySelectorAll('#exercise input');
    let suitSelector = document.querySelectorAll('#exercise select option');
    let output = document.querySelector('#cards');
    let cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let symbol;

    function clicked() {

        for (const suit of suitSelector) {
            if (suit.selected) {
                symbol = suit.textContent.split(' ')[1];
            }
        }

        let startIndex = cards.indexOf(handStart.value);
        let endIndex = cards.indexOf(handEnd.value);

        let hand = cards.slice(startIndex, endIndex + 1);


        for (const card of hand) {

            let divElement = document.createElement('div');
            divElement.className = 'card';
            let firstPar = document.createElement('p');
            firstPar.textContent = symbol;
            let secondPar = document.createElement('p');
            secondPar.textContent = card;
            let thirdPar = document.createElement('p');
            thirdPar.textContent = symbol;

            divElement.appendChild(firstPar);
            divElement.appendChild(secondPar);
            divElement.appendChild(thirdPar);

            output.appendChild(divElement);

        }

    }

}

