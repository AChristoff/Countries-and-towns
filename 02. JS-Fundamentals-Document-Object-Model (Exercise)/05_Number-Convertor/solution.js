function solve(qualifiedName) {

    let button = Array.from(document.getElementsByTagName('button'))[0];

    let list = document.querySelector('#selectMenuTo');

    let option1 = document.createElement("option");
    option1.value = "binary";
    option1.textContent = "Binary";

    let option2 = document.createElement("option");
    option2.value = "hexadecimal";
    option2.textContent = "Hexadecimal";

    list.appendChild(option1);
    list.appendChild(option2);

    button.addEventListener('click', (event) => {

        let input = +document.getElementById('input').value;
        let options = document.getElementById('selectMenuTo').value;

        if (options === 'binary') {

            let binaryResult = input.toString(2);
            document.getElementById('result').value = binaryResult;

        } else if (options === 'hexadecimal') {

            let hexadecimalResult = input.toString(16).toLocaleUpperCase();
            document.getElementById('result').value = hexadecimalResult;
        }
    });
}