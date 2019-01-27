function validate() {

    let button = document.querySelector('button');
    let year = document.querySelector('#year');
    let monthsArr = document.querySelectorAll('#month > option');
    let date = document.querySelector('#date');
    let male = document.querySelector('#male');
    let female = document.querySelector('#female');
    let region = document.querySelector('#region');
    let output = document.querySelector('#egn');

    let egn = '';

    button.addEventListener('click', clickEvent);

    function clickEvent(event) {

        //add year digits and reset input
        egn = year.value[2] + year.value[3];
        year.value = '';

        //add month digits and reset selected
        for (const month in monthsArr) {

            if (monthsArr[month].selected) {
                egn += monthsArr[month].index.toString().padStart(2, '0');
                monthsArr[month].selected = false;
            }
        }

        //add date digits and reset input
        egn += date.value.toString().padStart(2, '0');
        date.value = '';

        //add region digits and reset input
        egn += region.value[0] + region.value[1];
        region.value = '';

        //add gender digit and reset checks
        if (male.checked) {
            egn += '2';
        } else if (female.checked) {
            egn += '1';
        }
        male.checked = false;
        female.checked = false;

        //add last validator digit
        let weightPosition = [2, 4, 8, 5, 10, 9, 7, 3, 6];
        let weightSum = 0;

        for (let i = 0; i < weightPosition.length; i++) {
            weightSum += weightPosition[i] * egn[i];
        }

        let checkNum = weightSum % 11;
        egn += checkNum;

        //show the result
        output.textContent = `Your EGN is: ${egn}`;
    }
}