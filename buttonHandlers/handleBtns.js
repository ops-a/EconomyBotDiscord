const newEmbed = require("../components/embeds/rankingsEmbed");
const buildBtns = require("../components/buttons/rankingBtns");
const {
  randomCard,
  addCardToDealer,
  addCardToUser,
} = require("../functions/blackjackHandler");
const getblackjackEmbed = require("../components/embeds/blackjackEmbed");
const getBJBtns = require("../components/buttons/blackjackBtns");
const { loadJSONasObject, storeObjasJSON } = require("../utils/loadJSONData");
const { messageLink, quote, hyperlink } = require("discord.js");
const bjBtnHandler = require("./blackjackBtns");

const handleBtns = async (interaction) => {
  await interaction.deferUpdate();

  const buttonId = await interaction.customId;
  if (buttonId === "hit_btn" || buttonId == "stand_btn") {
    await bjBtnHandler(interaction);
    return;
  }

  const embedFooter = interaction.message.embeds[0].footer.text;

  console.log("interaction user: ", interaction.user.id);
  console.log("btn interaction: ", interaction.message.interaction.user.id);

  const embedFArr = embedFooter.split(" ");

  let pageNum = Number(embedFArr[1]);
  const totalPages = Number(embedFArr[3]);

  let prev_state = true;
  let next_state = true;

  if (buttonId == "prev_btn") {
    pageNum--;
  } else if (buttonId == "next_btn") {
    pageNum++;
  }

  if (pageNum == 1) {
    prev_state = false;
  } else if (pageNum == totalPages) {
    next_state = false;
  }

  await interaction.editReply({
    content: "Hello: ",
    embeds: [newEmbed(pageNum)],
    ephemeral: true,
    components: [buildBtns(prev_state, next_state)],
  });
};

module.exports = handleBtns;
