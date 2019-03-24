function solve() {

    let seatButtons = Array.from(document.querySelectorAll('.seat')).forEach((btn) => btn.addEventListener('click', selectSeat));
    let output = document.querySelector('#output');

    let seatsInfo = {
        'Levski': {'A': 10, 'B': 7, 'C': 5},
        'Litex': {'A': 10, 'B': 7, 'C': 5},
        'VIP': {'A': 25, 'B': 15, 'C': 10},
        'results': {'profit': 0, 'soldTickets': 0}
    };

    function selectSeat(e) {
        let seat = e.target;
        let zone = seat.parentElement.parentElement.parentElement.parentElement.parentElement.className;
        let sector = String.fromCharCode(65 + seat.parentElement.cellIndex);

        if (!seat.style.backgroundColor) {
            seat.style.backgroundColor = 'rgb(255,0,0)';
            seatsInfo.results.profit += seatsInfo[zone][sector];
            seatsInfo.results.soldTickets++;
            output.value += ` Seat ${seat.textContent} in zone ${zone} sector ${sector} was taken.\n`
        } else {
            output.value += ` Seat ${seat.textContent} in zone ${zone} sector ${sector} is unavailable.\n`
        }
    }

    let summaryBtn = document.querySelector('#summary button').addEventListener('click', showResult => {
        let spanElement = document.querySelector('#summary span');
        spanElement.textContent = `${seatsInfo.results.profit} leva, ${seatsInfo.results.soldTickets} fans.`;
    });
}