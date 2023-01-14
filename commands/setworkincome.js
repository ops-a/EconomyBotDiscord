const { SlashCommandBuilder } = require("discord.js");
const setWorkIncomeHandler = require("../functions/setWorkIncomeHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setworkincome")
    .setDescription("Set the work income range. Admin only.")
    .setDefaultMemberPermissions(0)
    .addIntegerOption((option) =>
      option
        .setName("lower")
        .setDescription("The lower limit (incl.) for the work income.")
        .setMinValue(1)
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("upper")
        .setDescription("The upper limit (excl.) for the work income.")
        .setRequired(true)
    ),
  async execute(interaction) {
    await setWorkIncomeHandler(interaction);
  },
};
