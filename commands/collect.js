const { SlashCommandBuilder } = require("discord.js");
const collectHandler = require("../functions/collectHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("collect")
    .setDescription("Collect your role income."),
  async execute(interaction) {
    await collectHandler(interaction);
  },
};
