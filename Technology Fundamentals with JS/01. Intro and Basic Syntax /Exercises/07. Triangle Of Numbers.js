function printTriangle(num) {

    let str = '';

    for (let i = 1; i <= num; i++) {
        
        for (let j = 1; j <= i; j++) {
            str += `${i} `;
        }
        
        console.log(str);
        str = '';
    }
}

/*
printTriangle(3);
printTriangle(5);
printTriangle(6);
*/
