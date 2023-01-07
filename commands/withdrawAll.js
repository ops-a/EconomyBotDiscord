const { SlashCommandBuilder } = require("discord.js");
const withdrawMoney = require('../functions/withdrawMoney');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wdall")
    .setDescription("Withdraw all of the tokens from bank to cash."),
  async execute(interaction) {
    await withdrawMoney(interaction, true);
  },
};
