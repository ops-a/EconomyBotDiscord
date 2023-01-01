// Create a table with columns: userId, cashInHand, bankBalance, username

const db = require("./dbConnect");

createUsersTableQ =
  "create table users(userId char(30) primary key, cashInHand int, bankBalance int, username varchar(50))";

// try {
//   const results = db.manyOrNone("select * from users");
// } catch (e) {
//   console.log("error", e);
//   if (!results) {
//     console.log("Table does not exist");
//   }
// }

db.none(createUsersTableQ);

// console.log("results: ", results);
