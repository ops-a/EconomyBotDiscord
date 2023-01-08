const { EmbedBuilder, time } = require("discord.js");

const leaders = [];

for (let i = 0; i < 35; i++) {
  leaders.push(`${i + 1} hello${i}${i}${i}`);
}
const getValues = (pageNum) => {
  let values = "";
  for (let i = 10 * (pageNum - 1); i < 10 * pageNum && i < leaders.length; i++) {
    const str = `${i + 1} hello${i}${i}${i}`;
    values += str + "\n";
  }

  return values;
};

const newEmbed = (pageNum) => {
  const newDate = new Date();
  console.log('Date: ', newDate, ' time: ', time(newDate))
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("CannaFarm Club Leaderboard")
    .setURL("https://discord.js.org/")
    .setDescription(`Rankings generated on ${time(newDate, 'f')}`)
    // .setThumbnail("https://i.imgur.com/AfFp7pu.png")
    // .addFields(
    //   { name: "Regular field title", value: "Some value here" },
    //   { name: "\u200B", value: "\u200B" },
    //   { name: "Inline field title", value: "Some value here", inline: true },
    //   { name: "Inline field title", value: "Some value here", inline: true }
    // )
    .addFields({
      name: `${pageNum}`,
      value: getValues(pageNum),
      inline: true,
    })
    // .setImage("https://i.imgur.com/AfFp7pu.png")
    .setTimestamp()
    .setFooter({
      text: `Page ${pageNum} of ${Math.floor((leaders.length + 9) / 10)}`,
      iconURL: "https://i.imgur.com/AfFp7pu.png",
    });

  return exampleEmbed;
};

module.exports = newEmbed;
