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
const getRankingsDesc = async () => {
  const values = await db.many(
    "select * from users order by cashbalance+bankbalance desc"
  );
  console.log("values: ", values);

  return values;
};
module.exports = getRankingsDesc;
