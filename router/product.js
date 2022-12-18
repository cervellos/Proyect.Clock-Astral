const express = require("express");
const routerProducts = express.Router();

const controller = require("../controller/product");
//CRUD
/**Get All/one (Read)- request de todos los productos */
routerProducts.get("/:id?", controller.getProducts);
/**post All/one(Create) - request de todos los productos */
routerProducts.post("/", controller.createProducts);
/**put All/one (update)- request de todos los productos */
routerProducts.put("/:id", controller.updateProducts);
/**del  All/one(delete) - request de todos los productos */
routerProducts.delete("/:id", controller.deleteProducts);

module.exports = routerProducts;
