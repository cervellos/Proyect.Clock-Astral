const mongoose = require("mongoose");

/**Esquema del documento carrito */

const whishlistSchema = mongoose.Schema({
  whishlist: Array,
});

//
const WhishlistModel = mongoose.model("whishlists", whishlistSchema);

class WhishlistModelMongoDB {
  //CRUD
  async createWhishlist(whishlist) {
    try {
      const whishlistSave = new WhishlistModel({ whishlist });
      await whishlistSave.save();
      return whishlist;
    } catch (error) {
      console.log("Errror" + error);
      return;
    }
  }
}
module.exports = WhishlistModelMongoDB;
