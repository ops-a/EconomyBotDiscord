const updateUserBalance = require("../db/updateUserBalance");
const getUserInfo = require("../db/getUserInfo");

const withdrawMoney = async (interaction, all) => {
  let amount = await interaction.options.getInteger("amount");
  const user = await getUserInfo(interaction.user.id);

  const bankbalance = user.bankbalance;

  if (all) {
    amount = user.bankbalance;
  }

  // if (all) {
  //   if (bankbalance === 0) {
  //     await interaction.reply("You have no tokens in your account.");
  //   } else {
  //     await updateUserBalance(
  //       user.cashbalance + bankbalance,
  //       user.bankbalance - bankbalance,
  //       user.userId
  //     );
  //     await interaction.reply(
  //       `Debited ${bankbalance} tokens from your account.`
  //     );
  //   }
  // }

  if (amount > bankbalance || bankbalance === 0) {
    await interaction.reply(
      `You don't have enough bank balance. Bank Balance: ${bankbalance}`
    );
  } else {
    await updateUserBalance(
      user.cashbalance + amount,
      user.bankbalance - amount,
      user.userid
    );

    await interaction.reply(`Withdrawn ${amount} from bank.`);
  }
};

module.exports = withdrawMoney;
