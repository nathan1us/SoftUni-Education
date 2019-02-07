function isAmazing(num) {
  sNum = num.toString();

  let sum = 0;
  for (let i = 0; i < sNum.length; i++) {
    sum += Number(sNum[i]);
  }

  let result = sum.toString().includes('9');
  console.log(result ? `${num} Amazing? True` : `${num} Amazing? False`);
}

/*
isAmazing(1233);
isAmazing(999);
*/
