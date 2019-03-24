function solve(inputArr) {

    let bandsMembersObj = {};
    let membersArr = [];
    let bandsTimeObj = {};
    let finalBand = inputArr.pop();

    for (let command of inputArr) {

        if (command === 'start of concert') {
            break;
        }

        if (command.includes('Add;')) {
            let [, band, members] = command.split('; ');
            membersArr = members.split(', ');

            if (!bandsMembersObj.hasOwnProperty(band)) {
                bandsMembersObj[band] = membersArr;
            } else {
                for (let currentMember of membersArr) {

                    let presentMembersArr = bandsMembersObj[band];

                    if (!presentMembersArr.includes(currentMember)) {
                        presentMembersArr.push(currentMember);
                    }
                }
            }

            if (!bandsTimeObj.hasOwnProperty(band)) {
                bandsTimeObj[band] = 0;
            }

        } else if (command.includes('Play;')) {
            let [, band, time] = command.split('; ');
            time = +time;

            if (!bandsTimeObj.hasOwnProperty(band)) {
                bandsTimeObj[band] = time;
            } else {
                let currentTime = bandsTimeObj[band];
                currentTime += time;
                bandsTimeObj[band] = currentTime;
            }

            if (!bandsMembersObj.hasOwnProperty(band)) {
                bandsMembersObj[band] = [];
            }
        }
    }

    let totalTime = Object.values(bandsTimeObj);
    totalTime = totalTime.reduce((a, b) => a + b, 0);

    let sortedBands = Object.entries(bandsTimeObj).sort(sortBands);

    let finalBandMembers = bandsMembersObj[finalBand];

    console.log(`Total time: ${totalTime}`);
    sortedBands.forEach(x => console.log(`${x[0]} -> ${x[1]} `));
    console.log(finalBand);
    finalBandMembers.forEach(x => console.log(`=> ${x}`));


    function sortBands(a, b) {

        let [aKey, aValue] = a;
        let [bKey, bValue] = b;

        let firstCriteria = bValue - aValue;

        if (firstCriteria === 0) {
            return aKey.localeCompare(bKey);
        }

        return firstCriteria;

    }
}

solve(['Play; The Beatles; 2584',
    'Add; The Beatles; John Lennon, Paul McCartney, George Harrison, Ringo Starr',
    'Add; Eagles; Glenn Frey, Don Henley, Bernie Leadon, Randy Meisner',
    'Play; Eagles; 1869',
    'Add; The Rolling Stones; Brian Jones, Mick Jagger, Keith Richards',
    'Add; The Rolling Stones; Brian Jones, Mick Jagger, Keith Richards, Bill Wyman, Charlie Watts, Ian Stewart',
    'Play; The Rolling Stones; 4239',
    'start of concert',
    'The Rolling Stones']);