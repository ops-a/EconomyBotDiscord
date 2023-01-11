const { SlashCommandBuilder } = require("discord.js");
const addWorkRoleHandler = require("../functions/addWorkRoleHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setworkrole")
    .setDescription("Adds a role to the list of work roles. Admin only.")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("the role to be added")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    await addWorkRoleHandler(interaction);
  },
};
