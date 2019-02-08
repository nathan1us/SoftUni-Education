function calculateFuel(distance, passengers, fuelPrice) {
  let neededFuel = (distance / 100) * 7;
  neededFuel += passengers * 0.1;
  let moneyNeeded = neededFuel * fuelPrice;

  console.log(`Needed money for that trip is ${moneyNeeded}lv.`)
}

/*
calculateFuel(260, 9, 2.49);
calculateFuel(90, 14, 2.88);
*/
