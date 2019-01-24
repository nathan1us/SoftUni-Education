function findAgeGroup(age) {

    let ageGroup = '';

    if (age >= 0 && age <= 2) 
        ageGroup = 'baby';
    else if (age > 2 && age <= 13)
        ageGroup = 'child';
    else if (age > 13 && age <= 19)
        ageGroup = 'teenager';
    else if (age > 19 && age <= 65)
        ageGroup = 'adult';
    else
        ageGroup = 'elder';

    console.log(ageGroup);
}

/*
findAgeGroup(20);
findAgeGroup(1);
findAgeGroup(100);
*/