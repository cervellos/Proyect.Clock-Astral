const mongoose = require("mongoose");

/**Esquemer de documento productos */

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  mark: String,
  category: String,
  detalis: String,
  photo: String,
  Send: Boolean,
});
/**Modelo del documento */
const ProductModel = mongoose.model("products", productSchema);

/**--------------------------- */

class ProductModelMongoDB {
  pk = "_id";
  async conectDB() {
    try {
      await mongoose.connect(process.env.URI_MONGODB_REMOTA);
      console.log("base de datos");
    } catch (err) {
      console.warn(err + "este error");
    }
  }

  genIdKey(obj) {
    // array o un obj
    //console.log(obj)
    if (Array.isArray(obj)) {
      // true o false
      // Sacarle el guión al ID de los documentos.
      for (let i = 0; i < obj.length; i++) {
        obj[i].id = obj[i][this.pk]; // this._id => this.id
      }
    } else {
      obj.id = obj[this.pk]; // this._id => this.id
    }

    return obj;
  }

  /**CRUD c: create -> http method get*/
  async createProduct(product) {
    try {
      const productSave = new ProductModel(product);
      await productSave.save();

      const products = await ProductModel.find({}).lean();
      const productsSaved = products[products.length - 1];
      return this.genIdKey(productsSaved);
    } catch (error) {
      console.log("error en el createProduct" + error);
    }
  }
  //CRUD READ ALL
  async readProducts() {
    try {
      const products = await ProductModel.find({}).lean();
      return this.genIdKey(products);
    } catch (error) {
      console.log(`Error en readProducts: ${error}`);
      return {};
    }
  }
  async readProduct(id) {
    try {
      const products = await ProductModel.findById(id).lean();
      return this.genIdKey(products);
    } catch (error) {
      console.log("Error en ReadProduct:" + error);
      return {};
    }
  }
  async updateProduct(id, product) {
    try {
      const res = await ProductModel.updateOne({ _id: id }, { $set: product });
      console.log(res);

      const productUpdate = await ProductModel.findById(id).lean();
      return this.gendIdKey(productUpdate);
    } catch (error) {
      console.log("Error en updateProduct" + error);
      return {};
    }
  }
  /**CRUD c: delete -> http method POST*/
  async deleteProduct(id) {
    try {
      const productDelete = await productModel.findByIdAndDelete(id);
      return this.genIdKey(productDelete);
    } catch (error) {
      console.log("error en delete producto" + error);
      return {};
    }
  }
}
module.exports = ProductModelMongoDB;
