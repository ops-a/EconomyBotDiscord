const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bj")
    .setDescription("Play the game of blackjack"),
  async execute(interaction) {},
};
