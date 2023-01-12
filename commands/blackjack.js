const { SlashCommandBuilder } = require("discord.js");
const { blackjackHandler } = require("../functions/blackjackHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bj")
    .setDescription("Play the game of blackjack")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount you want to bet.")
        .setRequired(true)
        .setMinValue(50)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    await blackjackHandler(interaction);
  },
};
