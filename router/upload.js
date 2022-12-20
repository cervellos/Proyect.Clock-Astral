const express = require("express");
const upload = require("../config/multer");

const routerUpload = express.Router();
const controller = require("../controller/upload");

/**POST -requieres para agregar */
routerUpload.post("/", upload.single("photo"), controller.uploadImagen);
module.exports = routerUpload;
