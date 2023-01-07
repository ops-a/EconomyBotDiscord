const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const row = require("../components/buttons/rankingBtns");
const newEmbed = require('../components/embeds/rankingsEmbed')
const showLeaderboard = require("../functions/showLeaderboard");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lb")
    .setDescription("Show the leaderboard"),
  async execute(interaction) {
    // inside a command, event listener, etc.
    
    // const rankEmbed = newEmbed(1);
    console.log("interaction: ", interaction);
    await interaction.reply({
      content: "Interaction: ",
      embeds: [newEmbed(1)],
      ephemeral: true,
      components: [row],
    });
    // await showLeaderboard(interaction);
  },
};
