const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("Disconnect from your crypto wallet."),
  async execute(interaction) {
    await interaction.reply("You have been disconnected from your wallet.");
  },
};
