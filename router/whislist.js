const express = require("express");
const routerWhishlist = express.Router();

const controller = require("../controller/whishlist.controller");
const { feedBack } = require("../controller/pago");

/**POST -requieres para agregar */
routerWhishlist.post("/", controller.saveWhishlist);

routerWhishlist.get("feedback", feedBack);

module.exports = routerWhishlist;
