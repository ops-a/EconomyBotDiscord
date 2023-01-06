const { SlashCommandBuilder } = require("discord.js");
const transferMoney = require("../functions/transferMoney");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("transfer")
    .setDescription("Transfer money to another user from bank balance.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Tag a user to send money to")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Set the amount.")
        .setMinValue(1)
        .setRequired(true)
    ),
  async execute(interaction) {
    await transferMoney(interaction);
  },
};
