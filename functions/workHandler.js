const workBuilder = require("../data/workBuilder");
const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");
const { loadJSONasObject } = require("../utils/loadJSONData");
const { bold, blockQuote } = require("discord.js");
const {
  readLastTimeStamp,
  writeLastTimeStamp,
} = require("../utils/cmdTimeStamps");

const workHandler = async (interaction) => {
  const userId = interaction.user.id;
  const user = await getUserInfo(userId);

  // Check if the user has work permission or not
  const user_roles = interaction.member._roles;
  const hasPermmission = hasWorkPermission(user_roles);

  if (!hasPermmission) {
    await interaction.reply({
      content:
        "You don't have permission to run this command. Obtain one of the work roles to get access.",
      ephemeral: true,
    });
    return;
  }

  // Read the last time user ran this command
  const { hours, mins } = await readLastTimeStamp("work", userId);

  if (mins > 0) {
    let reply = "You must wait ";
    if (hours > 0) {
      reply += bold(`${hours}h ${mins}m`);
    } else {
      reply += bold(mins + "m");
    }
    reply += " to work again. Take some rest.";
    await interaction.reply({ content: blockQuote(reply), ephemeral: true });
    return;
  }
  
  // Get a random work, and random income from work income range
  const income = Math.floor(Math.random() * (upper - lower) + lower);
  const workStr = workBuilder() + ` ${income}.`;
  const { lower, upper } = loadJSONasObject("workIncomes.json")
  


  // Update balance, write timestamp and send a reply
  await interaction.reply({ content: blockQuote(workStr) });
  await updateUserBalance(
    user.cashbalance + income,
    user.bankbalance,
    interaction.user.id
  );
  await writeLastTimeStamp("work", userId);
};

const hasWorkPermission = (roles) => {
  const workRoles = loadJSONasObject("workRoles.json");

  console.log("workRoles: ", workRoles);

  if (Object.keys(workRoles) == 0) {
    return true;
  }

  for (let i = 0; i < roles.length; i++) {
    if (workRoles[roles[i]]) {
      return true;
    }
  }

  return false;
};

module.exports = workHandler;
