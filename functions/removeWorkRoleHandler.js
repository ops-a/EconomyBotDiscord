const { loadJSONasObject, storeObjasJSON } = require("../utils/loadJSONData");

/*
  Admin only.
  Removes the work role from the workRoles.json in ../data:
  {
    <id>: <name>,
    <id>: <name>,
  }
*/
const removeWorkRoleHandler = async (interaction) => {
  const role = interaction.options.getRole("role");
  const workRoles = loadJSONasObject("workRoles.json");

  if (!workRoles[role.id]) {
    await interaction.reply({
      content: "Cannot remove unset role.",
      ephemeral: true,
    });
  } else {
    // Remove the role
    delete workRoles[role.id];
    storeObjasJSON("workRoles.json", workRoles);

    await interaction.reply({
      content: `Role ${role} successfully removed from work role.`,
      ephemeral: true,
    });
  }
  console.log("work role removed: ", role.name);
};

module.exports = removeWorkRoleHandler;
