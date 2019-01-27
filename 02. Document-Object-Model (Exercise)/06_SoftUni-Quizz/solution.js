function solve() {

    let buttons = Array.from(document.getElementsByTagName('button'));
    let sections = Array.from(document.getElementsByTagName('section'));
    let inputs = Array.from(document.getElementsByTagName('input'));
    let result = document.getElementById('result');

    let rightAnswers = 0;

    let [firstButton, secondButton, thirdButton] = buttons;
    let [firstSection, secondSection, thirdSection] = sections;

    firstButton.addEventListener('click', firstEvent);
    secondButton.addEventListener('click', secondEvent);
    thirdButton.addEventListener('click', thirdEvent);

    function firstEvent(event) {


        if (inputs[1].checked) {
            rightAnswers++;
        }

        secondSection.className = 'none';
    }

    function secondEvent(event) {

        if (inputs[6].checked) {
            rightAnswers++;
        }

        thirdSection.className = 'none';
    }

    function thirdEvent(event) {

        if (inputs[11].checked) {
            rightAnswers++;
        }

        if (rightAnswers === 3) {

            result.textContent = 'You are recognized as top SoftUni fan!';

        } else {

            result.textContent = `You have ${rightAnswers} right answers`;
        }
    }
}