const db = require('./dbConnect')

const readCardsFromDB = async (intId) => {
  const row = await db.one("select * from blackjack where int_id=$1", intId);
  console.log("Blackjack row: ", row);
  return row;
};

const writeCardsToDB = async (
  intId,
  userId,
  amount,
  userCards,
  dealerCards,
  userValue,
  dealerValue
) => {
  const id = await db.one(
    "insert into blackjack values($1, $2, $3, now(), false, $4, $5, $6, $7) returning int_id",
    [intId, userId, amount, userCards, dealerCards, userValue, dealerValue]
  );

  if (id) {
    console.log("successfully added cards to db");
  } else {
    console.log("there was some error adding cards");
  }
};

module.exports = { readCardsFromDB, writeCardsToDB };
