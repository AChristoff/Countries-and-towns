function solve(input) {

    let rotations = +input.pop();

    for (let i = 0; i < rotations % input.length; i++) {

        input.unshift(input[input.length - 1]);
        input.pop();

    }

    console.log(input.join(' '));
}