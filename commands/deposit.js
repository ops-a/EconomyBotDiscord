const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("dp").setDescription("Deposit money"),
  async execute(interaction) {
    await interaction.reply(`User ${interaction.user} deposited money`);
  },
};
