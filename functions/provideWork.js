const randomWork = require('../data/workBuilder');
const getUserInfo = require('../db/getUserInfo');
const updateUserBalance = require('../db/updateUserBalance')

const provideWork = async (interaction) => {
    const work = randomWork();
    const user = await getUserInfo(interaction.user.id);
    await interaction.reply(`${work.job} and earn ${work.earn}`)
    // Update cash balance afterwards
    await updateUserBalance(user.cashinhand + work.earn, user.bankbalance, interaction.user.id);
}

module.exports = provideWork;