// Create a table with columns: userId, cashInHand, bankBalance, username

const db = require("./dbConnect");

createUsersTableQ =
  "create table users(userid varchar(30) primary key, cashbalance int, bankbalance int, username varchar(50))";

createTimestampTableQ =
  "create table cmd_tstamps(userid varchar(30) primary key, work_tstamp timestamp, crime_tstamp timestamp, slut_tstamp timestamp, collect_tstamp timestamp, rob_tstamp timestamp)";

createBJTable = "create table blackjack(int_id varchar(30) primary key, userid varchar(30) not null, amount int, tstamp timestamp, result boolean, user_cards text, dealer_cards text, user_value int, dealer_value int)"
// try {
//   const results = db.manyOrNone("select * from users");
// } catch (e) {
//   console.log("error", e);
//   if (!results) {
//     console.log("Table does not exist");
//   }
// }

db.none(createUsersTableQ);
db.none(createTimestampTableQ);
db.none(createBJTable);

// console.log("results: ", results);
