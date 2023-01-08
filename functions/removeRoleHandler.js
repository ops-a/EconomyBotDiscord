const removeRoleHandler = async (interaction) => {
  const role = interaction.options.getRole("role");
  const member = interaction.options.getMember("user");
  member.roles.remove(role);

  await interaction.reply({
    content: `Role ${role} removed from ${member}.`,
    ephemeral: true,
  });
};

module.exports = removeRoleHandler;
