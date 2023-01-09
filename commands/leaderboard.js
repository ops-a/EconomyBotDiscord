const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const buildBtns = require("../components/buttons/rankingBtns");
const newEmbed = require("../components/embeds/rankingsEmbed");
const showLeaderboard = require("../functions/showLeaderboard");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lb")
    .setDescription("Show the leaderboard"),
  async execute(interaction) {
    // inside a command, event listener, etc.

    // const rankEmbed = newEmbed(1);
    await interaction.reply({
      embeds: [newEmbed(1)],
      components: [buildBtns(false, true)],
      ephemeral: true
    });
    // await showLeaderboard(interaction);
  },
};
