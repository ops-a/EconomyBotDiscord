const leaderboardHandler = require("../functions/leaderboardHandler");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lb")
    .setDescription("Displays the leaderboard."),
  async execute(interaction) {
    await leaderboardHandler(interaction);
  },
};
