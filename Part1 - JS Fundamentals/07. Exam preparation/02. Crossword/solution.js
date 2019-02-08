function solve() {
    let input = document.querySelector('#input');
    let output = document.querySelector('#output p');
    let [filterBtn, sortBtn, rotateBtn, getBtn] = document.querySelectorAll('button');

    filterBtn.addEventListener('click', () => {
        let searched = Array
            .from(document.querySelectorAll('#filter div option'))
            .filter((x => x.selected))[0].textContent;

        let position = +document.querySelector('#filterPosition').value;

        if (searched === 'UPPERCASE') {
            let result = input.value.split('').filter((x) => x.match(/[A-Z]/g))[position - 1];
            output.textContent += result;
        } else if (searched === 'LOWERCASE') {
            let result = input.value.split('').filter((x) => x.match(/[a-z]/g))[position - 1];
            output.textContent += result;
        } else if (searched === 'NUMS') {
            let result = input.value.split('').filter((x) => x.match(/[0-9]/g))[position - 1];
            output.textContent += result;
        }
    });

    sortBtn.addEventListener('click', () => {
        let searched = Array
            .from(document.querySelectorAll('#sort div option'))
            .filter((x => x.selected))[0].textContent;

        let position = +document.querySelector('#sortPosition').value;
        if (searched === 'A') {
            let result = input.value.split('').sort((a, b) => a[0].localeCompare(b[0]))[position - 1];
            output.textContent += result;
        } else if (searched === 'Z') {
            let result = input.value.split('').sort((a, b) => b[0].localeCompare(a[0]))[position - 1];
            output.textContent += result;
        }
    });

    rotateBtn.addEventListener('click', () => {
        let rotations = +document.querySelector('#rotateSecondaryCmd').value;
        let position = +document.querySelector('#rotatePosition').value;
        let result = input.value.split('');
        let length = result.length;

        for (let i = 0; i < rotations % length; i++) {
            result.unshift(result[length-1]);
            result.pop();
        }
        output.textContent += result[position - 1];

    });

    getBtn.addEventListener('click', () => {
            let result = input.value.split('');
            let position = +document.querySelector('#getPosition').value;
            output.textContent += result[position - 1];
    });
}