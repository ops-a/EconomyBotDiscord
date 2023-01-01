const db = require("./dbConnect");

const getUserInfo = async (id) => {
  const user = await db.oneOrNone("select * from users where userId=$1", id);
  if (user) {
    return await user;
  } else {
    return null;
  }
};
module.exports = getUserInfo;
