const randomWork = require('../data/workBuilder');
const updateUserBalance = require('../db/updateUserBalance')

const provideWork = async (interaction) => {
    const work = randomWork();
    await interaction.reply(`${work.job} and earn ${work.earn}`)
    // Update cash balance afterwards
    await updateUserBalance(work.earn, 0);
}

module.exports = provideWork;