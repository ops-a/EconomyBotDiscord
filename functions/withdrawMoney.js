const updateUserBalance = require("../db/updateUserBalance");
const getUserInfo = require("../db/getUserInfo");

const withdrawMoney = async (interaction, all) => {
  const amount = interaction.options.getInteger("amount");
  const user = await getUserInfo(interaction.user.id);

  const bankbalance = user.bankbalance;

  if (all) {
    if (user.bankbalance === 0) {
      interaction.reply("You have no tokens in your account.");
    } else {
      await updateUserBalance(
        user.cashinhand + user.bankbalance,
        user.bankbalance + user.bankbalance,
        user.userId
      );
      await interaction.reply(`Debited ${bankbalance} tokens from your account.`)
    }
  }
  if (amount > user.bankbalance) {
    await interaction.reply(
      `You don't have enough bank balance. Bank Balance: ${user.bankbalance}`
    );
  } else {
    await updateUserBalance(
      user.cashinhand + amount,
      user.bankbalance - amount,
      user.userid
    );

    await interaction.reply(`Withdrawn ${amount} from bank.`);
  }
};

module.exports = withdrawMoney;
