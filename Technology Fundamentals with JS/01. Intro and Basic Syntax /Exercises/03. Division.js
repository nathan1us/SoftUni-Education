function divisionCheck(num) {

    let final = 0;

    if (num % 10 == 0)
        final = 10;
    else if (num % 7 == 0)
        final = 7;
    else if (num % 6 == 0)
        final = 6;
    else if (num % 3 == 0)
        final = 3;
    else if (num % 2 == 0)
        final = 2;

        console.log(final === 0 ? 'Not divisible' : `The number is divisible by ${final}`);
}

divisionCheck(30);
divisionCheck(15);
divisionCheck(12);
divisionCheck(1643);