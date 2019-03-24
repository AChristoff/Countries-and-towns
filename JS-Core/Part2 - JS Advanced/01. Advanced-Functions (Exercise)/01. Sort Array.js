function sortArray(inputArray, sortMethod) {

    let sortingStrategy = {
        'asc': (a, b) => {return a - b},
        'desc': (a, b) => {return b - a}
    };

    return inputArray.sort(sortingStrategy[sortMethod]);
}

sortArray([14, 7, 17, 6, 8], 'asc');
