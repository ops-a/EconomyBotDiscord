const { SlashCommandBuilder } = require("discord.js");
const depositMoney = require("../functions/depositMoney");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dpall")
    .setDescription("Deposit all of the money"),
  async execute(interaction) {
    await depositMoney(interaction, true);
  },
};
