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

  await interaction.update({
    content: "Hello: ",
    embeds: [newEmbed(pageNum)],
    ephemeral: true,
    components: [buildBtns(prev_state, next_state)],
  });
};

const updateBJ = async (interaction) => {
  // Add one more card and update
  console.log("btn int id: ", interaction.id);
  const buttonId = interaction.customId;
  const userId = interaction.user.id;
  const playerId = interaction.message.interaction.user.id;

  const msgLink = messageLink(interaction.channelId, interaction.message.id);
  const hyperL = hyperlink("view", msgLink)
  const opts = interaction.options;
  console.log("int: ", interaction, "\n\nopts: ", opts);
  await interaction.reply({
    content: quote(
      `msg: <@${
        interaction.message.interaction.message
      }> msg int: ${messageLink(interaction.channelId, interaction.message.id)}\n link: ${hyperL}`
    ),
    ephemeral: true,
  });

  // return;
  let showBtns = true;

  if (userId !== playerId) {
    await interaction.reply("You don't have this permission.");
    return;
  }

  let userValue = getUserValue(userId);

  if (buttonId === "hit_btn") {
    userValue = addCardToUser(userId);
    console.log("Value: ", userValue);
    if (userValue >= 21) {
      showBtns = false;
    }
    // await interaction.reply({ content: "You lose", ephemeral: true})
  } else {
    let dealerValue = addCardToDealer(userId);
    while (dealerValue < userValue || dealerValue < 21) {
      dealerValue = addCardToDealer(userId);
    }
    showBtns = false;
  }

  let descStr = "Instructions:\nhit: pull another card\nstand: end your turn";

  if (!showBtns) {
    const userValue = getUserValue(userId);
    const dealerValue = getDealerValue(userId);

    if (userValue === 21) {
      descStr = "Result: You win!";
    } else if (userValue > 21) {
      descStr = "Result: You lose!";
    } else if (dealerValue > 21) {
      descStr = "Result: You win!";
    } else if (userValue < dealerValue) {
      descStr = "Result: You lose!";
    } else {
      descStr = "Result: You win!";
    }
  }

  const newBJEmbed = getblackjackEmbed(userId, descStr);
  const newBJBtns = getBJBtns(showBtns);

  await interaction.update({
    embeds: [newBJEmbed],
    components: [newBJBtns],
    ephemeral: true,
  });

  if (!showBtns) {
    const gameData = loadJSONasObject("bjGameData.json");
    delete gameData[userId];
    storeObjasJSON("bjGameData.json", gameData);
  }
};

const getUserValue = (id) => {
  const gameData = loadJSONasObject("bjGameData.json");
  return gameData[id].userValue;
};
const getDealerValue = (id) => {
  const gameData = loadJSONasObject("bjGameData.json");
  return gameData[id].dealerValue;
};
module.exports = handleBtns;
