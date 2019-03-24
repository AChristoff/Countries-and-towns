function solve(workerProfile) {

    /*

    weight - kilograms
    experience - years
    bloodAlcoholLevel - milliliters

    */

    if (workerProfile.handsShaking === true) {
        let addAlcohol = 0.1 * workerProfile.weight * workerProfile.experience;

        workerProfile.bloodAlcoholLevel += addAlcohol;
        workerProfile.handsShaking = false;
    } else {
        return workerProfile;
    }

    return workerProfile;
}

console.log(solve({
    weight: 80,
    experience: 1,
    bloodAlcoholLevel: 0,
    handsShaking: true
}));

