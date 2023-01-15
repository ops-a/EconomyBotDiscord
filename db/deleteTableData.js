const db = require("./dbConnect");

// Delete data from all tables
db.none("delete from  users");
db.none("delete from  cmd_tstamps");
db.none("delete from  leveler");
db.none("delete from  blackjack");
