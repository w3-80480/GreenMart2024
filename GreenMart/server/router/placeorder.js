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

// router.get("/", (request, response) => {
//     const sql = `SELECT cart.cart_id, 
//     products.product_name,
//     products.price AS ProductPrice,
//     cart.price AS TotalPrice, 
//     products.image, 
//     cart.quantity 
//     FROM 
//     cart 
//     JOIN 
//     products ON cart.product_id = products.product_id`
//     db.query(sql, request.params.id, (error, data) => {
//       response.send(utils.createResult(error, data))
//     })
//   })

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

  router.post("/", (request, response) => {
    const {user_id, total_amount  ,address_id} = request.body
    const sql =`
    INSERT INTO orders (user_id, total_amount , order_date ,address_id) VALUES (?, ?, current_date(),?);
  SET @orderId = LAST_INSERT_ID();
  select @orderID;
  INSERT INTO order_details (order_id, product_id, quantity, price)
  SELECT @orderId, product_id, quantity, price FROM cart WHERE user_id =${user_id};
  select * from order_details;
  delete from order_details;
  DELETE FROM cart WHERE user_id =${user_id};
  `
    
    db.query(
      sql,
      [ user_id, total_amount  ,address_id],
      (error, data) => {
        response.send(utils.createResult(error, data))
      }
    )
  })


module.exports = router
