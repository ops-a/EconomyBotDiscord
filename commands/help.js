const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("./connect");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Displays userful information about the bot."),
  async execute(interaction) {
    console.log("Useful Info");
    interaction.reply('Useful info')
  },
};
