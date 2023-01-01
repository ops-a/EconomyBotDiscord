// const { Sequelize } = require('sequelize');
const pgp = require('pg-promise')();

const db = pgp('postgres://postgres:postgres@localhost:5432/notesAppDB');

db.connect().then(o => console.log('Connection started'));
db.none("insert into notes (content, important) values('pg-promise is a pg interface for Node.js', true)").then(o => console.log('Data inserted')
);

db.any("select * from notes").then(obj => {
  console.log("Obj: ", obj)
  for(let v in obj) {
    console.log('Result: ', obj[v]);
  }
})
