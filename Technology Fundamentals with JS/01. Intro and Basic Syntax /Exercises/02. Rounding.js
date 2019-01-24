function roundNum(num, precision) {
    console.log(parseFloat(num.toFixed(precision > 15 ? 15 : precision)));
}

/*
roundNum(3.1415926535897932384626433832795, 2);
roundNum(10.5, 3);
*/