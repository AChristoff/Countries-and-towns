function myFunc() {

    let summary = {};
    for (let i = 0; i < arguments.length; i++) {

        let type = typeof arguments[i];
        console.log(`${type}: ${arguments[i]}`);

        if (!summary[type]) {
            summary[type] = 1;
        } else {
            summary[type]++;
        }
    }

    let sortedTypes = [];
    for (let currentType in summary) {

        sortedTypes.push([currentType, summary[currentType]])
    }

    sortedTypes.sort((a, b) => b[1] - a[1]).forEach((x) => console.log(`${x[0]} = ${x[1]}`));
}

myFunc('cat', 42, function () {
    console.log('Hello world!');
});


