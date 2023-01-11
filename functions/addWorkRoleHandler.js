/*
  Adds the given role to the list of workroles.
  Only those users with any of the work roles can use the /work command.
  Works roles are stored and updated in ../data/workRoles.json:
  {
    <id>: <name>,
    <id>: <name>,
    ... : ...,
  }
*/
const { loadJSONasObject, storeObjasJSON } = require("../utils/loadJSONData");

const addWorkRoleHandler = async (interaction) => {
  // Get the role
  const role = interaction.options.getRole("role");

  // Load the json file containing work roles
  const workRoles = loadJSONasObject("workRoles.json");

  const workRole = workRoles[role.id];
  // If the id is found in workRoles, send corres. msg and return

  if (workRole) {
    await interaction.reply(`The role ${role} is already a work role.`);
    return;
  }

  // Else add the role to the object and save it to the json file
  workRoles[role.id] = role.name;
  storeObjasJSON("workRoles.json",workRoles);

  console.log("interaction role added: ", role.name);
  await interaction.reply({
    content: `Role ${role} successfully set as a work role.`,
    ephemeral: true,
  });
};

module.exports = addWorkRoleHandler;
