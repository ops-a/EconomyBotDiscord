const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");

const depositMoney = async (interaction, all) => {
  const amount = interaction.options.getInteger("amount");
  const user = await getUserInfo(interaction.user.id);

  const cash = user.cashinhand;

  if (all) {
    if (cash === 0) {
      interaction.reply("You have 0 cash.");
    } else {
      updateUserBalance(cash - cash, user.bankbalance + cash, user.userId);
      interaction.reply(`Deposited ${cash} to bank balance.`);
    }

    return;
  }

  if (amount > user.cashinhand) {
    interaction.reply(
      `You don't have enough cash. Cash Balance: ${user.cashinhand}`
    );
  } else {
    updateUserBalance(cash - amount, user.bankbalance + amount, user.userid);
    interaction.reply(`Deposited ${amount} to bank.`);
  }
};

module.exports = depositMoney;
