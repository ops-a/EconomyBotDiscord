const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wd")
    .setDescription("Withdraw money"),
  async execute(interaction) {
    await interaction.reply(`User ${interaction.user} withdrew money`);
  },
};
