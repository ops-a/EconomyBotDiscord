const { loadJSONasObject, storeObjasJSON } = require("../utils/loadJSONData");

const removeWorkRoleHandler = async (interaction) => {

  const role = interaction.options.getRole("role");
  const dataObj = loadJSONasObject("workRoles.json");
  const roleIndex = dataObj.roleIds.indexOf(role.id);

  if (roleIndex === -1) {
    await interaction.reply({
      content: "Cannot remove unset role.",
      ephemeral: true,
    });
  } else {
    // Remove both role name and role id 
    dataObj.workRoles.splice(roleIndex, 1);
    dataObj.roleIds.splice(roleIndex, 1);

    storeObjasJSON(dataObj, "workRoles.json")

    await interaction.reply({
      content: `Role ${role} successfully removed from work role.`,
      ephemeral: true,
    });
  }
  console.log("interaction role added: ", role.name);
//   await interaction.reply({ content: `role: ${role}`, ephemeral: true });
};

module.exports = removeWorkRoleHandler;
