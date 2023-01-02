const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("crime")
    .setDescription("Assign a crime and fine the user"),
  async execute(interaction) {
    interaction.reply('You have committed a crime and have been fined for it')
  },
};
