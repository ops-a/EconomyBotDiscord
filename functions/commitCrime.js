const randomCrime = require("../data/crimeBuilder");
const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");

const commitCrime = async (interaction) => {
  const userId = interaction.user.id;
  const user = await getUserInfo(userId);

  const crimeCommited = randomCrime();
  const earnOrLose = Math.random() > 0.5;

  // If true, user earns money, otherwise loses money.
  if (earnOrLose) {
    await updateUserBalance(
      user.cashinhand + crimeCommited.fine,
      user.bankbalance,
      userId
    );
    await interaction.reply(
      `${crimeCommited.crime} and earned ${crimeCommited.fine}`
    );
  } else {
    await updateUserBalance(
      user.cashinhand - crimeCommited.fine,
      user.bankbalance,
      userId
    );
    await interaction.reply(
      `${crimeCommited.crime} and were fined ${crimeCommited.fine}`
    );
  }
};

module.exports = commitCrime;
