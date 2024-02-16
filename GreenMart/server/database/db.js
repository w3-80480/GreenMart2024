const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",
  user: "w3_80480_Nakul",
  password: "NAKUL",
  database: "db_GreenMart",
  multipleStatements: true
})

connection.connect()

module.exports = connection
