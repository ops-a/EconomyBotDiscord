const newEmbed = require("../components/embeds/rankingsEmbed");
const row = require("../components/buttons/rankingBtns");
const handleBtn = async (interaction) => {
 
 const collector = interaction.channel.createMessageComponentCollector({
    time: 15000,
  });
  //   interaction.reply({ content: "H", ephemeral: true });
  await interaction.update({
    content: "Hello: ",
    embeds: [newEmbed(3)],
    ephemeral: true,
    components: [row],
  });
};

module.exports = handleBtn;
