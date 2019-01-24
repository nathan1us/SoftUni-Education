function authorize(attempts) {
    let username = attempts[0];

    for (let i = 1; i < attempts.length; i++) {
        
        if (attempts[i] === username.split('').reverse().join('')) {
            console.log(`User ${username} logged in.`);
            return;
        } else {

            if (i == attempts.length - 1) break;

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