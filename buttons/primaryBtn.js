const newEmbed = require("../components/embeds/rankingsEmbed");
const buildBtns = require("../components/buttons/rankingBtns");

const handleBtn = async (interaction) => {
 
  console.log('Interaction msg: ', await interaction);
  const buttonId = interaction.customId;
  const embedFooter = interaction.message.embeds[0].footer.text;
  const embedFArr = embedFooter.split(' ')
  let  pageNum = Number(embedFArr[1])
  const totalPages = Number(embedFArr[3])
  let prev_state = true;
  let next_state = true;

  if(buttonId == 'prev_btn') {
    pageNum--;
  } else if (buttonId == 'next_btn') {
    pageNum++;
  }

  if(pageNum == 1) {
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

module.exports = handleBtn;
