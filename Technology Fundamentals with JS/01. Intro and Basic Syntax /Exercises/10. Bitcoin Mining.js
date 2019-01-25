function buyBTC(gold) {

    let earnedMoney = 0,
        days = 1,
        bitcoins = 0,
        firstBTC = 0;

    const GOLD_PRICE = 67.51;
    const BTC_PRICE = 11949.16;

    for (let i = 0; i < gold.length; i++, days++) {
        let minedGold = Number(gold[i]);

        if (days % 3 == 0) {
            minedGold -= minedGold * 0.3;
        }

        earnedMoney += minedGold * GOLD_PRICE;

        while (earnedMoney >= BTC_PRICE) {
            earnedMoney -= BTC_PRICE;
            bitcoins++;
            if (firstBTC === 0) firstBTC = days;
        }
    }

    console.log(`Bought bitcoins: ${bitcoins}`);
    if (bitcoins > 0)
        console.log(`Day of the first purchased bitcoin: ${firstBTC}`);
    console.log(`Left money: ${earnedMoney.toFixed(2)} lv.`)
}

/*
buyBTC(['100', '200', '300']);
console.log('\n');
buyBTC(['50', '100']);
console.log('\n');
buyBTC(['3124.15', '504.212', '2511.124']);
*/