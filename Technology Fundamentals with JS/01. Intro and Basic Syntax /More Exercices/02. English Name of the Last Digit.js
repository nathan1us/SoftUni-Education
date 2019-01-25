function printName(digit) {
    let digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    let num = digit.toString().slice(-1);

    console.log(digits[num]);
}

/*
printName(512);
printName(1);
printName(1643);
*/