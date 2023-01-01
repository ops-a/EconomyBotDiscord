const randomWork = require('../data/workBuilder');

const provideWork = async (interaction) => {
    const work = randomWork();
    await interaction.reply(`${work.job} and earn ${work.earn}`)
}

module.exports = provideWork;