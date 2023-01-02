const service = require("../service/product");

/**-----------------------Get--------- */
const getProducts = async (req, res) => {
  let id = req.params.id;
  try {
    if (id) {
      const products = await service.getProduct(id);
      return res.status(200).json(products);
    } else {
      const products = await service.getProducts(id);
      return res.status(200).json(products);
    }
  } catch (err) {
    console.log(err);
  }
};
/**-----------------------create--------- */
const createProducts = async (req, res) => {
  const product = req.body;
  const productCreate = await service.createProducts(product);
  return res.status(200).json(productCreate);
};
/**-----------------------update--------- */
const updateProducts = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const productUpdate = await service.updateProduct(id, product);
  res.send("todo pelota");
};
/**-----------------------delete--------- */
const deleteProducts = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      delete: false,
      msg: "no envio",
    });
  }
  const productDelete = await service.deleteProduct(id);
  res.status(200),
    json({
      delete: true,
      msg: "Delete ",
      productDelete,
    });
};

module.exports = {
  getProducts,
  createProducts,
  updateProducts,
  deleteProducts,
};
