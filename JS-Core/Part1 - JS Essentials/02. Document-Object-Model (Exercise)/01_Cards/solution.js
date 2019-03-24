function solve() {
    Array.from(document.getElementsByTagName('img'))
        .forEach((img) => {
            img.addEventListener('click', clickEvent);
        });

    function clickEvent(e) {
        let card = e.target;
        card.src = './images/whiteCard.jpg';
        card.removeEventListener('click', clickEvent);
        let parent = card.parentNode;

        let spans = document.getElementById('result').children;

        let leftCard = spans[0];
        let rightCard = spans[2];

        if (parent.id === 'player1Div') {
            leftCard.textContent = card.name;

        } else if (parent.id === 'player2Div') {
            rightCard.textContent = card.name;
        }

        if (leftCard.textContent && rightCard.textContent) {
            let winner;
            let looser;

            if (+leftCard.textContent > +rightCard.textContent) {

                winner = document.querySelector(`#player1Div img[name="${leftCard.textContent}"]`);
                looser = document.querySelector(`#player2Div img[name="${rightCard.textContent}"]`);

            } else {

                looser = document.querySelector(`#player1Div img[name="${leftCard.textContent}"]`);
                winner = document.querySelector(`#player2Div img[name="${rightCard.textContent}"]`);

            }

            winner.style.border = '2px solid green';
            looser.style.border = '2px solid darkred';

            document.getElementById('history').textContent += `[${leftCard.textContent} vs ${rightCard.textContent}] `;

            setTimeout(function () {
                leftCard.textContent = '';
                rightCard.textContent = '';
            }, 2000)
        }
    }
}

  