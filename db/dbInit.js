// Create a table with columns: userId, cashInHand, bankBalance, username

const db = require("./dbConnect");

createUsersTableQ =
  "create table users(userId char(30) primary key, cashInHand int, bankBalance int, username varchar(50))";

createTimestampTableQ =
  "create table cmd_tstamps(userId char(30) primary key, work_tstamp timestamp, crime_tstamp timestamp, slut_tstamp timestamp, collect_tstamp timestamp)";
// try {
//   const results = db.manyOrNone("select * from users");
// } catch (e) {
//   console.log("error", e);
//   if (!results) {
//     console.log("Table does not exist");
//   }
// }

await db.none(createUsersTableQ);
await db.none(createTimestampTableQ);

// console.log("results: ", results);
