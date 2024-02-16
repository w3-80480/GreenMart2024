const express = require("express")
const db = require("../database/db")
const utils = require("../utils")

const router = express.Router()

router.get("/", (request, response) => {
  const sql = "SELECT * FROM movies"
  db.query(sql, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.post("/review", (request, response) => {
  const { movieid, review, rating, userid } = request.body
  const sql =
    "INSERT INTO reviews(movieid,review,rating,userid) VALUES(?,?,?,?)"
  db.query(sql, [movieid, review, rating, userid], (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.get("/review/:id", (request, response) => {
  const sql = "SELECT * FROM reviews WHERE userid=?"
  db.query(sql, [request.params.id], (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.post("/moviereview", (request, response) => {
  const { movieid, userid } = request.body
  const sql = "SELECT * FROM reviews WHERE movieid=? AND userid=?"
  db.query(sql, [movieid, userid], (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.put("/review", (request, response) => {
  const { id, review, rating } = request.body
  const sql = "UPDATE reviews SET review = ?,rating = ? WHERE id = ?"
  db.query(sql, [review, rating, id], (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.delete("/review/:id", (request, response) => {
  const sql = "DELETE FROM reviews WHERE id = ?"
  db.query(sql, [request.params.id], (error, data) => {
    response.send(utils.createResult(error, data))
  })
})
module.exports = router
