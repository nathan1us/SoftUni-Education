function printAndSum(start, end) {

    let nums = '';
    let sum = 0;

    for (let i = start; i <= end; i++) {
        nums += `${i} `;
        sum += i;
    }

    console.log(nums);
    console.log(`Sum: ${sum}`);
}

/*
printAndSum(5, 10);
printAndSum(0, 26);
printAndSum(50, 60);
*/
