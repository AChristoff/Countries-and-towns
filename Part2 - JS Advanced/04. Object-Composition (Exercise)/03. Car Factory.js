function solve(order) {

    let car = Object.create(order);
    car.model = car.model;

    if (car.power <= 90) {
        car.engine = {power: 90, volume: 1800};
    } else if (car.power <= 120) {
        car.engine = {power: 120, volume: 2400};
    } else if (car.power <= 200) {
        car.engine = {power: 200, volume: 3500};
    }

    car.carriage = {type: car.carriage, color: car.color};

    car.wheelsize = Math.floor(car.wheelsize) % 2 === 0 ? Math.floor(car.wheelsize) - 1 : Math.floor(car.wheelsize);
    car.wheelsize = [car.wheelsize, car.wheelsize, car.wheelsize, car.wheelsize];
    car.wheels = car.wheelsize;
    delete car.wheelsize;

    return car;
}

console.log(solve(
    {
        model: 'Opel Vectra',
        power: 110,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 17.2
    }
));

