function attachEventsListeners() {

    let convertBtn = $('#convert');
    convertBtn.on('click', () => {

        let fromValue = $('#inputDistance').val();
        let toValue = $('#outputDistance');
        let fromUnits = $('#inputUnits').val();
        let toUnits = $('#outputUnits').val();
        let meters;

        switch (fromUnits) {
            case 'km':
                meters = fromValue * 1000;
                break;
            case 'm':
                meters = fromValue;
                break;
            case 'cm':
                meters = fromValue / 100;
                break;
            case 'mm':
                meters = fromValue / 1000;
                break;
            case 'mi':
                meters = fromValue * 1609.344;
                break;
            case 'yrd':
                meters = fromValue / 1.09361;
                break;
            case 'ft':
                meters = fromValue / 3.28084;
                break;
            case 'in':
                meters = fromValue / 39.3701;
                break;
        }

        switch (toUnits) {
            case 'km':
                toValue.val(meters / 1000);
                break;
            case 'm':
                toValue.val(meters);
                break;
            case 'cm':
                toValue.val(meters * 100);
                break;
            case 'mm':
                toValue.val(meters * 1000);
                break;
            case 'mi':
                toValue.val(meters / 1609.344);
                break;
            case 'yrd':
                toValue.val(meters * 1.09361);
                break;
            case 'ft':
                toValue.val(meters * 3.28084);
                break;
            case 'in':
                toValue.val(meters * 39.3701);
                break;
        }
    });
}