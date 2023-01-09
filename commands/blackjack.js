const { SlashCommandBuilder } = require("discord.js");
const { blackjackHandler } = require("../functions/blackjackHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bj")
    .setDescription("Play the game of blackjack"),
  async execute(interaction) {
    await blackjackHandler(interaction);
  },
};
