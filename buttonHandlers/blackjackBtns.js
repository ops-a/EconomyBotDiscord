const { bold } = require("discord.js");
const { readCardsFromDB } = require("../db/bjCardOps");
const db = require("../db/dbConnect");
const { loadJSONasObject, storeObjasJSON } = require("../utils/loadJSONData");
const { randomCard } = require("../functions/blackjackHandler");
const getblackjackEmbed = require("../components/embeds/blackjackEmbed");
const getBJBtns = require("../components/buttons/blackjackBtns");
const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");

const bjBtnHandler = async (interaction) => {
  const intId = interaction.message.interaction.id;
  const btnId = interaction.customId;
  // A new random card out of the remaining cards: remainingCards.json

  // Return an object of <id>: <cardsArr> key-value pairs.
  const remCardsObj = loadJSONasObject("remainingCards.json");
  const remCards = remCardsObj[intId];

  console.log("intId: ", intId, " remCards: ", remCards);
  const { card, value } = randomCard(remCards);

  // Update the remCardsObj
  remCardsObj[intId] = remCards;

  // Save the remCards to the remainingCards.json
  storeObjasJSON("remainingCards.json", remCardsObj);

  let result = null;

  if (btnId === "hit_btn") {
    // Update the database by appending the card.
    await addCardToDBUser({ card, value, intId });
    // Update the game, isDealersTurn is false
    await updateGame(interaction, false);
  } else if (btnId === "stand_btn") {
    while (result === null) {
      await addCardToDBDealer({ card, value, intId });
      result = await updateGame(interaction, true);
    }
  }
};

const updateGame = async (interaction, isDealersTurn) => {
  const intId = interaction.message.interaction.id;
  const { userid, amount, user_value, dealer_value } = await readCardsFromDB(
    intId
  );

  console.log("update game: ", user_value);
  // true means win, false means loss, null means game is unfinished
  let result = null;

  // If user's value is > 21, they lose, if equal to 21, they win.
  if (user_value > 21) {
    result = false;
    // return false;
  } else if (user_value === 21) {
    result = true;
    // return true;
  }

  // If it's the dealer's turn. User's value is less than 21.
  // check if the dealer > 21, == 21, or compare the user and dealer

  // If result is null, game is unfinished, so show buttons

  if (isDealersTurn) {
    if (dealer_value > 21) {
      result = true;
    } else if (dealer_value === 21) {
      result = false;
    } else if (user_value < dealer_value) {
      result = false;
    }
  }

  let embedStr = "";
  let showButtons = true;

  if (result === true) {
    // User wins. Update the message and add amount to db, disable buttons
    embedStr = `Result: Win ${amount}`;
    showButtons = false;
  } else if (result === false) {
    // User loses. Update the message and add amount to db, disable buttons
    embedStr = `Result: Loss ${amount}`;
    showButtons = false;
  } else if (result === null) {
    // Game is unfinished. Update the gameboard with the added cards.
  }

  const newEmbed = await getblackjackEmbed(intId, embedStr);
  const newBtnRow = getBJBtns(showButtons);

  // await interaction.message.interaction.reply("th")
  await interaction.editReply({
    embeds: [newEmbed],
    components: [newBtnRow],
    ephemeral: true,
  });

  // Add or subtract amount from the db.
  const amountVal = result ? amount : -amount;

  if (result !== null) {
    const user = await getUserInfo(userid);
    await updateUserBalance(
      user.cashbalance + amountVal,
      user.bankbalance,
      userid
    );
    await db.none("update blackjack set result=$1", result);
  }

  return result;
};

const addCardToDBUser = async ({ card, value, intId }) => {
  await db.none(
    "update blackjack set user_cards = concat(user_cards, $1), user_value = user_value + $2 where int_id=$3",
    [card, value, intId]
  );
};

const addCardToDBDealer = async ({ card, value, intId }) => {
  await db.none(
    "update blackjack set dealer_cards = concat(dealer_cards, $1), dealer_value = dealer_value + $2 where int_id=$3",
    [card, value, intId]
  );
};

module.exports = bjBtnHandler;
