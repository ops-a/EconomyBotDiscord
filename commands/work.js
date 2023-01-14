const { SlashCommandBuilder } = require("discord.js");
const provideWork = require("../functions/workHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("Do some work and earn money. Hard work always pays off."),
  async execute(interaction) {
    await provideWork(interaction);
  },
};
