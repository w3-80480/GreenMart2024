const express = require("express")
const db = require("../database/db")
const utils = require("../utils")

const router = express.Router()

router.get("/", (request, response) => {
  const sql = "SELECT * FROM products"
  db.query(sql, request.params.id, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.post("/", (request, response) => {
    const { category_id, product_name, detail, Price, image } = request.body
    const sql =
      "INSERT INTO products(category_id,product_name,detail,Price,image) VALUES(?,?,?,?,?)"
    db.query(sql, [category_id, product_name, detail, Price, image], (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

router.get("/:id", (request, response) => {
    const sql = "SELECT * FROM products WHERE category_id=?"
    db.query(sql, [request.params.id], (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

  router.delete("/:id", (request, response) => {
    const sql = "DELETE FROM products WHERE product_id = ?"
    db.query(sql, [request.params.id], (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

  router.put("/edit/:id", (request, response) => {
    let id = request.params.id;
    const { category_id, product_name, detail, Price, image } = request.body 
    const sql = "UPDATE products SET category_id = ?, product_name = ?,detail = ?,Price = ?,image = ? WHERE product_id = ?"
    db.query(sql, [ category_id, product_name, detail, Price, image,id], (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

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
