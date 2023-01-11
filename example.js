const { loadJSONasObject } = require('./utils/loadJSONData')

const data = loadJSONasObject("incomeRoles.json")

console.log("json obj: ", data);