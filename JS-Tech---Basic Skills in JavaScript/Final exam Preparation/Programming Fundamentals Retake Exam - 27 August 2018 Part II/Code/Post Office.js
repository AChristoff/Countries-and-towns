function solve(inputArr) {

    let [firstPart, secondPart, thirdPart] = inputArr[0].split('|');

    let regExCapitalLetters = /([#$%*&])([A-Z]+)\1/;
    let regExDigits = /\d{2}:\d{2}/g;

    let capitalLetters = firstPart.match(regExCapitalLetters)[2];
    let digitsArr = secondPart.match(regExDigits);
    let wordsArr = thirdPart.split(' ');
    let decryptionKeysObj = {};

    for (let digit of digitsArr) {

        let [letter, length] = digit.split(':');

        letter = String.fromCharCode(letter);

        if (length.startsWith(0)) {
            length = length.substr(1, 2);
        }
        length = +length;

        if (capitalLetters.includes(letter) && length >= 1 && length <= 20) {
            decryptionKeysObj[letter] = length + 1;
        }
    }

    for (let word of wordsArr) {

        if (Object.keys(decryptionKeysObj).includes(word[0]) && word.length === decryptionKeysObj[word[0]]) {
            console.log(word);
        }
    }
}

solve(['Urgent"Message.TO$#POAML#|readData79:05:79:0!2reme80:03--23:11{79:05}tak{65:11ar}!77:!23--)77:05ACCSS76:05ad|Remedy Por Ostream :Istream Post sOffices Office Of Ankh-Morpork MR.LIPWIG Mister Lipwig']);