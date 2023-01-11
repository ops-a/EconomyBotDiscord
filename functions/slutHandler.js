const slutBuilder = require("../data/slutBuilder");
const getUserInfo = require("../db/getUserInfo");
const { bold } = require("discord.js");
const updateUserBalance = require("../db/updateUserBalance");
const {
  readLastTimeStamp,
  writeLastTimeStamp,
} = require("../utils/cmdTimeStamps");

const slutHandler = async (interaction) => {
  const userId = await interaction.user.id;
  const user = await getUserInfo(userId);

  const { slutStr, amount } = slutBuilder();

  const { hours, mins } = await readLastTimeStamp("slut", userId);

  if (mins > 0) {
    let reply = "You must wait ";
    if (hours > 0) {
      reply += bold(`${hours}h ${mins}m`);
    } else {
      reply += bold(mins + "m");
    }
    reply += " to run this command again. Take some rest.";
    await interaction.reply({ content: reply, ephemeral: true });
    return;
  }

  // await interaction.reply({ content: slutStr, ephemeral: true });
  await interaction.reply(slutStr);
  await updateUserBalance(user.cashbalance + amount, user.bankbalance, userId);

  await writeLastTimeStamp("slut", userId);
};

module.exports = slutHandler;
