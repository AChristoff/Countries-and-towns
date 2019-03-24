function songEncryption(inputArr) {

    let artistValidator = /^[A-Z][a-z\s']+$/g;
    let songValidator = /^[A-Z\s]+[^!@#$%^&*()_\-=a-z0-9]$/g;

    for (let string of inputArr) {

        let encryptedArr = [];
        let result = '';

        if (string === 'end') {
            break;
        }

        let [artist, song] = string.split(':');

        if (artist.match(artistValidator) !== null && song.match(songValidator) !== null) {

            let encryptionKey = artist.length;

            for (let char of string) {

                let ASCII = char.charCodeAt(0);
                let newCharCode = '';

                if (char === ':') {
                    newCharCode = 64;

                } else if (ASCII >= 97 && ASCII <= 122) {

                    newCharCode = ASCII + encryptionKey;

                    if (newCharCode > 122) {

                        let x = newCharCode - 122;
                        newCharCode = 96 + x;
                    } // lowerCase

                } else if (ASCII >= 65 && ASCII <= 90) {

                    newCharCode = ASCII + encryptionKey;

                    if (newCharCode > 90) {

                        let x = newCharCode - 90;
                        newCharCode = 64 + x;
                    } // upperCase

                } else if (char === ' ' || char === '\'') {

                    newCharCode = ASCII;
                } // space or `

                let encryptedChar = String.fromCharCode(newCharCode);
                encryptedArr.push(encryptedChar);
            }

            result = encryptedArr.join('');
            console.log(`Successful encryption: ${result}`);

        } else {

            console.log('Invalid input!');
        }
    }
}

songEncryption(['Eminem:VENOM',
    'Linkin park:NUMB',
    'Drake:NONSTOP',
    'Adele:HELLO',
    'end']);