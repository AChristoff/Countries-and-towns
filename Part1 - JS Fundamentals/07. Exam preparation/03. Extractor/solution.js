function solve() {

    let stringValidator = /([0-9]+)(.*)/;

    document.querySelector('button').addEventListener('click', () => {

        let input = document.querySelector('#input').value;

        let charsLength = stringValidator.exec(input)[1];
        input = stringValidator.exec(input)[2].substr(0, +charsLength);

        let splitKey = input.substr(-1);
        input = input.split(splitKey);

        let symbolsForRemoval = new RegExp(`[${input[0]}]`,"g");
        let result = input[1].replace(symbolsForRemoval, '').replace(/#/g,' ');

        document.querySelector('#output').value = result;
    });
}