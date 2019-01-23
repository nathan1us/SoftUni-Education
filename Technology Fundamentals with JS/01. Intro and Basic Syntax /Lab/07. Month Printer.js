function printMonth(monthNum) {
    const months = ["January", "February", "March", 
    "April", "May", "June","July", "August", 
    "September", "October", "November", "December" ];

    console.log(monthNum > 12 || monthNum < 1 ? 'Error!' : months[monthNum - 1]);
}

/*
printMonth(2);
printMonth(13);
*/