const { SlashCommandBuilder } = require("discord.js");
const slutHandler = require("../functions/slutHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slut")
    .setDescription(
      "Engage in sexual activities. 50/50 chance that you gain or lose tokens."
    ),
  async execute(interaction) {
    await slutHandler(interaction);
  },
};
