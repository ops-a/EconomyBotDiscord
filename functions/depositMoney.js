const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");

const depositMoney = async (interaction) => {
  const amountStr = interaction.options.getString("amount");
  const user = await getUserInfo(interaction.user.id);

  if (user) {
    const amount = Number(amountStr);

    if (amountStr == "all") {
      if (user.cashinhand === 0) {
        interaction.reply(
          `You don't have any cash. Cash balance: ${user.bankbalance}`
        );
      } else {
        updateUserBalance(
          user.cashinhand - user.cashinhand,
          user.bankbalance + user.cashinhand,
          user.userid
        );
        interaction.reply(`Deposited ${user.cashinhand} to bank.`);
      }

      return;
    }

    if (!amount || amount <= 0) {
      interaction.reply(`Please provide a positive number.`);
      return;
    }
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
  } else {
    interaction.reply(
      "User not registered. Use /connect command to register first."
    );
  }
};

module.exports = depositMoney;
