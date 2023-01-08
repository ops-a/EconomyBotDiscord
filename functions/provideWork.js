const workBuilder = require("../data/workBuilder");
const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");
const { loadJSONasObject } = require("../utils/loadJSONData");

const provideWork = async (interaction) => {
  const { workStr, earn } = workBuilder();
  const user = await getUserInfo(interaction.user.id);
  // user_roles is an array role ids
  const user_roles = interaction.member._roles;

  const hasPermmission = hasWorkPermission(user_roles);
  //   await interaction.reply({ content: workStr, ephemeral: true });
  // console.log("work roles: ", interaction.member._roles);
  // console.log("work channel roles: ", interaction.guild.roles);
  // console.log("work roles: ", interaction.member);
  if (!hasPermmission) {
    await interaction.reply({
      content: "You don't have permission to run this command. Obtain one of the work roles to get access.",
      ephemeral: true,
    });
    return;
  }
  await interaction.reply({ content: workStr, ephemeral: true });
  // Update cash balance afterwards
  await updateUserBalance(
    user.cashinhand + earn,
    user.bankbalance,
    interaction.user.id
  );
};

const hasWorkPermission = (roles) => {
  const dataObj = loadJSONasObject("workRoles.json");
  const workRoles = dataObj.roleIds;

  console.log("hasPermissions: ", workRoles)
  if(workRoles.length === 0) {
    return true;
  }

  for (let i = 0; i < workRoles.length; i++) {
    for (let j = 0; j < roles.length; j++) {
      if (workRoles[i] === roles[j]) {
        return true;
      }
    }
  }

  return false;
};

module.exports = provideWork;
