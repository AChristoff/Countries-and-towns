function solve(inputArr) {

    const regExDishes = /<([a-z\d]+)>/;
    const regExCleaning = /\[([A-Z\d]+)\]/;
    const regExLaundry = /{(.*)}/;
    const regExTime = /[\d]/g;

    let dishesTime = 0;
    let cleaningTime = 0;
    let laundryTime = 0;
    let time = 0;
    let result = '';

    for (let command of inputArr) {
        if (command.match(regExDishes)) {
            result = command.match(regExDishes)[1];
            time = result.match(regExTime)
                .reduce((a,b)=>(+a)+(+b), 0);
            dishesTime += time;
        } else if (command.match(regExCleaning)) {
            result = command.match(regExCleaning)[1];
            time = result.match(regExTime)
                .reduce((a,b)=>(+a)+(+b), 0);
            cleaningTime += time;
        } else if (command.match(regExLaundry)) {
            result = command.match(regExLaundry)[1];
            time = result.match(regExTime)
                .reduce((a,b)=>(+a)+(+b), 0);
            laundryTime += time;
        }
    }

    let totalTime = dishesTime + cleaningTime + laundryTime;

    console.log(`Doing the dishes - ${dishesTime} min.`);
    console.log(`Cleaning the house - ${cleaningTime} min.`);
    console.log(`Doing the laundry - ${laundryTime} min.`);
    console.log(`Total - ${totalTime} min.`);
}

solve(['-^hr5a65j48<dd6f5h4dhfd>456sga_+',
    'DHdhy4*3[T2HOU87KRC]sA/@',
    'Sda%t]gf{%hjK8f34)!fG1re}-+htG%v',
    'wife is happy',
    '']);