function solve() {

    let rows = Array.from(document.querySelectorAll('tbody tr'));
    let button = document.querySelector('button').addEventListener('click', clickEvent);
    let searched = document.querySelector('input');

    function clickEvent(event) {

        for (const row in rows) {

            let text = rows[row].textContent.toLowerCase();
            rows[row].classList.remove('select');

            if (text.includes(searched.value.toLowerCase())) {
                rows[row].classList.add('select');
            }
        }

        searched.value = '';
    }
}
