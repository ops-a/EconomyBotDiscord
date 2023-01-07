const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rob")
    .setDescription(
      "Rob another user. A 50/50 chance that you earn or lose money."
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("Choose your victim.")
    ),

  async execute(interaction) {
    await interaction.reply("This command is not functional yet.");
  },
};
