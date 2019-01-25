function printNextDay(year, month, day) {
    const ONE_DAY = 24 * 60 * 60 * 1000;

    let today = new Date(year, month - 1, day);
    let tomorrow = new Date(today.getTime() + ONE_DAY);

    console.log(`${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`);
}

//printNextDay(2016, 9, 30);
