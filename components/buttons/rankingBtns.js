const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const buildBtns = (prevState, nextState) => {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("prev_btn")
        .setLabel("Previous")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(!prevState)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("next_btn")
        .setLabel("Next")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(!nextState)
    );

    return row;
};
module.exports = buildBtns;
