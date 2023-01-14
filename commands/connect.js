const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("connect")
    .setDescription("Connect to your crypto wallet."),
    async execute(interaction) {
        await interaction.reply("You are now connected to your wallet.")
    }
}