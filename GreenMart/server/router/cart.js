const express = require("express")
const db = require("../database/db")
const utils = require("../utils")

const router = express.Router()

// router.get("/", (request, response) => {
//     const sql = "SELECT * FROM cart"
//     db.query(sql, request.params.id, (error, data) => {
//       response.send(utils.createResult(error, data))
//     })
//   })

router.get("/", (request, response) => {
    const sql = `SELECT cart.cart_id, 
    products.product_name,
    products.price AS ProductPrice,
    cart.price AS TotalPrice, 
    products.image, 
    cart.quantity 
    FROM 
    cart 
    JOIN 
    products ON cart.product_id = products.product_id`
    db.query(sql, request.params.id, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

  router.put("/inc/:pid", (request, response) => {
    const { price, cart_id } = request.body
    const pid = request.params.pid;
    const sql = `UPDATE cart
    SET quantity = quantity + 1,
        price = price + ?
    WHERE cart_id= ? AND product_id = ?`
    db.query(sql, [price, cart_id  , pid], (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

  router.put("/dec/:pid", (request, response) => {
    const { price, cart_id } = request.body
    const pid = request.params.pid;
    const sql = `UPDATE cart
    SET quantity = quantity - 1,
        price = price - ?
    WHERE cart_id= ? AND product_id = ? and quantity >0`
    db.query(sql, [price, cart_id  , pid], (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

router.post("/addcart", (request, response) => {
  const { user_id, product_id, quantity, price} = request.body
  const sql =
    "INSERT INTO cart(user_id, product_id, quantity, price) VALUES(?,?,?,?)"
  db.query(
    sql,
    [user_id, product_id, quantity, price],
    (error, data) => {
      response.send(utils.createResult(error, data))
    }
  )
})


module.exports = router
