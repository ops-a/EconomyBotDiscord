const getBJBtns = require("../components/buttons/blackjackBtns");
const getblackjackEmbed = require("../components/embeds/blackjackEmbed");
const cardEmojis = require("../data/cardEmojis");
const { storeObjasJSON, loadJSONasObject } = require("../utils/loadJSONData");

const blackjackHandler = async (interaction) => {
  // Send an embed and an actionbuilder with two buttons
  //   const remainingCards = cardEmojis.slice();
  //   const userCards = [];
  //   const dealerCards = [];
  // console.log("int id: ", interaction.id);
  // Save the initial data to a json file
  // const { userCards, dealerCards, userValue, dealerValue } = newCardsObj(
  //   interaction.user.id,
  //   2
  // );
  const userId = interaction.user.id;
  const gameData = loadJSONasObject("bjGameData.json")
  if(gameData[userId]) {
    await interaction.reply({ content: "Finish your last game first.", ephemeral: true})
    return;
  }

  newCardsObj(userId)

  let descStr = "Instructions:\nhit: pull another card\nstand: end your turn"
  const newEmbed = getblackjackEmbed(userId, descStr);
  const newBtnRow = getBJBtns(true);

  await interaction.reply({
    embeds: [newEmbed],
    components: [newBtnRow],
    ephemeral: true,
  });
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

// Removes a card and returns it
const randomCard = (cards) => {
  const randomInt = Math.floor(Math.random() * cards.length);
  const card = cards.splice(randomInt, 1);

  return card[0];
};

module.exports = {
  blackjackHandler,
  randomCard,
  addCardToDealer,
  addCardToUser,
};
