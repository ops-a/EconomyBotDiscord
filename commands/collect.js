const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("collect")
    .setDescription("Collect your role income.")
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    await interaction.reply({ content: "This command is not functional yet." });
  },
};
