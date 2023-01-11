const { SlashCommandBuilder } = require("discord.js");
const addTokensHandler = require("../functions/addTokensHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addtokens")
    .setDescription("Add tokens to a user. Admin only.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to add tokens to.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of tokens to add.")
        .setRequired(true)
        .setMinValue(1)
    )
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    await addTokensHandler(interaction);
  },
};
