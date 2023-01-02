const ProductModel = require("../model/product");
const ProductValidation = require("../utils/producto.validation");

const model = ProductModel.get(process.env.PERSISTENCIA); // File ° MONGODB

const getProduct = async (id) => {
  const product = await model.readProduct(id);
  return product;
};

const getProducts = async () => {
  let products = await model.readProducts();
  return products;
};
const createProducts = async (product) => {
  const errorValidation = ProductValidation.valid(product);

  if (!errorValidation) {
    const productCreate = await model.createProduct(product);
    return productCreate;
  } else {
    console.log(
      "Error en service.createProduct",
      errorValidation.details[0].message
    );
    return {};
  }
};

const deleteProduct = async (id) => {
  const productDelete = await model.deleteProduct(id);
  return productDelete;
};
const updateProduct = async (id, product) => {
  const errorValidation = ProductValidation.valid(product);

  if (!errorValidation) {
    const productUpdate = await model.updateProduct(id, product);
    return productUpdate;
  } else {
    console.log(
      "Error en service.createProduct",
      errorValidation.details[0].message
    );
    return {};
  }
};
module.exports = {
  getProduct,
  getProducts,
  createProducts,
  deleteProduct,
  updateProduct,
};
