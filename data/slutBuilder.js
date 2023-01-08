const slutActs = [
  {
    act: "You spent the last night with a friend ",
    earnPhrase:
      " and they had such a wonderful time that they gave you 50 tokens.",
    losePhrase:
      " and they robbed you of 50 tokens because you couldn't make them happy.",
    amount: 50,
  },
  {
    act: "Let's say you were busy with someone in the car parking of the mall,",
    earnPhrase: " they lost their wallet and you found 100 in it.",
    losePhrase: " you fell asleep after the action and lost 100 as a result.",
    amount: 100
  },
];

const slutBuilder = () => {
  let slutStr = "";

  const randomInt = Math.floor(Math.random() * slutActs.length);
  const earnOrLose = Math.random() > 0.5;
  const slutAct = slutActs[randomInt]

  // If earnOrLose is true, earn money, else lose money
  if (earnOrLose) {
    slutStr += slutAct.act + slutAct.earnPhrase;
  } else {
    slutStr += slutAct.act + slutAct.losePhrase;
  }

  const amount = earnOrLose ? slutAct.amount : -1 * slutAct.amount;
  return { slutStr: slutStr, amount: amount };
};

module.exports = slutBuilder;
