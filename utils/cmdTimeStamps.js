const db = require("../db/dbConnect");
// const time_limits =

const readLastTimeStamp = async (cmdName, id) => {
  const fieldName = cmdName + "_tstamp";
  const result = await db.one("select * from cmd_tstamps where userid=$2", [
    fieldName,
    id,
  ]);
  console.log("Reading tstamp: ", result[fieldName]);

  // Set time limit to 1 hour
  let time_limit = 60 * 60 * 1000;

  if (cmdName === "crime" || cmdName === "slut") {
    time_limit *= 12;
  } else if (cmdName === "work" || cmdName === "collect") {
    time_limit *= 24;
  }

  const tstamp = result[fieldName];
  const newD = new Date(tstamp);

  // Get the timestamp and the current time in milliseconds
  const dateT = Date.parse(newD);
  const nowT = Date.now();

  // Get the time remaining.
  const tdiffmins = (time_limit - (nowT - dateT)) / 1000 / 60;

  const mins = Math.floor(tdiffmins % 60);
  const hours = Math.floor(tdiffmins / 60);

  console.log("Hours: ", hours, " mins: ", mins);

  return { hours, mins };
};

const writeLastTimeStamp = async (cmdName, id) => {
  const fieldName = cmdName + "_tstamp";
  await db.none("update cmd_tstamps set $1=now() where userid=$2", [
    fieldName,
    id,
  ]);
};

module.exports = { readLastTimeStamp, writeLastTimeStamp };
