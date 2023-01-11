const { EmbedBuilder, quote, roleMention } = require("@discordjs/builders");
const { loadJSONasObject } = require("../utils/loadJSONData");

// Admin only. Lists all the work roles.
const listWorkRolesHandler = async (interaction) => {
  const workRoles = loadJSONasObject("workRoles.json");
  console.log("Loaded work role: ", Object.keys(workRoles))

  if (Object.keys(workRoles).length == 0) {
    await interaction.reply({
      content: quote("No work roles have been set."),
      ephemeral: true,
    });
  } else {
    let workRoleStr = "\n\n";
    const keys = Object.keys(workRoles)
    for (let i = 0; i < keys.length; i++) {
      
      workRoleStr = `\n${i+1}. ${roleMention(keys[i])}`;
    }

    const newEmbed = new EmbedBuilder()
      .setTitle("Work Roles")
      .setDescription(workRoleStr);

    await interaction.reply({ embeds: [newEmbed], ephemeral: true });
  }
};

module.exports = listWorkRolesHandler;
