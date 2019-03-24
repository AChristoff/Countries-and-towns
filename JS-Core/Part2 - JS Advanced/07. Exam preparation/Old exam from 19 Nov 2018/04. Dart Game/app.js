function dart() {

    let dartArea = $('#firstLayer');
    let home = $('#Home p:nth-child(2)');
    let away = $('#Away p:nth-child(2)');
    let onTurn = $('#turns p:first-child');
    let nextTurn = $('#turns p:nth-child(2)');
    let points = $('tbody td:odd')
        .toArray()
        .map(x => +x.textContent.split(' ')[0])
        .filter(Boolean);
    let [greenPoints, yellowPoints, orangePoints, redPoints, purplePoints, bluePoints] = points;
    let homeScore = $('#Home p:first-child');
    let awayScore = $('#Away p:first-child');

    dartArea.on('click', shot);

    function shot(e) {
        e.stopPropagation();
        if (e.target.id === 'firstLayer') {
            addPoints(greenPoints);
        } else if (e.target.id === 'secondLayer') {
            addPoints(yellowPoints);
        } else if (e.target.id === 'thirdLayer') {
            addPoints(orangePoints);
        } else if (e.target.id === 'fourthLayer') {
            addPoints(redPoints);
        } else if (e.target.id === 'fifthLayer') {
            addPoints(purplePoints);
        } else if (e.target.id === 'sixthLayer') {
            addPoints(bluePoints);
        }

        if (+$('#Home p:first-child').text() >= 100) {
            home.attr('style', 'background: green');
            away.attr('style', 'background: red');
            dartArea.off();
            return
        } else if (+$('#Away p:first-child').text() >= 100) {
            home.attr('style', 'background: red');
            away.attr('style', 'background: green');
            dartArea.off();
            return
        }

        turnsCounter();
    }

    function addPoints(points) {
        if (onTurn.text().slice(-4) === 'Home') {
            homeScore.text(+homeScore.text() + points)
        } else {
            awayScore.text(+awayScore.text() + points)
        }
    }

    function turnsCounter() {
        if (onTurn.text() === 'Turn on Away') {
            onTurn.text('Turn on Home');
            nextTurn.text('Next is Away');
        } else {
            onTurn.text('Turn on Away');
            nextTurn.text('Next is Home');
        }
    }
}