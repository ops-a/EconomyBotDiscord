const updateUserBalance = require("../db/updateUserBalance");
const getUserInfo = require("../db/getUserInfo");

const withdrawMoney = async (interaction) => {
  const amount = interaction.options.getInteger("amount");
  const user = await getUserInfo(interaction.user.id);

  if (amount > user.bankbalance) {
    interaction.reply(
      `You don't have enough bank balance. Bank Balance: ${user.bankbalance}`
    );
  } else {
    updateUserBalance(
      user.cashinhand + amount,
      user.bankbalance - amount,
      user.userid
    );

    interaction.reply(`Withdrawn ${amount} from bank.`);
  }
};

module.exports = withdrawMoney;
