const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const getBJBtns = (btnState) => {
  const newRow = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("hit_btn")
        .setLabel("Hit")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(!btnState)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("stand_btn")
        .setLabel("Stand")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(!btnState)
    );

    return newRow
};

module.exports = getBJBtns;
