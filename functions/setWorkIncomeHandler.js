const { blockQuote } = require("discord.js");

const setWorkIncomeHandler = async (interaction) => {
  const workIncomesObj = loadJSONasObject("workIncomes.json");
  const lower = interaction.options.getInteger("lower");
  const upper = interaction.options.getInteger("upper");

  if (lower >= upper) {
    await interaction.reply({
      content: blockQuote(
        "Inavlid input. Lower limit must be less than upper limit."
      ),
      ephemeral: true,
    });
    return;
  }

  workIncomesObj = { lower, upper };
  storeObjasJSON("workIncomes.json", workIncomesObj);

  await interaction.reply({
    content: blockQuote(
      `Lower ${lower} and upper ${upper} limits successfully set.`
    ),
    ephemeral: true,
  });
};

module.exports = setWorkIncomeHandler;
