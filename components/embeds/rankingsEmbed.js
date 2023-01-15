const { EmbedBuilder, time, userMention, bold } = require("discord.js");

// const leaders = [];

// for (let i = 0; i < 35; i++) {
//   leaders.push(`${i + 1} hello${i}${i}${i}`);
// }
// const getValues = (pageNum) => {
//   let values = "";
//   for (let i = 10 * (pageNum - 1); i < 10 * pageNum && i < leaders.length; i++) {
//     const str = `${i + 1} hello${i}${i}${i}`;
//     values += str + "\n";
//   }

//   return values;
// };
const getRankingsDesc = require("../../db/getRankingsDesc");

// const getStrAndLen = async (pageNum) => {
//   const values = await getRankingsDesc();
//   const len = values.length;
//   let str = "";

//   for (let i = 10 * (pageNum - 1); i < 10 * pageNum && i < values.length; i++) {
//     const value = values[i];
//     str += `\n${i + 1}. ${userMention(value.userid)}  : ${
//       value.cashbalance + value.bankbalance
//     }`;
//   }
//   console.log("Leaderboard Str: ", str);

//   return { str, len };
// };

const newEmbed = async (pageNum, id) => {
  const newDate = new Date();
  // const { str, len } = await getStrAndLen(pageNum);
  const { values, rank } = await getRankingsDesc(id);
  const len = values.length;

  // console.log('Date: ', newDate, ' time: ', time(newDate))
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("CannaFarm Club Leaderboard")
    .setDescription(`\nRankings generated on ${time(newDate, "f")}`)
    .setTimestamp()
    .setFooter({
      text: `\n\nPage ${pageNum} of ${Math.floor((len + 9) / 10)}`,
    });

  for (let i = 10 * (pageNum - 1); i < 10 * pageNum && i < values.length; i++) {
    const newValue = values[i];
    exampleEmbed.addFields({
      name: `\u200b`,
      value: `${i + 1}. ${userMention(newValue.userid)} : ${
        newValue.cashbalance + newValue.bankbalance
      }`,
    });
  }

  exampleEmbed.addFields({
    name: "\n\u200b\n",
    value: `\nYour rank is ${bold(rank)}.\n\n`
  })
  return { exampleEmbed, len };
};

module.exports = newEmbed;
