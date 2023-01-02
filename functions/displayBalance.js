const getUserInfo = require('../db/getUserInfo');

const displayBalance = async (interaction) => {
    const user = await getUserInfo(interaction.user.id)
    const { cashinhand, bankbalance } = user;
    if (user) {
        console.log('user: ', user)
        interaction.reply(`Cash: ${cashinhand}\nBank Balance: ${bankbalance}\nTotal: ${cashinhand + bankbalance}`);
    } else {
        interaction.reply('User not registered. Use /connect command to register first.')
    }

}

module.exports = displayBalance;