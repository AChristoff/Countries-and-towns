function attachEvents() {

    const baseUrl = 'https://judgetests.firebaseio.com/';

    $('#submit').on('click', getWeather);

    async function getWeather() {

        try {

            let weather = await $.ajax({
                method: 'GET',
                url: baseUrl + 'locations.json',
            });

            $('#forecast').css('display', 'block');
            let searchedCity = $('#location').val();
            let cityCode = weather.filter((city) => city.name === searchedCity)[0].code;

            // ------------------

            let icons = {
                Sunny: '&#x2600',
                'Partly sunny': '&#x26C5',
                Overcast: '&#x2601',
                Rain: '&#x2614',
                Degrees: '&#176'
            };

            let currentWeather = await $.ajax({
                method: 'GET',
                url: `${baseUrl}forecast/today/${cityCode}.json`
            });

            let currentDiv = $('#current');

            let icon = icons[currentWeather.forecast.condition];
            let location = currentWeather.name;
            let minTemp = currentWeather.forecast.low;
            let maxTemp = currentWeather.forecast.high;
            let condition = currentWeather.forecast.condition;

            let iconSpan = $(`<span>${icon}</span>`);
            iconSpan.attr('class', 'condition symbol');
            iconSpan.appendTo(currentDiv);

            let informationSpan = $('<span></span>');
            informationSpan.attr('class', 'condition');
            informationSpan.appendTo(currentDiv);

            let locationSpan = $(`<span class="forecast-data">${location}</span>`);
            let tempSpan = $(`<span class="forecast-data">${minTemp}°/${maxTemp}°</span>`);
            let conditionSpan = $(`<span class="forecast-data">${condition}</span>`);

            informationSpan.append(locationSpan, tempSpan, conditionSpan);

            // ------------------

            let threeDaysForecast = await $.ajax({
                method: 'GET',
                url: `${baseUrl}forecast/upcoming/${cityCode}.json`
            });

            let upcomingDiv = $('#upcoming');
            let forecast = threeDaysForecast.forecast;

            forecast.forEach((day) => {

                let upcomingSpan = $('<span></span>');
                upcomingSpan.attr('class', 'upcoming');
                upcomingSpan.appendTo(upcomingDiv);

                let icon = icons[day.condition];
                let minTemp = day.low;
                let maxTemp = day.high;
                let condition = day.condition;

                let smallIconSpan = $(`<span class="symbol">${icon}</span>`);
                let tempSpan = $(`<span class="forecast-data">${minTemp}°/${maxTemp}°</span>`);
                let conditionSpan = $(`<span class="forecast-data">${condition}</span>`);

                upcomingSpan.append(smallIconSpan, tempSpan, conditionSpan);
            });

        } catch (e) {
            $('#forecast').css('display', 'block');
            $('#forecast').text('Error')
        }
    }
}