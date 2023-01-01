const getUserInfo = require('../db/getUserInfo');

const displayBalance = async (interaction) => {
    const user = await getUserInfo(interaction.user.id)
    if (user) {
        console.log('user: ', user)
        interaction.reply(`Cash: ${user.cashinhand}\nBank Balance: ${user.bankbalance}`);
    } else {
        interaction.reply('User not registered. Use /connect command to register first.')
    }

}

module.exports = displayBalance;