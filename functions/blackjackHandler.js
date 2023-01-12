/*
  Handles the blackjack game.
  Creates two cards for the user, one for the dealer, stores them into the db table blackjack, and displays the blackjack embed with buttons.
  The remaining cards are stored in ../data/remainingCards.json identifiable by the interaction id:
  {
    <id>: [
      {
        "card": <emoji>, "value": <value>
      }
    ] 
  }
*/

const { urlencoded } = require("express");
const getBJBtns = require("../components/buttons/blackjackBtns");
const getblackjackEmbed = require("../components/embeds/blackjackEmbed");
const cardEmojis = require("../data/cardEmojis");
const getUserInfo = require("../db/getUserInfo");
const { readCardsFromDB, writeCardsToDB } = require("../db/bjCardOps");
const { storeObjasJSON, loadJSONasObject } = require("../utils/loadJSONData");

const blackjackHandler = async (interaction) => {
  const userId = interaction.user.id;
  const intId = interaction.id;
  const amount = interaction.options.getInteger("amount");

  // Check if the user has enough cash balance.
  const user = await getUserInfo(userId);
  console.log("User: ", user);

  console.log("User's cash: ", user.cashbalance);
  // if(user.cashbalance < amount) {
  //   await interaction.editReply({ content: `You don't have enough cash balance.`, ephemeral: true })
  //   return;
  // }

  // Check if the user has played three games in last one hour. If yes, tell them to wait for one hour from the last game and return. Otherwise, proceed.

  // Create two cards for the user, one for the dealer.
  // Also store their values.
  let userCards = "";
  let dealerCards = "";
  let userValue = 0;
  let dealerValue = 0;

  // Create a new object in json containing the full list of cards.
  const remCardsObj = loadJSONasObject("remainingCards.json");
  remCardsObj[intId] = cardEmojis.slice();

  // Add two cards to user, one to the dealer, add their respective values. Delete those cards from the json file. Store these values to the db.
  for (let i = 0; i < 2; i++) {
    let { card, value } = randomCard(remCardsObj[intId]);
    userCards += card;
    userValue += value;
  }

  let { card, value } = randomCard(remCardsObj[intId]);
  dealerCards += card;
  dealerValue += value;

  // Write them to the db.
  await writeCardsToDB(
    intId,
    userId,
    amount,
    userCards,
    dealerCards,
    userValue,
    dealerValue
  );

  // Save the remaining cards to the json file
  storeObjasJSON("remainingCards.json", remCardsObj);

  // await interaction.editReply({ content: `int id: ${intid}, int: ${interaction.message}`})


  // Build an embed using desc str and interaction id
  const newEmbed = await getblackjackEmbed(intId, "");
  console.log("newEmbed: ", newEmbed);

  // Get hit and stand buttons
  const newBtnRow = getBJBtns(true);

  await interaction.editReply({
    embeds: [newEmbed],
    components: [newBtnRow],
    ephemeral: true,
  });
};

const randomCard = (cards) => {
  const randomInt = Math.floor(Math.random() * cards.length);
  const { card, value } = cards.splice(randomInt, 1)[0];

  return { card, value };
};

module.exports = {
  blackjackHandler,
  randomCard,
};
