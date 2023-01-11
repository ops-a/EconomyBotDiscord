const getUserInfo = require("../db/getUserInfo");
const { bold } = require('discord.js')

// Checks if a user is registered or not
const performChecks = async (interaction) => {
  const cmdName = interaction.commandName;
  const user = await getUserInfo(interaction.user.id);
  console.log("User: ", user);

  if (!user) {
    if (cmdName === "connect") {
      return true;
    }
    interaction.reply(`You are not registered. Use ${bold('/connect')} to register.`);
    return false;
  }

  return true;
};

module.exports = performChecks;
