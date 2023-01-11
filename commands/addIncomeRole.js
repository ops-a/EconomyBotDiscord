const { SlashCommandBuilder } = require("discord.js");
const addIncomeRoleHandler = require("../functions/addIncomeRoleHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setincomerole")
    .setDescription("Set roles for which users can collect income. Admin only.")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Specify the income role.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("income")
        .setDescription("Set the amount to be earned as income.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    await addIncomeRoleHandler(interaction);
  },
};
