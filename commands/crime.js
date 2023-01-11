const { SlashCommandBuilder } = require("discord.js");
const commitCrime = require('../functions/commitCrime')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("crime")
    .setDescription("Enter into the world of crime and earn or lose all."),
  async execute(interaction) {
    await commitCrime(interaction); 
  },
};
