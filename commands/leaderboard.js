const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lb")
    .setDescription("Show the leaderboard"),
  async execute(interaction) {
    interaction.reply("Put a leaderboard here.");
  },
};
