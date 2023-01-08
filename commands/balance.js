const { SlashCommandBuilder } = require("discord.js");
const displayBalance = require("../functions/displayBalance");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bal")
    .setDescription("Displays the balance info."),
  async execute(interaction) {
    await displayBalance(interaction);
  },
};
