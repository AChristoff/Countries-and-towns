function flights(input) {

    console.log(input.length); 

    let names = 'Alex';

    

    let [action, city, time, flightNum, gate] = input;

    console.log(`${action}: Destination - ${city}, Flight - ${flightNum}, Time - ${time}, Gate - ${gate}`);


}

flights([ 'Departures', 'London', '22:45', 'BR117', '42' ]);