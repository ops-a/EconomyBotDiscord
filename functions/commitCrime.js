const randomCrime = require("../data/crimeBuilder");
const getUserInfo = require("../db/getUserInfo");
const updateUserBalance = require("../db/updateUserBalance");

const commitCrime = async (interaction) => {
    const userId = interaction.user.id;
    const user = await getUserInfo(userId);

    console.log('User: ', user)
    if(!user) {
        await interaction.reply('You are not registered. Use /connect to register.')
        return;
    }

    const crimeCommited = randomCrime();
    await updateUserBalance(user.cashinhand - crimeCommited.fine, user.bankbalance, userId);
    await interaction.reply(`${crimeCommited.crime} and fined ${crimeCommited.fine}`)

}

module.exports = commitCrime;