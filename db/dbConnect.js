// const postgres = require('postgres');
const pgp = require('pg-promise')();

// const sql = postgres('postgres://postgres:postgres@localhost:5432/notesAppDB')
const db = pgp('postgres://postgres:postgres@localhost:5432/cannaSampleDB')

db.connect().then(data => console.log('Connected: ', data))
// console.log('Connection: ', sql.state);

module.exports = db;