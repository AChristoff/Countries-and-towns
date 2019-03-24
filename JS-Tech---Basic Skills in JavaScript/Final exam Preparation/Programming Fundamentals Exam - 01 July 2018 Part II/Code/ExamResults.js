function solve(inputArr) {


    let resultsObj = {};
    let languagesObj = {};
    let bannedObj = {};
    let flag = false;

    for (let submission of inputArr) {
        if (submission === 'exam finished') {
            break
        } else {
            let [student, language, score] = submission.split('-');

            if (!resultsObj.hasOwnProperty(student)) {
                resultsObj[student] = score;
            }

            if (resultsObj[student] < score) {
                resultsObj[student] = score
            }

            if (!languagesObj.hasOwnProperty(language)) {
                languagesObj[language] = 1;
            } else {
                languagesObj[language] += 1;
            }

            if (submission.includes('banned')) {
                let name = submission.split('-')[0];
                bannedObj[name] = 'banned';
                flag = true;
            }
        }
    }

    if (flag === true) {
        let bannedList = Object.keys(bannedObj);
        for (let banned of bannedList) {
            if (Object.keys(resultsObj).includes(banned)) {
                delete resultsObj[banned];
            }
        }
        delete languagesObj['banned'];
    }

    let sortedResultsObj = Object.entries(resultsObj)
        .sort(sortStudents);
    let sortedLanguageObj = Object.entries(languagesObj)
        .sort(sortLanguages);

    console.log('Results:');
    sortedResultsObj.forEach(x => console.log(`${x[0]} | ${x[1]}`));
    console.log('Submissions:');
    sortedLanguageObj.forEach(x => console.log(`${x[0]} - ${x[1]}`));

    function sortStudents(a, b) {

        let [aKey, aSubObj] = a;
        let [bKey, bSubObj] = b;

        let firstCriteria = bSubObj[0] - aSubObj[0];

        if (firstCriteria === 0) {
            return aKey.localeCompare(bKey);
        }

        return firstCriteria
    }

    function sortLanguages(a, b) {

        let [aKey, aValue] = a;
        let [bKey, bValue] = b;

        let firstCriteria = bValue - aValue;

        if (firstCriteria === 0) {
            return aKey.localeCompare(bKey);
        }

        return firstCriteria
    }
}

solve(['Pesho-Java-84',
    'Pesho-banned',
    'Gosho-Java-70',
    'Pasho-C#-84',
    'Pasho-banned',
    'Kiro-banned',
    'Kiro-C#-94',
    'exam finished',
]);