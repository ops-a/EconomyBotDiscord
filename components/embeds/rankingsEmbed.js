const { EmbedBuilder, time } = require("discord.js");

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

const getStrAndLen = async (pageNum) => {
  const values = await getRankingsDesc();
  const len = values.length;
  let str = "";

  for (let i = 10 * (pageNum - 1); i < 10 * pageNum && i < values.length; i++) {
    const value = values[i];
    str += `${i + 1}. ${value.username} : ${
      value.cashbalance + value.bankbalance
    }`;
  }
  console.log("Leaderboard Str: ", str);

  return { str, len };
};

const newEmbed = async (pageNum) => {
  const newDate = new Date();
  const { str, len } = await getStrAndLen(pageNum);

  // console.log('Date: ', newDate, ' time: ', time(newDate))
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("CannaFarm Club Leaderboard")
    .setDescription(`Rankings generated on ${time(newDate, "f")}`)
    // .setThumbnail("https://i.imgur.com/AfFp7pu.png")
    // .addFields(
    //   { name: "Regular field title", value: "Some value here" },
    //   { name: "\u200B", value: "\u200B" },
    //   { name: "Inline field title", value: "Some value here", inline: true },
    //   { name: "Inline field title", value: "Some value here", inline: true }
    // )
    .addFields({
      name: `${pageNum}`,
      value: `${str}`,
      inline: true,
    })
    // .setImage("https://i.imgur.com/AfFp7pu.png")
    .setTimestamp()
    .setFooter({
      text: `Page ${pageNum} of ${Math.floor((len + 9) / 10)}`,
    });

  return exampleEmbed.data;
};

module.exports = newEmbed;
