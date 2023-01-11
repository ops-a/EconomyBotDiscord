const getUserInfo = require("../db/getUserInfo");

const displayBalance = async (interaction) => {
  const user = await getUserInfo(interaction.user.id);
  const { cashbalance, bankbalance } = user;
  // console.log("user: ", user);
  await interaction.reply(
    `Cash: ${cashbalance}\nBank Balance: ${bankbalance}\nTotal: ${
      cashbalance + bankbalance
    }`
  );
};

module.exports = displayBalance;
