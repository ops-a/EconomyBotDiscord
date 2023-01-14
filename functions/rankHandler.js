const { blockQuote } = require("discord.js");
const db = require("../db/dbConnect");

const rankHandler = async (interaction) => {
  const { id } = await interaction.user;
  const getUserFromLeveler = await db.oneOrNone("select * from leveler where userid = $1", id)

  if(!getUserFromLeveler) {
    await interaction.ediReply({ content: blockQuote("You are not registered."), ephemeral: true })
    return;
  }

  const { userid, level, xp, targetxp } = getUserFromLeveler;

  await interaction.editReply({ content: blockQuote(`Level: ${level}\nXP: ${xp}/${targetxp}`)})

}

module.exports = rankHandler;