const db = require("./dbConnect");

/* Ranks in descending order, returns an array of user objects:
[
    {
        userid: <>,
        cashbalance: <>,
        bankbalance: <>,
        username: <>,
    }
]
 */
const getRankingsDesc = async (id) => {
  const values = await db.many(
    "select * from users order by cashbalance+bankbalance desc"
  );
  console.log("values: ", values);
  let rank = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i].userid == id) {
      rank = i + 1;
      break;
    }
  }

  return { values, rank };
};
module.exports = getRankingsDesc;
