const workBuilder = require("../data/workBuilder");
const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");

const provideWork = async (interaction) => {
  const { workStr, earn } = workBuilder();
  const user = await getUserInfo(interaction.user.id);

//   await interaction.reply({ content: workStr, ephemeral: true });
  await interaction.reply(workStr);
  // Update cash balance afterwards
  await updateUserBalance(
    user.cashinhand + earn,
    user.bankbalance,
    interaction.user.id
  );
};

module.exports = provideWork;
