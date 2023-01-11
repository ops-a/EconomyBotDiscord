const { SlashCommandBuilder } = require("discord.js");
const listWorkRolesHandler = require("../functions/listWorkRolesHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("listworkroles")
    .setDescription("Lists all the work roles. Admin only.")
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    await listWorkRolesHandler(interaction);
  },
};
