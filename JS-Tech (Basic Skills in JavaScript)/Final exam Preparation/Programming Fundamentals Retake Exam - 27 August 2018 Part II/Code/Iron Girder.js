function ironGirder(inputArr) {

    let regEx = /(.*):(\d+|\w+)->(\d+)/;
    let destinationsObj = {};
    let dataObj = {};

    for (let currentString of inputArr) {

        if (currentString === 'Slide rule') {
            break;
        } else {

            let [, city, time, passengers] = currentString.match(regEx);

            if (!destinationsObj.hasOwnProperty(city) && time !== 'ambush') {
                destinationsObj[city] = {};
                dataObj = destinationsObj[city];
                dataObj['time'] = +time;
                dataObj['passengers'] = +passengers;

            } else if (destinationsObj.hasOwnProperty(city) && time !== 'ambush') {

                if (destinationsObj[city].time > +time || destinationsObj[city].time === 0) {
                    destinationsObj[city].time = +time;
                }

                destinationsObj[city].passengers += +passengers;

            } else if (destinationsObj.hasOwnProperty(city) && time === 'ambush') {

                destinationsObj[city].time = 0;
                destinationsObj[city].passengers -= +passengers;
            }
        }
    }

    let cityKeysArr = Object.keys(destinationsObj);

    for (let cityKey of cityKeysArr) {
        if (destinationsObj[cityKey].time === 0 || destinationsObj[cityKey].passengers <= 0) {
            delete destinationsObj[cityKey];
        }
    }

    let result = Object.entries(destinationsObj).sort(sortObject);

    result.forEach(x => console.log(`${x[0]} -> Time: ${x[1].time} -> Passengers: ${x[1].passengers}`));

    function sortObject(a, b) {

        let [aKey, aValue] = a;
        let [bKey, bValue] = b;

        let firstCriteria = aValue.time - bValue.time;

        if (firstCriteria === 0) {
            return aKey.localeCompare(bKey);
        }

        return firstCriteria;
    }
}

ironGirder(['Sto-Lat:8->120',
    'Ankh-Morpork:3->143',
    'Sto-Lat:9->80',
    'Ankh-Morpork:4->143',
    'Sto-Lat:0->20',
    'Quirm:12->0',
    'Quirm:13->0',
    'Slide rule']
);