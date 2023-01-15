const {
  InteractionCollector,
  bold,
  blockQuote,
  userMention,
  ChatInputCommandInteraction,
  MessageComponentInteraction,
} = require("discord.js");
const levelValues = require("../data/levelValues");
const db = require("../db/dbConnect");

const levelHandler = async (event) => {
  //   console.log("Event: ", event);
  let channel;
  let userid;

  if (event instanceof ChatInputCommandInteraction) {
    // message = event.message;
    channel = event.member.guild.channels.cache.get(event.channelId);
    userid = event.user.id;
  } else {
    channel = event.channel;
    userid = event.author.id;
  }

  // Increase the xp's by 10.
  let { level, xp, targetxp } = await db.oneOrNone(
    "update leveler set xp = xp + 10 where userid = $1 returning level, xp, targetxp",
    userid
  );

  // If xp == targetxp, increase level by 1, set xp to 0, and set targetxp to levelValues[level<updated>].
  if (xp === targetxp) {
    if (level === levelValues.length) {
      return;
    }

    level++;
    xp = 0;
    targetxp = levelValues[level + 1];

    // Update the level, xp and targetxp
    let updatedLevel = await db.oneOrNone(
      "update leveler set level = $1, xp = $2, targetxp = $3 where userid = $4 returning level",
      [level, xp, targetxp, userid]
    );

    channel.send(
      blockQuote(
        `Congratulations ${userMention(userid)}! You have progressed to Level ${bold(level)}.`
      )
    );
    console.log("Updated level: ", updatedLevel);
    //   console.log("XP: ", xp, " targetxp: ", targetxp);
  }
};

module.exports = levelHandler;
