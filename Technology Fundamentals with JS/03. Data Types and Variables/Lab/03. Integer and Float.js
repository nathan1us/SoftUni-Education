function getType(firstNum, secondNum, thirdNum) {
  let sum = firstNum + secondNum + thirdNum;

  console.log(`${sum} - ${Number.isInteger(sum) ? 'Integer' : 'Float'}`); 
}

/*
getType(9, 100, 1.1);
getType(100, 200, 303);
*/
