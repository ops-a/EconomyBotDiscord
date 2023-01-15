const buildBtns = require("../components/buttons/rankingBtns");
// const newEmbed = require("../components/embeds/rankingsEmbed");
const newEmbed = require("../components/embeds/rankingsEmbed");

const leaderboardHandler = async (interaction) => {
  // const rankEmbed = newEmbed(1);
  const { exampleEmbed, len } = await newEmbed(1, interaction.user.id);

  let next_btn = len > 10;

  await interaction.editReply({
    embeds: [exampleEmbed],
    components: [buildBtns(false, next_btn)],
  });
};

module.exports = leaderboardHandler;
