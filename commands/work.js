const { SlashCommandBuilder } = require("discord.js");
const provideWork = require('../functions/provideWork')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("Do some work and earn."),
  async execute(interaction) {
    await provideWork(interaction);
  },
};
