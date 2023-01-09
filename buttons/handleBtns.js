const newEmbed = require("../components/embeds/rankingsEmbed");
const buildBtns = require("../components/buttons/rankingBtns");
const {
  randomCard,
  addCardToDealer,
  addCardToUser
} = require("../functions/blackjackHandler");
const getblackjackEmbed = require("../components/embeds/blackjackEmbed");
const getBJBtns = require("../components/buttons/blackjackBtns");
const { loadJSONasObject } = require("../utils/loadJSONData");

const handleBtns = async (interaction) => {
  const buttonId = await interaction.customId;

  if (buttonId === "hit_btn" || buttonId == "stand_btn") {
    await updateBJ(interaction);
    return;
  }

  const embedFooter = interaction.message.embeds[0].footer.text;
  console.log("interaction user: ", interaction.user.id);
  console.log("btn interaction: ", interaction.message.interaction.user.id)
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

  await interaction.update({
    content: "Hello: ",
    embeds: [newEmbed(pageNum)],
    ephemeral: true,
    components: [buildBtns(prev_state, next_state)],
  });
};

const updateBJ = async (interaction) => {
  // Add one more card and update
  console.log("btn int id: ", interaction.id)
  const buttonId = interaction.customId;
  const userId = interaction.user.id;
  const playerId = interaction.message.interaction.user.id

  if(userId !== playerId) {
    await interaction.reply("You don't have this permission.")
    return;
  }

  if (buttonId === "hit_btn") {
    addCardToUser(userId);
  } else {
    addCardToDealer(userId)
  }

  const newBJEmbed = getblackjackEmbed(userId);
  const newBJBtns = getBJBtns(true);

  await interaction.update({
    embeds: [newBJEmbed],
    components: [newBJBtns],
    ephemeral: true,
  });
};
module.exports = handleBtns;
