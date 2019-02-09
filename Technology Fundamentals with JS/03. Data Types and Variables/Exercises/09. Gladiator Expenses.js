function calculateExpenses(fightsCount, helmetPrice, swordPrice, shieldPrice, armourPrice) {
  let expenses = 0,
    shieldCounter = 0;

  for (let i = 1; i <= fightsCount; i++) {
    if (i % 2 == 0 && i % 3 == 0) {
      expenses += helmetPrice + swordPrice + shieldPrice;
      shieldCounter++;
    } else if (i % 2 == 0) expenses += helmetPrice;
    else if (i % 3 == 0) expenses += swordPrice;

    if (shieldCounter == 2) {
      expenses += armourPrice;
      shieldCounter = 0;
    }
  }

  console.log(`Gladiator expenses: ${expenses.toFixed(2)} aureus`);
}

/*
calculateExpenses(7, 2, 3, 4, 5);
calculateExpenses(23, 12.50, 21.50, 40, 200);
*/