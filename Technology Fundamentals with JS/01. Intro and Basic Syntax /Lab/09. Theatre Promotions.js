function calculatePrice(day, age) {
    const pricingList = {
        'weekday': {
            'kid': 12,
            'adult': 18,
            'retired': 12
        },
        'weekend': {
            'kid': 15,
            'adult': 20,
            'retired': 15
        },
        'holiday': {
            'kid': 5,
            'adult': 12,
            'retired': 10
        }
    }

    let person = '';

    if (age >= 0 && age <= 18)
        person = 'kid';
    else if (age > 18 && age <= 64)
        person = 'adult';
    else if (age > 64 && age <= 122)
        person = 'retired';
    else
        return console.log('Error!');

        return console.log(`${pricingList[day.toLowerCase()][person]}$`);
}

/*
calculatePrice('Weekday', 42);
calculatePrice('Holiday', -12);
calculatePrice('Holiday', 15);
*/