const slutBuilder = require("../data/slutBuilder")
const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");

const slutHandler = async (interaction) => {
  const userId = await interaction.user.id;
  const user = await getUserInfo(userId);

  const { slutStr, amount } = slutBuilder();

  // await interaction.reply({ content: slutStr, ephemeral: true });
  await interaction.reply(slutStr);
  await updateUserBalance(user.cashinhand + amount, user.bankbalance, userId);
};

module.exports = slutHandler;