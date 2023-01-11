/*
  Builds an embed from the cards and values stored in the database.
*/
const { EmbedBuilder } = require("discord.js");
const { readCardsFromDB } = require("../../db/bjCardOps");

const getblackjackEmbed = async (id, fieldStr) => {
  // Get userCards, dealerCards, userValue, dealerValue from the db.
  const { user_cards, dealer_cards, user_value, dealer_value } =
    await readCardsFromDB(id);
  // console.log("Row: ", row);
  console.log("user_cards: ", user_cards, " dealer_value: ", dealer_value);

  // Then build a new embed using those values
  const newEmbed = new EmbedBuilder()
    .setTitle("Try your luck with BlackJack")
    .setColor(0x0099ff)
    .setDescription(fieldStr)
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
        value: `${dealer_cards} \nvalue: ${dealer_value}`,
      },
    ]);

  return newEmbed;
};

module.exports = getblackjackEmbed;
