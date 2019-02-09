function calculateSpice(startingYield) {
  let daysCounter = 0, extractedSpice = 0;

  while (startingYield >= 100) {
    daysCounter++;
    extractedSpice += startingYield - 26;
    startingYield -= 10;
  }

  extractedSpice -= 26;

  console.log(`${daysCounter}\n${extractedSpice > 0 ? extractedSpice : 0}`);
}

// calculateSpice(111);