const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");

const depositMoney = async (interaction) => {
  const amount = interaction.options.getInteger("amount");
  const user = await getUserInfo(interaction.user.id);

 if (amount > user.cashinhand) {
    interaction.reply(
      `You don't have enough cash. Cash Balance: ${user.cashinhand}`
    );
  } else {
    updateUserBalance(
      user.cashinhand - amount,
      user.bankbalance + amount,
      user.userid
    );
    interaction.reply(`Deposited ${amount} to bank.`);
  }
};

module.exports = depositMoney;
