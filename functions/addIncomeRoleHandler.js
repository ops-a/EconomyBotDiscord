/*
    Adds the role to the list of income roles stored as a json object in ../data/collectRoles.json:
    {
      "roles": {

      }
    }
    The users having these roles can collect income every
    24 hours.
*/
const { loadJSONasObject, storeObjasJSON } = require("../utils/loadJSONData");

const addIncomeRoleHandler = async (interaction) => {
  // Load json string as data object.
  // See if the role is already present
  // If yes, return a message stating it
  // If not, add to the list of income roles
  // and store the object as json string.
  const { roles } = loadJSONasObject("incomeRoles.json");

  // Get role id, name from the command
  const role = interaction.options.getRole("role");
  const { id, name } = role;

  // Get the income to be added for the role
  const income = interaction.options.getInteger("income");

  // See if the id already exists.
  const isRole = roles[id];

  if (isRole) {
    await interaction.reply({
      content: `The role ${role} is already an income role.`,
      ephemeral: true,
    });

    return;
  }

  // Else add the role to the list of income roles
  roles[id] = { name, income };

  // Save the object as json string
  storeObjasJSON("incomeRoles.json", { roles });

  await interaction.reply({
    content: `Role ${role} added to the income role.`,
    ephemeral: true
  });
};

module.exports = addIncomeRoleHandler;
