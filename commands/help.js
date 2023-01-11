const { SlashCommandBuilder } = require("discord.js");
const helpHandler = require("../functions/helpHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get to know about my features."),
  async execute(interaction) {
    await helpHandler(interaction);
  },
};
