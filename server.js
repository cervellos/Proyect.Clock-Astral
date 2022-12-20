const express = require("express");

//configuraciones
const app = express();
require("dotenv").config();

//midleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routeo de aplicacion
app.use("/api/products", require("./router/product"));
app.use("/api/upload", require("./router/upload"));
app.use("/api/whislist", require("./router/whislist"));

app.get("/", (req, res) => {
  res.send("Todo piola");
});
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) throw new Error("Todo mal" + err);
  console.log(`Todo arriba: En el puerto ${PORT}`);
});
