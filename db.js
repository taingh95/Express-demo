const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

//save db json
const adapter = new FileSync('db.json')
const db = low(adapter)


//set default db
db.defaults({ users: []})
  .write()

module.exports = db;