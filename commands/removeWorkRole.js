const { SlashCommandBuilder } = require("discord.js");
const removeWorkRoleHandler = require("../functions/removeWorkRoleHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removeworkrole")
    .setDescription("Remove a role from the list of  work roles. Admin only.")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("the role to be removed")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    await removeWorkRoleHandler(interaction);
  },
};
