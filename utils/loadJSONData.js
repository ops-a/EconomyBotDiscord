const fs = require("node:fs");
const path = require("path");

const loadJSONasObject = (fileName) => {
  const filePath = path.join(__dirname, "..", "data", fileName);
  const file = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(file);
};

const storeObjasJSON = (fileName, data) => {
  const filePath = path.join(__dirname, "..", "data", fileName);
  fs.writeFileSync(filePath, JSON.stringify(data));
};

module.exports = { loadJSONasObject, storeObjasJSON };
