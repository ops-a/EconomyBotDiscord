const crimeBuilder = require("../data/crimeBuilder");
const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");

const commitCrime = async (interaction) => {
  const userId = await interaction.user.id;
  const user = await getUserInfo(userId);

  const { crimeStr, amount } = crimeBuilder();

  // await interaction.reply({ content: crimeStr, ephemeral: true });
  await interaction.reply(crimeStr);
  await updateUserBalance(user.cashinhand + amount, user.bankbalance, userId);
};

module.exports = commitCrime;
