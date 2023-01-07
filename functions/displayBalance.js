const getUserInfo = require("../db/getUserInfo");

const displayBalance = async (interaction) => {
  const user = await getUserInfo(interaction.user.id);
  const { cashinhand, bankbalance } = user;
  console.log("user: ", user);
  await interaction.reply(
    `Cash: ${cashinhand}\nBank Balance: ${bankbalance}\nTotal: ${
      cashinhand + bankbalance
    }`
  );
};

module.exports = displayBalance;
