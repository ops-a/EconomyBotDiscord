const { SlashCommandBuilder } = require("discord.js");
const addUser = require("../db/addAUser");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Registers the user to the database."),
  async execute(interaction) {
    await addUser(interaction);
  },
};
