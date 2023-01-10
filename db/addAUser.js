const db = require("./dbConnect");

const addUser = async (interaction) => {
  const { id, username } = interaction.user;

  const user = await db.oneOrNone("select * from users where userId=$1", id);
  if (user) {
    await interaction.reply(`User ${interaction.user} already exists.`);
    return;
  }

  const user1 = await db.oneOrNone(
    "insert into users values($1, $2, $3, $4) returning username",
    [id, 0, 0, username]
  );

  await db.none("insert into cmd_tstamps values($1, now(), now(), now(), now())", id)

  if (user1) {
    await interaction.reply(
      `User ${interaction.user} has been successfully registered.`
    );
    return;
  } else {
    await interaction.reply(
      "There was some issue with the registration. Please try again."
    );
    return;
  }
};
module.exports = addUser;
