function checkCashRegister(price, cash, cid) {
  let change  = cash*100 - price*100;
  let cidTotal = 0
  for (let amount of cid) {
    cidTotal += amount[1]*100
  }

  if (change > cidTotal){
    return {status: "INSUFFICIENT_FUNDS", change: []}
  } else if (change === cidTotal){
    return {status: "CLOSED", change: cid}
  } else {
    let answer = []
    cid=cid.reverse()
    let unitsOfMoney = {
      "ONE HUNDRED": 10000,
      "TWENTY": 2000,
      "TEN": 1000,
      "FIVE": 500,
      "ONE": 100,
      "QUARTER": 25,
      "DIME": 10,
      "NICKEL": 5,
      "PENNY": 1
    }
    for (let amount of cid){
      let holder = [amount[0], 0]
      amount[1]=amount[1]*100
      while (change >= unitsOfMoney[amount[0]] && amount[1] > 0){
        change -= unitsOfMoney[amount[0]]
        amount[1] -= unitsOfMoney[amount[0]]
        holder[1] += unitsOfMoney[amount[0]]/100
      }
      if (holder[1] > 0) {
          answer.push(holder)
      }
    }
    if (change > 0){
      return {status: "INSUFFICIENT_FUNDS", change: []}
    }
    return {status: "OPEN", change: answer}
  }
}


checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);