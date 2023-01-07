const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Displays the rank on the leaderboard."),
  async execute(interaction) {
    await interaction.reply("This command is not functional yet.");
  },
};
