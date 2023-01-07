const { EmbedBuilder } = require("discord.js");

const leaders = [];
const getValues = (pageNum) => {
  let values = "";
  for (let i = 10 * (pageNum - 1); i < 10 * pageNum; i++) {
    const str = `${i + 1} hello${i}${i}${i}`;
    leaders.push(`${i + 1} hello${i}${i}${i}`);
    values += str + "\n";
  }

  return values;
};

const newEmbed = (pageNum) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("CannaFarm Club Leaderboard " + pageNum)
    .setURL("https://discord.js.org/")
    .setDescription("Description")
    // .setThumbnail("https://i.imgur.com/AfFp7pu.png")
    // .addFields(
    //   { name: "Regular field title", value: "Some value here" },
    //   { name: "\u200B", value: "\u200B" },
    //   { name: "Inline field title", value: "Some value here", inline: true },
    //   { name: "Inline field title", value: "Some value here", inline: true }
    // )
    .addFields({
      name: `Leaderboard ${pageNum}`,
      value: getValues(pageNum),
      inline: true,
    })
    // .setImage("https://i.imgur.com/AfFp7pu.png")
    // .setTimestamp()
    .setFooter({
      text: "Some footer text here",
      iconURL: "https://i.imgur.com/AfFp7pu.png",
    });

  return exampleEmbed;
};

module.exports = newEmbed;
