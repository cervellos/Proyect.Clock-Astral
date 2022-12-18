const ProductModel = require("../model/product");
//const ProductValidation = require("../")

const model = ProductModel.get(process.env.PERSISTENCIA); // File ° MONGODB

const getProduct = async (id) => {
  let product = await model.readProduct(id);
  return product;
};

const getProducts = async () => {
  let products = await model.readProducts();
  return products;
};
const createProducts = async (product) => {
  const productCreate = await model.createProduct(product);
  return productCreate;
};

const deleteProduct = async (id) => {
  const productDelete = await model.deleteProduct(id);
  return productDelete;
};
const updateProduct = async (id, product) => {
  const productUpdate = await model.updateProduct(id, product);
  return productUpdate;
};
module.exports = {
  getProduct,
  getProducts,
  createProducts,
  deleteProduct,
  updateProduct,
};
