function sumDigits(num) {
  let sNum = num.toString();
  let digitsSum = 0;

  for (let i = 0; i < sNum.length; i++) {
    digitsSum += Number(sNum[i]);
  }

  console.log(digitsSum);
}

/*
sumDigits(245678);
sumDigits(97561);
sumDigits(543);
*/

