function solve(input) {

    function sort(arr) {
        arr.sort((a, b) => a.length - b.length || a[0].localeCompare(b[0]))
    }

    sort(input);
    console.log(input.join('\n'));
}