
const setRoleHandler = async (interaction) => {
    const role = interaction.options.getRole("role");
    const member = interaction.options.getMember("user");
    member.roles.add(role);

    await interaction.reply({ content: `Role ${role} added to ${member}`, ephemeral: true})
}

module.exports = setRoleHandler;