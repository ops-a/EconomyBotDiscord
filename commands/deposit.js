const { SlashCommandBuilder } = require("discord.js");
const depositMoney = require("../functions/depositMoney");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dp")
    .setDescription("Deposit money")
    .addStringOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount to be deposited.")
        .setRequired(true)
    ),
  async execute(interaction) {
    await depositMoney(interaction);
  },
};
