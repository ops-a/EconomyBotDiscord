const getUserInfo = require("../db/getUserInfo");
const { bold, blockQuote } = require("discord.js");

// Checks if a user is registered or not
const performChecks = async (interaction) => {
  const cmdName = await interaction.commandName;
  const user = await getUserInfo(interaction.user.id);
  console.log("User: ", user);

  if (!user) {
    if (cmdName === "register") {
      return true;
    }
    await interaction.reply(
      blockQuote(
        `You are not registered. Use ${bold("/register")} to register.`
      )
    );
    return false;
  }

  return true;
};

module.exports = performChecks;
