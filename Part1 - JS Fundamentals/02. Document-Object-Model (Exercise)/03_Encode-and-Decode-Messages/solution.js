function solve() {

    let buttons = document.getElementsByTagName('button');
    let textAreas = document.getElementsByTagName('textarea');

    buttons[0].addEventListener('click', encode);
    buttons[1].addEventListener('click', decode);


    function encode() {

        let message = textAreas[0].value;
        let codeMessage = '';

        message.split('').forEach((char) => {
            let asciiValue = char.charCodeAt(0) + 1;
            codeMessage += String.fromCharCode(asciiValue);
        });

        textAreas[0].value = '';
        textAreas[1].value = codeMessage;
    }

    function decode() {

        let codeMessage = textAreas[1].value;
        let decodedMessage = '';

        codeMessage.split('').forEach((char) => {

            let asciiValue = char.charCodeAt(0) - 1;
            decodedMessage += String.fromCharCode(asciiValue);
        });

        textAreas[1].value = decodedMessage;
    }
}