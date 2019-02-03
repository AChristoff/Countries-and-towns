function solve() {

    let input = document.querySelector('#str').value;
    let output = document.querySelector('#result');

    input = input.split(', ');
    let command = input.pop();
    input = input.toString();

    let nameValidator = /(?<=\s)([A-Z][A-Za-z]*)-([A-Z][A-Za-z]*)(?=\s)|((?<=\s)([A-Z][A-Za-z]*)-([A-Z][A-Za-z]*)\.-([A-Z][A-Za-z]*)(?=\s))/g;
    let airportValidator = /(?<=\s)([A-Z]{3})\/([A-Z]{3})(?=\s)/g;
    let flightValidator = /(?<=\s)([A-Z]{1,3})(\d{1,5})(?=\s)/g;
    let companyValidator = /(?<=-\s)([A-Z][A-Za-z]*)\*([A-Z][A-Za-z]*)(?=\s)/g;

    let result;

    if (command === 'name') {

        let passenger = validator(nameValidator);
        output.textContent = `Mr/Ms, ${passenger}, have a nice flight!`;

    } else if (command === 'flight') {

        let flightNum = validator(flightValidator);
        let airports = validator(airportValidator);
        output.textContent = `Your flight number ${flightNum} is from ${airports[0]} to ${airports[1]}.`;

    } else if (command === 'company') {

        let company = validator(companyValidator);
        output.textContent = `Have a nice flight with ${company}.`;

    } else if (command === 'all') {

        let passenger = validator(nameValidator);
        let airports = validator(airportValidator);
        let flightNum = validator(flightValidator);
        let company = validator(companyValidator);
        output.textContent = `Mr/Ms, ${passenger}, your flight number ${flightNum} is from ${airports[0]} to ${airports[1]}. Have a nice flight with ${company}.`;
    }

    function validator(regEx) {
        result = regEx.exec(input);
        if (regEx === nameValidator) {
            while (result[0].includes('-')) {
                result[0] = result[0].replace('-', ' ');
            }
        } else if (regEx === airportValidator) {
            result[0] = result[0].split('/');
        } else if (regEx === companyValidator) {
            result[0] = result[0].replace('*', ' ');
        }
        return result[0];
    }
}