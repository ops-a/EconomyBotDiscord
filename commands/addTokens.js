const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addtok")
    .setDescription("Add tokens to a user. Administrator access only."),
  async execute(interaction) {
    await interaction.reply("This command is not functional yet.");
  },
};
