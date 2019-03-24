function solve(inputArr) {

    const regExWordFinder = /\b[A-Za-z]+(?=:)/g;
    const regExDefinitions = /(?<=: )\b.*/g;
    const regExSearched = /\w+/g;

    let dictionaryObj = {};
    let definitionsArr = [];
    let allWords = [];

    let wordsArr = inputArr.shift().split(' | ');
    let command = inputArr.pop();

    for (let currentWord of wordsArr) {
        let word = currentWord.match(regExWordFinder);
        let definition = currentWord.match(regExDefinitions);
        let words = word[0];
        if (!allWords.includes(words)) {
            allWords.push(words);
        }

        if (!dictionaryObj.hasOwnProperty(word)) {
            dictionaryObj[word] = [];
        }

        definitionsArr = dictionaryObj[word];
        definitionsArr.push(definition);
    }

    let searchedArr = inputArr[0].match(regExSearched).sort();

    let list = [...Object.entries(dictionaryObj)];

    if (command === 'End') {

        for (let searched of searchedArr) {

            if (dictionaryObj.hasOwnProperty(searched)) {

                for (let currentArr of list) {

                    if (currentArr[0] === searched) {
                        let result = currentArr[1];
                        console.log(searched);
                        result.sort((a, b) => b[0].length - a[0].length)
                            .forEach(x => console.log(` -${x[0]}`));
                    }
                }
            }
        }
    } else if (command === 'List') {
        allWords.sort();
        console.log(allWords.join(' '));
    }
}

solve(['programmer: profession | developer: a magician | developer: an english word | programmer: person who creat code',
    'Pesho | Gosho',
    'List']);