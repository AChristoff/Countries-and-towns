//  Solution 1

function attachEventsListeners() {

    let days = $('#days');
    let hours = $('#hours');
    let minutes = $('#minutes');
    let seconds = $('#seconds');

    let buttons = $(':button').on('click', function () {
        let units = $(this).attr('id').replace('Btn', '');

        if (units === 'days') {
            hours.val(days.val() * 24);
            minutes.val(hours.val() * 60);
            seconds.val(minutes.val() * 60);
        } else if (units === 'hours') {
            days.val(hours.val() / 24);
            minutes.val(hours.val() * 60);
            seconds.val(hours.val() * 60 * 60);
        } else if (units === 'minutes') {
            days.val(minutes.val() / 60 / 24);
            hours.val(minutes.val() / 60);
            seconds.val(minutes.val() * 60);
        } else if (units === 'seconds') {
            minutes.val(seconds.val() / 60);
            hours.val(minutes.val() / 60);
            days.val(hours.val() / 24);
        }
    });

    for (let button of buttons) {
        console.log($(button).attr('id'));
    }
}

/*  Solution 2

function attachEventsListeners() {

    let days = $('#days');
    let daysBtn = $('#daysBtn');
    let hours = $('#hours');
    let hoursBtn = $('#hoursBtn');
    let minutes = $('#minutes');
    let minutesBtn = $('#minutesBtn');
    let seconds = $('#seconds');
    let secondsBtn = $('#secondsBtn');

    daysBtn.on('click', () => converter(days));
    hoursBtn.on('click', () => converter(hours));
    minutesBtn.on('click', () => converter(minutes));
    secondsBtn.on('click', () => converter(seconds));

    function converter(value) {
        if (value.is('#days')) {
            hours.val(+value.val() * 24);
            minutes.val(+value.val() * 24 * 60);
            seconds.val(+value.val() * 24 * 60 * 60);
        } else if (value.is('#hours')) {
            days.val(+value.val() / 24);
            minutes.val(+value.val() * 60);
            seconds.val(+value.val() * 60 * 60);
        } else if (value.is('#minutes')) {
            days.val(+value.val() / 60 / 24);
            hours.val(+value.val() / 60);
            seconds.val(+value.val() * 60);
        } else if (value.is('#seconds')) {
            days.val(+value.val() / 60 / 60 / 24);
            hours.val(+value.val() / 60 / 60);
            minutes.val(+value.val() / 60);
        }
    }
}*/