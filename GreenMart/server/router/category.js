const express = require("express")
const db = require("../database/db")
const utils = require("../utils")

const router = express.Router()

router.get("/", (request, response) => {
  const sql = "SELECT * FROM category"
  db.query(sql, request.params.id, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.delete("/:id", (request, response) => {
    const sql = "DELETE FROM category WHERE category_id = ?"
    db.query(sql, [request.params.id], (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

  router.put("/update", (request, response) => {
    const { category_id, category_name, category_image } = request.body
    const sql = "UPDATE category SET category_name = ?,category_image = ? WHERE category_id = ?"
    db.query(sql, [category_name, category_image, category_id], (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

// router.get("/category/:id", (request, response) => {
//     const sql = "SELECT * FROM category WHERE category_id=?"
//     db.query(sql, [request.params.id], (error, data) => {
//       response.send(utils.createResult(error, data))
//     })
//   })
// router.get("/:id", (request, response) => {
//   const sql = "SELECT * FROM users WHERE userid=?"
//   db.query(sql, request.params.id, (error, data) => {
//     response.send(utils.createResult(error, data))
//   })
// })

// router.post("/register", (request, response) => {
//   const { username, email, password} = request.body
//   const sql =
//     "INSERT INTO users(username, email, password) VALUES(?,?,?)"
//   db.query(
//     sql,
//     [username, email, password],
//     (error, data) => {
//       response.send(utils.createResult(error, data))
//     }
//   )
// })

// router.post("/login", (request, response) => {
//   const { email, password } = request.body
//   const sql = "SELECT * FROM users WHERE email=? AND password=?"
//   db.query(sql, [email, password], (error, data) => {
//     response.send(utils.createResult(error, data))
//   })
// })

module.exports = router
