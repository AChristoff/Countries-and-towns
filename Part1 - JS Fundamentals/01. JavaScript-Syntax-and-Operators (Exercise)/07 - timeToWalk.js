function name(steps, stepLength, speed) {

    let pathLengthInMeters = steps * stepLength;
    //console.log(pathLengthInMeters + ' m');
    let arr = ['2', '5', '1'];

    let speedMeterPerSecond = speed / 60 / 60 * 1000;
    //console.log(speedMeterPerSecond + ' m/s');

    let time = pathLengthInMeters / speedMeterPerSecond;
    //console.log(time + ' in seconds');

    let addedTime = Math.trunc(pathLengthInMeters / 500) * 60;
    // console.log(addedTime + ' rest time in seconds');

    let totalTimeInSeconds = time + addedTime;
    //console.log(totalTimeInSeconds + ' seconds');

    let hours = Math.trunc(totalTimeInSeconds / 3600);

    if (hours > 0) {
        totalTimeInSeconds -= 3600 * hours;
        if (hours < 10) {
            hours = '0' + hours;
        }
    } else {
        hours = '00';
    }

    let minutes = Math.round(totalTimeInSeconds / 60);

    if (minutes > 0) {
        totalTimeInSeconds -= 60 * minutes;
        if (minutes === 10) {
            minutes = '0' + minutes;
        }
    } else {
        minutes = '00';
    }


    let seconds = Math.round(totalTimeInSeconds % 60);

    if (seconds > 0) {

        totalTimeInSeconds -= 60 * seconds;

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

    } else {
        seconds = '00';
    }


    console.log(`${hours}:${minutes}:${seconds}`)
}

name(4000, 0.6, 5);