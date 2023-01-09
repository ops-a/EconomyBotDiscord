const { EmbedBuilder } = require("discord.js");
const cardEmojis = require("../../data/cardEmojis");
const { storeObjasJSON, loadJSONasObject } = require("../../utils/loadJSONData");

// The embed would contain
const getblackjackEmbed = (id) => {
  const { userCards, dealerCards, userValue, dealerValue } = getFieldValues(id);

  const newEmbed = new EmbedBuilder()
    .setTitle("Try your luck with BlackJack")
    .setColor(0x0099ff)
    .setDescription(null)
    .setTimestamp()
    .addFields([
      {
        name: "Instructions",
        value: "hit: pull another card\nstand: commit to the total\n\n",
      },
      {
        name: "Your Hand",
        value: `${userCards} \n\nvalue: ${userValue}\n\n`,
      },
      {
        name: "Dealer's Hand",
        value: `${dealerCards} \nvalue: ${dealerValue}`,
      },
    ]);

  return newEmbed;
};

const getFieldValues = (id) => {
  const gameData = loadJSONasObject("bjGameData.json")
  return gameData[id]

};
module.exports = getblackjackEmbed;
