const { SlashCommandBuilder } = require("discord.js");
const removeRoleHandler = require("../functions/removeRoleHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removerole")
    .setDescription("Remove a role from the user. Admin only.")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("the role to be revoked")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("the user to remove role from")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    await removeRoleHandler(interaction);
  },
};
