const { SlashCommandBuilder } = require("discord.js");
const setRoleHandler = require("../functions/setRoleHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setrole")
    .setDescription("Set a role to a user. Admin only.")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("the role to be assigned")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to assign role to")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    await setRoleHandler(interaction);
  },
};
