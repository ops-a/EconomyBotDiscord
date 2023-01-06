const getUserInfo = require('../db/getUserInfo');
const updateUserBalance = require('../db/updateUserBalance')

const transferMoney = async (interaction) => {
  const senderId = interaction.user.id;
  const mentionedUser = interaction.options.getUser("user");
  const recipientId = mentionedUser.id;

  const amount = interaction.options.getInteger("amount");

  const sender = await getUserInfo(senderId);
  const recipient = await getUserInfo(recipientId);
  
  console.log('sender: ', sender);
  console.log('recipient: ', recipient);

  if(!recipient) {
    await interaction.reply(`The user ${mentionedUser} is not registered. Unable to perform transaction. `)
    return;
  }

  if(sender.cashinhand + sender.bankbalance < amount) {
    await interaction.reply("You don't have enough money. Transaction failed.")
    return;
  }

  console.log('Cash: ', sender.cashinhand, ' bank: ', sender.bankbalance);
  console.log('Cash: ', sender.cashinhand, ' bank: ', sender.bankbalance);
  console.log('amount: ', amount);

  await updateUserBalance(sender.cashinhand - amount, sender.bankbalance,  senderId)
  await updateUserBalance(recipient.cashinhand + amount, recipient.bankbalance,  recipientId)

  await interaction.reply(`You have transferred ${amount} to ${mentionedUser}.`)

};

module.exports = transferMoney;
