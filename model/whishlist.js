const WhishlistModelMongoDB = require("./whislistMongoDB");

class WhishlistModel {
  static get(type) {
    switch (type) {
      case "MONGODB":
        console.log("PERSISTENCIA EN MONGODB (carrito");
        return new WhishlistModelMongoDB();

      default:
        console.log("PERSISTENCIA EN MONGODB (carrito");
        return new WhishlistModelMongoDB();
    }
  }
}

module.exports = WhishlistModel;
