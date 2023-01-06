const { SlashCommandBuilder } = require("discord.js");
const withdrawMoney = require("../functions/withdrawMoney");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wd")
    .setDescription("Withdraw money")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount to be withdrawn.")
        .setMinValue(1)
        .setRequired(true)
    ),
  async execute(interaction) {
    await withdrawMoney(interaction);
  },
};
