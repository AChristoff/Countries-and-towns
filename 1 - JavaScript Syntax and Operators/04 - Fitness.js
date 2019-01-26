function fitness(day, service, time) {

    if (service === 'Fitness') {

        if (day === 'Saturday' || day === 'Sunday') {

            console.log(8.0);

        } else if (time > 15 && time <= 22) {

            console.log(7.5);

        } else {

            console.log(5.0);

        };
    } else if (service === 'Sauna') {

        if (day === 'Saturday' || day === 'Sunday') {

            console.log(7.0);

        } else if (time > 15 && time <= 22) {

            console.log(6.5);

        } else {

            console.log(4.0);

        }; 
    } else if (service === 'Instructor') {

        if (day === 'Saturday' || day === 'Sunday') {

            console.log(15.0);

        } else if (time > 15 && time <= 22) {

            console.log(12.5);

        } else {

            console.log(10.0);

        };
    };
}

fitness('Monday', 'Sauna', 15.30);