const { SlashCommandBuilder } = require("discord.js");
const commitCrime = require('../functions/commitCrime')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("crime")
    .setDescription("Assign a crime and fine the user"),
  async execute(interaction) {
    await commitCrime(interaction); 
  },
};
