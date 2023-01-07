const { SlashCommandBuilder } = require("discord.js");
const depositMoney = require("../functions/depositMoney");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dp")
    .setDescription("Deposit money")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount to be deposited.")
        .setMinValue(1)
        .setRequired(true)
    ),
  async execute(interaction) {
    await depositMoney(interaction, false);
  },
};
