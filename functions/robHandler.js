const getUserInfo = require("../db/getUserInfo");
const { bold } = require('discord.js')
const updateUserBalance = require("../db/updateUserBalance");

const robHandler = async (interaction) => {
  console.log("user ", interaction.user.id, " ");
  const userId = interaction.user.id;

  const userMention = interaction.options.getUser("user");
  const taggedUserId = userMention.id;

  const user = await getUserInfo(userId);
  const taggedUser = await getUserInfo(taggedUserId);

//   console.log('mentioned User: ', taggedUser)
  if (!taggedUser) {
    await interaction.reply(
      `Oh, no! ${userMention} is not registered. Use ${bold(
        "/connect"
      )} to register first.`
    );
    return;
  }

  const earnOrLose = Math.random() > 0.5;
  const amount = 50;

  if (earnOrLose) {
    updateUserBalance(user.cashinhand + amount, user.bankbalance, userId);
    updateUserBalance(
      taggedUser.cashinhand - amount,
      taggedUser.bankbalance,
      taggedUserId
    );
    await interaction.reply(
      `You successfully robbed ${userMention} of ${amount}.`
    );
  } else {
    updateUserBalance(user.cashinhand - amount, user.bankbalance, userId);
    updateUserBalance(
      taggedUser.cashinhand + amount,
      taggedUser.bankbalance,
      taggedUserId
    );
    await interaction.reply(
      `Your robbery of ${userMention} was unsuccessful and instead you were fined ${amount}.`
    );
  }

//   await interaction.reply("rob");
};

module.exports = robHandler;
