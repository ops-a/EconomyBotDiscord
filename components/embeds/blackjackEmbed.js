const { EmbedBuilder } = require("discord.js");
const { loadJSONasObject } = require("../../utils/loadJSONData");

// The embed would contain
const getblackjackEmbed = (id, fieldStr) => {
  const { userCards, dealerCards, userValue, dealerValue } = getFieldValues(id);

  const newEmbed = new EmbedBuilder()
    .setTitle("Try your luck with BlackJack")
    .setColor(0x0099ff)
    .setDescription(fieldStr)
    .setTimestamp()
    .addFields([
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
  const gameData = loadJSONasObject("bjGameData.json");
  return gameData[id];
};
module.exports = getblackjackEmbed;
