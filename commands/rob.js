const { SlashCommandBuilder } = require("discord.js");
const robHandler = require('../functions/robHandler')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rob")
    .setDescription(
      "Rob another user. A 50/50 chance that you earn or lose money."
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Choose your victim.")
        .setRequired(true)
    ),

  async execute(interaction) {
    await robHandler(interaction);
  },
};
