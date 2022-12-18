const express = require("express");
const routerWhishlist = express.Router();
const controller = require("../controller/whishlist.controller");

/**POST -requieres para agregar */
routerWhishlist.post("/", controller.saveWhishlist);
module.exports = routerWhishlist;
