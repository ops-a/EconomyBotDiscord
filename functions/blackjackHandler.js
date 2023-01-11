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
  //   await interaction.reply({ content: `You don't have enough cash balance.`, ephemeral: true })
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
  storeObjasJSON("remainingCards.jons", remCardsObj);

  // await interaction.reply({ content: `int id: ${intid}, int: ${interaction.message}`})

  let descStr = "Instructions:\nhit: pull another card\nstand: end your turn";

  // Build an embed using desc str and interaction id
  const newEmbed = await getblackjackEmbed(intId, descStr);
  console.log("newEmbed: ", newEmbed);

  // Get hit and stand buttons
  const newBtnRow = getBJBtns(true);

  await interaction.reply({
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

// Adds new cards or initializes a new game object and returns cards and values
const addCardToUser = (id) => {
  const gameData = loadJSONasObject("bjGameData.json");
  const userCard = randomCard(cardEmojis);
  console.log("User card: ", userCard);

  gameData[id].userCards.push(userCard.card);
  gameData[id].userValue += userCard.value;

  storeObjasJSON("bjGameData.json", gameData);

  return gameData[id].userValue;
};

const addCardToDealer = (id) => {
  const gameData = loadJSONasObject("bjGameData.json");
  const dealerCard = randomCard(cardEmojis);

  gameData[id].dealerCards.push(dealerCard.card);
  gameData[id].dealerValue += dealerCard.value;

  storeObjasJSON("bjGameData.json", gameData);

  return gameData[id].dealerValue;
};

const newCardsObj = (id) => {
  const gameData = loadJSONasObject("bjGameData.json");

  if (gameData[id] === undefined) {
    gameData[id] = {
      userCards: [],
      dealerCards: [],
      userValue: 0,
      dealerValue: 0,
    };
  }

  for (let i = 0; i < 2; i++) {
    const userCard = randomCard(cardEmojis);
    const dealerCard = randomCard(cardEmojis);

    gameData[id].userCards.push(userCard.card);
    gameData[id].dealerCards.push(dealerCard.card);
    gameData[id].userValue += userCard.value;
    gameData[id].dealerValue += dealerCard.value;
  }

  // const gameData = loadJSONasObject("bjGameData.json");

  storeObjasJSON("bjGameData.json", gameData);

  return gameData[id];
};

// Removes a card and  and return the card and the its value
module.exports = {
  blackjackHandler,
  randomCard,
  addCardToDealer,
  addCardToUser,
};
