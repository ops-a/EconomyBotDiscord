const buildBtns = require("../components/buttons/rankingBtns");
// const newEmbed = require("../components/embeds/rankingsEmbed");
const newEmbed = require("../components/embeds/rankingsEmbed");

const leaderboardHandler = async (interaction) => {
  // const rankEmbed = newEmbed(1);
  const embed = await newEmbed(1);

  await interaction.reply({
    embeds: [embed],
    components: [buildBtns(false, true)],
  });
};

module.exports = leaderboardHandler;
