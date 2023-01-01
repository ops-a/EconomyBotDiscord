const db = require('./dbConnect');

const addUser = async (interaction) => {
    const { id, username } = interaction.user;
    
    const user = await db.oneOrNone('select * from users where userId=$1', id);
    if(user) {
        interaction.reply(`User ${interaction.user} already exists.`)
        return;
    }

    const user1 = await db.oneOrNone('insert into users values($1, $2, $3, $4) returning username', [id, 0, 0, username]);
    if(user1) {
        interaction.reply(`User ${interaction.user} has been successfully registered.`)
       return; 
    } else {
        interaction.reply('There was some issue with the registration. Please try again.')
        return;
    }

}
module.exports = addUser;