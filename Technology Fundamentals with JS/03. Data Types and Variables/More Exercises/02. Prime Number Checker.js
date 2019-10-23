function isPrime(num) {
  let prime = true;
  for (let i = 2; i < num; i++)
    if (num % i === 0) prime = false;
  console.log(prime);
}

/*
isPrime(7);
isPrime(8);
isPrime(81);
*/