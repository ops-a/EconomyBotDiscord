const getUserInfo = require("../db/getUserInfo");
const { bold } = require("discord.js");
const updateUserBalance = require("../db/updateUserBalance");
const {
  readLastTimeStamp,
  writeLastTimeStamp,
} = require("../utils/cmdTimeStamps");

const robHandler = async (interaction) => {
  console.log("user ", interaction.user.id, " ");
  const userId = interaction.user.id;

  const userMention = interaction.options.getUser("user");
  const taggedUserId = userMention.id;

  const user = await getUserInfo(userId);
  const taggedUser = await getUserInfo(taggedUserId);

  const { hours, mins } = await readLastTimeStamp("rob", userId);

  if (mins > 0) {
    let reply = "You must wait ";
    if (hours > 0) {
      reply += bold(`${hours}h ${mins}m`);
    } else {
      reply += bold(mins + "m");
    }
    reply += " to rob again. Take some rest.";
    await interaction.reply({ content: reply, ephemeral: true });
    return;
  }

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
    await updateUserBalance(user.cashbalance + amount, user.bankbalance, userId);
    await updateUserBalance(
      taggedUser.cashbalance - amount,
      taggedUser.bankbalance,
      taggedUserId
    );
    await interaction.reply(
      `You successfully robbed ${userMention} of ${amount}.`
    );
  } else {
    await updateUserBalance(user.cashbalance - amount, user.bankbalance, userId);
    await updateUserBalance(
      taggedUser.cashbalance + amount,
      taggedUser.bankbalance,
      taggedUserId
    );
    await interaction.reply(
      `Your robbery of ${userMention} was unsuccessful and instead you were fined ${amount}.`
    );
  }

  await writeLastTimeStamp("rob", userId);
};

module.exports = robHandler;
