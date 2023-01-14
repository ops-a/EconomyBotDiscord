const { quote, bold } = require("discord.js");
const getRankingsDesc = require("../db/getRankingsDesc");

const rankHandler = async (interaction) => {
  // Rankings sorted by total balance in descending order.
  const sortedUsersDesc = await getRankingsDesc();
  await interaction.deferReply();

  // return;
  const userId = await interaction.user.id;
  console.log("User id: ", userId);

  // Find the user's rank, that is the index of the user object and return it.
  for (let i = 0; i < sortedUsersDesc.length; i++) {
    const { userid, cashbalance, bankbalance } = sortedUsersDesc[i];

    if (userid == userId) {
      await interaction.editReply({
        content: quote(`Your rank is ${bold(i + 1)}
            \n${bold("Cash")}: ${cashbalance}
            \n${bold("Bank")}: ${bankbalance}
            \n${bold("Total")}: ${cashbalance + bankbalance}`),
      });

      return;
    }
  }

  await interaction.editReply({
    content: quote("Soemthing went wrong!"),
    ephemeral: true,
  });
};

module.exports = rankHandler;
