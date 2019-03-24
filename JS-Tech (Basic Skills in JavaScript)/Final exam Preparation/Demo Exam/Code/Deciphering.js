function solve(inputArr) {

    const regExBookFinder = /.*[^d-z{}|#]+/g;

    let [encryptedStr, keys] = inputArr;
    let decryptedArr = [];
    let [keyToFind, keyToUse] = keys.split(' ');

    if (!encryptedStr.match(regExBookFinder)) {
        for (let char of encryptedStr) {
            let ASCII = char.charCodeAt(0) - 3;
            let decryptedChar = String.fromCharCode(ASCII);
            decryptedArr.push(decryptedChar);
        }
    } else {
        console.log("This is not the book you are looking for.");
    }

    let decryptedString = decryptedArr.join('');
    while (decryptedString.includes(keyToFind)){
        decryptedString = decryptedString.replace(keyToFind, keyToUse);
    }

    console.log(decryptedString);
}

solve(['wkhfn#|rx#jhqfkr#phf#exw#|rxu#uholf#lv#khfgohg#lq#hfrwkhu#sohfhw',
    'ec an']);