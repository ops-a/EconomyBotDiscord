const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");

const depositMoney = async (interaction, all) => {
  let amount = interaction.options.getInteger("amount");
  const user = await getUserInfo(interaction.user.id);

  const cash = user.cashbalance;

  if(all) {
    amount = user.cashbalance;
  }

  // If /dpall command is used, deposit all cash to bank.
  // if (all) {
  //   if (cash === 0) {
  //     await interaction.reply("You have 0 cash.");
  //   } else {
  //     console.log("Cash depostiing: ", cash)
  //     await updateUserBalance(
  //       cash - cash,
  //       user.bankbalance + cash,
  //       user.userId
  //     );
  //     await interaction.reply(`Deposited ${cash} to bank balance.`);
  //   }

  //   return;
  // }

  if (amount > cash || cash === 0) {
    await interaction.reply(
      `You don't have enough cash. Cash Balance: ${cash}`
    );
  } else {
    await updateUserBalance(
      cash - amount,
      user.bankbalance + amount,
      user.userid
    );
    await interaction.reply(`Deposited ${amount} to bank.`);
  }
};

module.exports = depositMoney;
