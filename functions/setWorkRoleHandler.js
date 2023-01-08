const { loadJSONasObject, storeObjasJSON } = require("../utils/loadJSONData");

const setWorkRoleHandler = async (interaction) => {
  // Load the json file containing work roles

  const role = interaction.options.getRole("role");
  // Read the data
  const dataObj = loadJSONasObject("workRoles.json");
  const roleIndex = dataObj.roleIds.indexOf(role.id);

  console.log("role: ", role.id);
  // Check if the role already exists
  if (roleIndex !== -1) {
    await interaction.reply("Role already set as work role.");
  } else {
    // Push [role_name, role_id]
    dataObj.workRoles.push(role.name);
    dataObj.roleIds.push(role.id);

    // Store data in the file
    storeObjasJSON(dataObj, "workRoles.json");

    console.log("interaction role added: ", role.name);
    await interaction.reply({
      content: `Role ${role} successfully set as work role.`,
      ephemeral: true,
    });
  }
};

module.exports = setWorkRoleHandler;
