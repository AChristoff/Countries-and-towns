function solve() {

    let allSeats = Array.from(document.querySelectorAll('tbody button'));
    let output = document.querySelector('#output');

    let fansCounter = 0;
    let profit = 0;

    let secotrsA = seatsBySector(allSeats, 0);
    let secotrsB = seatsBySector(allSeats, 1);
    let secotrsC = seatsBySector(allSeats, 2);

    reserveAndCollect(secotrsA, 'A');
    reserveAndCollect(secotrsB, 'B');
    reserveAndCollect(secotrsC, 'C');

    function seatsBySector(seats, indexManipulator) {
        let sector = seats.reduce((acc, seat, idx) => {
            if ((idx - indexManipulator) % 3 === 0) {
                acc.push(seat);
            }
            return acc;
        }, []);

        let sectors = [];
        spliceAndPush('zoneLevski');
        spliceAndPush('zoneLitex');
        spliceAndPush('zoneVIP');

        function spliceAndPush(zone) {
            zone = sector.splice(0, 5);
            sectors.push(zone);
        }
        return sectors
    }
    function reserveAndCollect(seatsBySector, sector) {

        let zones = ['Levski', 'Litex', 'VIP'];
        let prices = {'A': [10, 10, 25], 'B': [7, 7, 15], 'C': [5, 5, 10]};

        for (let i = 0; i < 3; i++) {

            seatsBySector[i].forEach((x) => x.addEventListener('click', () => {

                if (!x.style.backgroundColor) {
                    x.style.backgroundColor = 'rgb(255,0,0)';
                    profit += prices[`${sector}`][i];
                    fansCounter++;
                    output.value += ` Seat ${x.textContent} in zone ${zones[i]} sector ${sector} was taken.\n`
                } else {
                    output.value += ` Seat ${x.textContent} in zone ${zones[i]} sector ${sector} is unavailable.\n`
                }
            }));
        }
    }

    let summaryBtn = document.querySelector('#summary button').addEventListener('click', showResult => {
        let spanElement = document.querySelector('#summary span');
        spanElement.textContent = `${profit} leva, ${fansCounter} fans.`;
    });
}