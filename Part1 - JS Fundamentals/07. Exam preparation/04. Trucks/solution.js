function solve() {

    let [addTruckBtn, addTiresBtn, goToWorkBtn, endOfShiftBtn] = document.querySelectorAll('button');
    let [plateNumber, tireCondition, newTiresInput, workPlateNumber, workDistance] = document.querySelectorAll('input');
    let truckList = document.querySelectorAll('fieldset')[4];
    let tireList = document.querySelectorAll('fieldset')[3];

    let output = document.querySelector('textarea');

    let allTrucks = {};
    let newTires = [];

    addTruckBtn.addEventListener('click', () => {
        // create an trucks object
        if (!Object.keys(allTrucks).includes(plateNumber.value)) {
            // add an array for every truck to store his distance and an inner array with his tires life
            allTrucks[plateNumber.value] = [0, tireCondition.value.split(' ').map((x) => +x)];
            //create a div element with class 'truck' for every truck and append it to the the trucks fieldset
            let divElement = document.createElement('div');
            divElement.className = 'truck';
            divElement.textContent = plateNumber.value;
            truckList.appendChild(divElement);
        }
    });

    addTiresBtn.addEventListener('click', () => {
        // fill the newTires array
        newTires.push(newTiresInput.value.split(' ').map((x) => +x));
        //create a div element with class 'tireSet' for every every new tire set added and append it to the the trucks fieldset
        let divElement = document.createElement('div');
        divElement.className = 'tireSet';
        divElement.textContent = newTiresInput.value;
        tireList.appendChild(divElement);
    });

    goToWorkBtn.addEventListener('click', () => {

        let tireLifeNeeded = Math.ceil(+workDistance.value / 1000);

        if (Object.keys(allTrucks).includes(workPlateNumber.value)) {
            // get the truck tire life by using the tire with lowest life
            let truckTireLife = Math.min(...allTrucks[workPlateNumber.value][1]);

            if (truckTireLife >= tireLifeNeeded) {
                // if the truck have tires with enough life for the job
                allTrucks[workPlateNumber.value][0] += +workDistance.value;
                allTrucks[workPlateNumber.value][1] = allTrucks[workPlateNumber.value][1].map((x) => x - tireLifeNeeded);
            } else {
                // if the truck needs new tires

                // look for available from the new tires array
                // look in every tire set for the lowest value (the tire with lowest life)
                let availableTiresLife;
                availableTiresLife = newTires.map((x) => Math.min(...x));

                // create an array with the all tire sets positions that have life to cover the needed distance
                let tirePositions = [];
                for (let currentTiresLife of availableTiresLife) {
                    if (currentTiresLife >= tireLifeNeeded) {
                        tirePositions.push(currentTiresLife);
                    }
                }

                // get the position of the most proper tire set of all that have life to cover the needed distance
                let tirePosition = Math.min(...tirePositions);

                // use the position to of the set in positions array to get the exact tires set from newTires Array
                let availableTireSet = newTires[availableTiresLife.indexOf(tirePosition)];

                // change truck tires with the new ones - selected for the job
                allTrucks[workPlateNumber.value][1] = availableTireSet;
                // add the distance to the trucks record
                allTrucks[workPlateNumber.value][0] = +workDistance.value;
                // subtract the used life from the tires life
                allTrucks[workPlateNumber.value][1] = allTrucks[workPlateNumber.value][1].map((x) => x - tireLifeNeeded);

                // delete used tires from newTires array
                let indexForRemoval = newTires.indexOf(availableTireSet);
                newTires.splice(indexForRemoval, 1);

                //delete used tires div element
                let tireDivElements = document.querySelectorAll('.tireSet')[indexForRemoval];
                tireDivElements.parentNode.removeChild(tireDivElements);
            }
        }
    });

    endOfShiftBtn.addEventListener('click', () => {
        // print result
        for (let truck in allTrucks) {
            let traveledDistance = allTrucks[truck][0];
            output.value += `Truck ${truck} has traveled ${traveledDistance}.\n`
        }
        output.value += `You have ${newTires.length} sets of tires left.\n`
    });
}