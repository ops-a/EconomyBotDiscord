const { SlashCommandBuilder } = require("discord.js");
const rankHandler = require("../functions/rankHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Displays the rank on the leaderboard."),
  async execute(interaction) {
    await interaction.deferReply();
    await rankHandler(interaction);
  },
};
