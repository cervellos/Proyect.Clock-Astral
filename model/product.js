const productModelMongoDB = require("./productMongoDB");
const ProductModelFile = require("./productsFile");
//TODO bases de datos relacionales
class ProductModel {
  static get(tipo) {
    switch (tipo) {
      case "MONGODB":
        console.log("***persistencia en mongo");
        const mongodb = new productModelMongoDB();
        mongodb.conectDB();
        return mongodb;

      case "FILE":
        console.log("**persistencia");
        const file = new ProductModelFile();
        return file;

      default:
        console.log(" ningun tipo!");
        break;
    }
  }
}
module.exports = ProductModel;
