/*
    Admin only. Adds tokens to a user from the central token repository stored in ../data/totalTokens.json:
    {
        "tokens": <number>
    }

*/

const { loadJSONasObject } = require("../utils/loadJSONData");
const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require('../db/updateUserBalance')

const addTokensHandler = async (interaction) => {
  // Get the total number of tokens remaining
  const { tokens } = loadJSONasObject("totalTokens.json");

  // Get the amount to be added
  const amount = interaction.options.getInteger("amount");

  // If tokens < amount, send a failure message and return
  if (tokens < amount) {
    await interaction.reply({
      content: `There is not enough tokens.`,
      ephemeral: true,
    });
    return;
  }

  // Else, get the user and add the amount to their cash balance.
  const user = interaction.options.getUser("user");

  const findUser = await getUserInfo(user.id);

  // If user is unregistered, send the corres msg and return
  if (!findUser) {
    await interaction.reply(
      `The user ${user} is not registered. Use ${bold(
        "/connect"
      )} to register first.`
    );
    return;
  }

  // Else add to the user's cash balance.
  await updateUserBalance(
    findUser.cashbalance + amount,
    findUser.bankbalance,
    user.id
  );

  await interaction.reply(`Successfully added ${amount} to ${user}`);

  return;
};

module.exports = addTokensHandler;
