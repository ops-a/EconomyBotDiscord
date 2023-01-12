/*
  Builds an embed from the cards and values stored in the database.
*/
const { EmbedBuilder } = require("discord.js");
const { readCardsFromDB } = require("../../db/bjCardOps");
const { bold } = require("discord.js");

const getblackjackEmbed = async (intId, fieldStr) => {
  // Get userCards, dealerCards, userValue, dealerValue from the db.
  const { user_cards, dealer_cards, user_value, dealer_value } =
    await readCardsFromDB(intId);

  // If fieldStr is empty, add the default;
  fieldStr =
    fieldStr || "Instructions:\nhit: pull another card\nstand: end your turn";
  console.log("fieldStr: ", fieldStr);

  // Then build a new embed using those values
  const newEmbed = new EmbedBuilder()
    .setTitle("Try your luck with BlackJack")
    .setColor(0x0099ff)
    .setDescription(bold(fieldStr))
    .setTimestamp()
    .addFields([
      {
        name: "Your Hand",
        // value: "value",
        value: `${user_cards} \n\nvalue: ${user_value}\n\n`,
      },
      {
        name: "Dealer's Hand",
        // value: "value",
        value: `${dealer_cards} \n\nvalue: ${dealer_value}`,
      },
    ]);

  return newEmbed;
};

module.exports = getblackjackEmbed;
