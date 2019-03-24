function manageTickets(ticketsInfo, sortCriteria) {

    let ticketsList = [];

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    ticketsInfo = ticketsInfo.map((x) => x.split('|'));

    if (sortCriteria === 'destination') {
        ticketsInfo = ticketsInfo.sort((a, b) => a[0].localeCompare(b[0]));
    } else if (sortCriteria === 'price') {
        ticketsInfo = ticketsInfo.sort((a, b) => a[1] - b[1]);
    } else if (sortCriteria === 'status') {
        ticketsInfo = ticketsInfo.sort((a, b) => a[2].localeCompare(b[2]));
    }

    for (let info of ticketsInfo) {
        ticketsList.push(new Ticket(info[0], +info[1], info[2]))
    }

    return ticketsList;
}

console.log(manageTickets(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'destination'));
