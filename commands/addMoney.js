const { SlashCommandBuilder } = require("discord.js");
const transferMoney = require("../functions/transferMoney");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addmon")
    .setDescription("Add money to a user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Tag a user to send money to")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("amount")
        .setDescription("Set the amount.")
        .setRequired(true)
    ),
  async execute(interaction) {
    await transferMoney(interaction);
  },
};
