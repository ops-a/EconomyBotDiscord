/* 
    Collects income if the user has any of the roles in the ../data/incomeRoles.json file:
    {
        "roles": {
            <id>: <name>
        }
    }
*/

const getUserInfo = require("../db/getUserInfo");
const { loadJSONasObject } = require("../utils/loadJSONData");
const updateUserBalance = require("../db/updateUserBalance");

const collectHandler = async (interaction) => {
  // Load all the roles from the json file
  const { roles } = loadJSONasObject("incomeRoles.json");

  // Get the role ids that user has
  const user_roles = await interaction.member._roles;

  // For each role that user has, add income if the role qualifies for income,
  let amount = 0;

  for (let i = 0; i < user_roles.length; i++) {
    if (roles[user_roles[i]]) {
      amount += 50;
    }
  }

  // If no income, send a corres msg.
  if (amount === 0) {
    await interaction.reply({
      content: `You don't qualify for any role income.`,
    });
    return;
  }

  const userId = await interaction.user.id;
  const user = await getUserInfo(userId);

  await updateUserBalance(user.cashbalance + 50, user.bankbalance, userId);

  await interaction.reply({
    content: `You have successfully collected ${amount} for your various roles.`,
  });
};

module.exports = collectHandler;
