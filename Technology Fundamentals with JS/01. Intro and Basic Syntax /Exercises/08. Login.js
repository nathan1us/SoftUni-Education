function authorize(attempts) {
    let arr = [ username, try1, try2, try3 ] = attempts;

    for (let i = 1; i < arr.length; i++) {
        
        if (arr[i] === username.split('').reverse().join('')) {
            console.log(`User ${username} logged in.`);
            return;
        } else {

            if (i == arr.length - 1) break;

            console.log('Incorrect password. Try again.');
        }
    }

    console.log(`User ${username} blocked!`);
}

/*
authorize(['Acer','login','go','let me in','recA']);
console.log('\n');
authorize(['momo', 'omom']);
console.log('\n');
authorize(['sunny','rainy','cloudy','sunny','not sunny']);
*/