const mongoose = require("mongoose");

/**Esquemer de documento productos */

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  mark: String,
  category: String,
  detalis: String,
  phote: String,
  Send: Boolean,
});
/**Modelo del documento */
const productModel = mongoose.model("products", productSchema);

/**--------------------------- */

class ProductModelMongoDB {
  async conectDB() {
    try {
      await mongoose.connect(process.env.URI_MONGODB_REMOTA);
      console.log("base de datos");
    } catch (err) {
      console.warn(err + "este error");
    }
  }

  async readProducts() {
    const products = await productModel.find({});
    return products;
  }
  async readProduct(id) {
    const products = await productModel.findById(id);
    return products;
  }
  /**CRUD c: create -> http method get*/
  async createProduct(product) {
    try {
      const productSave = new productModel(product);
      await productSave.save();
      return productSave;
    } catch (error) {
      console.log("error" + error);
    }
  }
  async updateProduct(id, product) {
    try {
      const res = await productModel.updateOne({ _id: id }, { $set: product });
      return res;
    } catch (error) {}
  }
  /**CRUD c: create -> http method POST*/
  async deleteProduct(id) {
    try {
      await productModel.findByIdAndDelete(id);
      return "ok deleteProduct";
    } catch (error) {
      console.log("error en delete producto" + error);
    }
  }
}
module.exports = ProductModelMongoDB;
