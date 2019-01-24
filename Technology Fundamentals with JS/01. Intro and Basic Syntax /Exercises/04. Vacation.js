function calculatePrice(groupSize, groupType, day) {

    let finalPrice = 0;

    const pricing = {
        'friday': {
            'students': 8.45,
            'business': 10.90,
            'regular': 15
        },
        'saturday': {
            'students': 9.80,
            'business': 15.60,
            'regular': 20
        },
        'sunday': {
            'students': 10.46,
            'business': 16,
            'regular': 22.50
        }
    }

    finalPrice = groupSize * pricing[day.toLowerCase()][groupType.toLowerCase()];

    switch (groupType) {
        case 'Students':
            if (groupSize >= 30)
                finalPrice -= finalPrice * 0.15;
            break;
        case 'Business':
            if (groupSize >= 100)
                finalPrice -= 10 * pricing[day.toLowerCase()][groupType.toLowerCase()];
            break;
        case 'Regular':
            if (groupSize >= 10 && groupSize <= 20)
                finalPrice -= finalPrice * 0.05;
    }

    console.log(`Total price: ${finalPrice.toFixed(2)}`)
}

/*
calculatePrice(30, 'Students', 'Sunday');
calculatePrice(40, 'Regular', 'Saturday');
*/