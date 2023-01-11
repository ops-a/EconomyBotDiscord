const { bold } = require("discord.js");
const crimeBuilder = require("../data/crimeBuilder");
const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");
const {
  readLastTimeStamp,
  writeLastTimeStamp,
} = require("../utils/cmdTimeStamps");

const commitCrime = async (interaction) => {
  const userId = await interaction.user.id;
  const user = await getUserInfo(userId);

  // Check if the time limit for crime has been reached.
  const { hours, mins } = await readLastTimeStamp("crime", userId);

  if (mins > 0) {
    let reply = "You must wait ";
    if (hours > 0) {
      reply += bold(`${hours}h ${mins}m`);
    } else {
      reply += bold(mins + "m");
    }
    reply += " before commiting another crime.";
    await interaction.reply({ content: reply, ephemeral: true });
    return;
  }

  // Returns crime string and amount (+ve or -ve)
  const { crimeStr, amount } = crimeBuilder();

  // await interaction.reply({ content: crimeStr, ephemeral: true });
  await interaction.reply(crimeStr);

  // Update balance, add (or subtract cash)
  await updateUserBalance(user.cashbalance + amount, user.bankbalance, userId);

  // Writes the timestamp for crime.
  await writeLastTimeStamp("crime", userId);
};

module.exports = commitCrime;
