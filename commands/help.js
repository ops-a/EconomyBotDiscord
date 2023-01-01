const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Displays userful information about the bot."),
  async execute(interaction) {
    console.log("Useful Info");
    interaction.reply('Useful info')
  },
};
