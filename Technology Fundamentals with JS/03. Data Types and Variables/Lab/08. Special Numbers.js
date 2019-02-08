function findSpecialNums(num) {
  for (let i = 1; i <= num; i++) {
    let digitsSum = 0,
      n = i;

    while (n) {
      digitsSum += n % 10;
      n = Math.floor(n / 10);
    }

    switch (digitsSum) {
      case 5:
      case 7:
      case 11:
        console.log(`${i} -> True`);
        break;
      default:
        console.log(`${i} -> False`);
        break;
    }
  }
}

// findSpecialNums(15);
