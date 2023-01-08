const crimes = [
  {
    crime: "You smuggle 10g of cocaine for Pablo Escobar ",
    earnPhrase: " and earn 50.",
    losePhrase: " but got caught and lost 50.",
    amount: 100,
  },
  {
    crime: "A policeman caught you stealing a car ",
    earnPhrase: " but you bribe him and earn 100 by selling the car.",
    losePhrase: " and he took 100 from you.",
    amount: 100,
  },
  {
    crime: "You have been caught red handed in a bank robbery ",
    earnPhrase: " but you succeed in fleeing and gain 150 as a result.",
    losePhrase: " and are sent to a prison and fined 150.",
    amount: 150,
  },
];

const crimeBuilder = () => {
  let crimeStr = "";

  const randomInt = Math.floor(Math.random() * crimes.length);
  const crimeObj = crimes[randomInt]
  const earnOrLose = Math.random() > 0.5;

  // If earnOrLose is true, earn money, else lose money
  if (earnOrLose) {
    crimeStr += crimeObj.crime + crimeObj.earnPhrase;
  } else {
    crimeStr += crimeObj.crime + crimeObj.losePhrase;
  }

  const amount = earnOrLose ? crimeObj.amount : -1 * crimeObj.amount;
  return { crimeStr: crimeStr, amount: amount };
};

module.exports = crimeBuilder;
