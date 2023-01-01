const updateUserBalance = require("../db/updateUserBalance");
const getUserInfo = require("../db/getUserInfo");

const withdrawMoney = async (interaction) => {
  const amountStr = interaction.options.getString("amount");
  const user = await getUserInfo(interaction.user.id);

  if (user) {
    const amount = Number(amountStr);
    if (amountStr == "all") {
      if (user.bankbalance === 0) {
        interaction.reply(
          `You don't have any money in bank. Bank balance: ${user.bankbalance}`
        );
      } else {
        updateUserBalance(user.bankbalance, -user.bankbalance);
      }
      return;
    }

    if (!amount || amount <= 0) {
      interaction.reply(`Please provide a positive number.`);
      return;
    }
    if (amount > user.bankbalance) {
      interaction.reply(
        `You don't have enough bank balance. Bank Balance: ${user.bankbalance}`
      );
    } else {
      updateUserBalance(amount, -amount);
    }
  } else {
    interaction.reply(
      "User not registered. Use /connect command to register first."
    );
  }
};

module.exports = withdrawMoney;
