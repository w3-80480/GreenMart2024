const express = require("express")
const db = require("../database/db")
const utils = require("../utils")
const router = express.Router()

router.post("/", (request, response) => {
  const { reviewid, userid } = request.body
  const sql = "INSERT INTO shares VALUES(?,?)"
  db.query(sql, [reviewid, userid], (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.get("/:id", (request, response) => {
  const sql =
    "SELECT r.* FROM reviews r INNER JOIN shares s ON r.id = s.reviewid WHERE s.userid=?"
  db.query(sql, request.params.id, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

module.exports = router
