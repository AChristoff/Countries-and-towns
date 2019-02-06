function solve() {

    let [submitBtn, searchBtn] = document.querySelectorAll('button');
    let inputs = document.querySelectorAll('input');
    let userName = inputs[0];
    let email = inputs[2];
    let table = document.querySelector('tbody');
    let topics = Array.from(document.querySelectorAll('.topics input'));

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        let topicsArr = [];

        for (let topic of topics) {
            if (topic.checked) {
                topicsArr.push(topic.value);
            }
        }

        let parentRow = createAddAppend('tr', '', table);
        createAddAppend('td', userName.value, parentRow);
        createAddAppend('td', email.value, parentRow);
        createAddAppend('td', topicsArr.join(' '), parentRow);

    });

    searchBtn.addEventListener('click', (event) => {
        event.preventDefault();

        let searched = inputs[inputs.length - 1].value;
        let tableCells = Array.from(document.querySelectorAll('tbody tr td'));

        for (let cell of tableCells) {
            cell.parentNode.style.visibility = 'hidden';
        }

        for (let cell of tableCells) {
            if (cell.textContent.includes(searched)) {
                cell.parentNode.style.visibility = 'visible';
            }
        }
    });

    function createAddAppend(child, text, parent) {
        if (child === 'tr') {
            let childElement = document.createElement(child);
            parent.appendChild(childElement);
            return childElement;
        } else {
            let childElement = document.createElement(child);
            childElement.textContent = text;
            parent.appendChild(childElement);
        }
    }
}