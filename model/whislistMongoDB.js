const mongoose = require("mongoose");

/**Esquema del documento carrito */

const whishlistSchema = mongoose.Schema({
  whishlist: Array,
});

//model of documente storage
const WhishlistModel = mongoose.model("whishlists", whishlistSchema);

class WhishlistModelMongoDB {
  //CRUD -> C
  async createWhishlist(whishlist) {
    try {
      const whishlistSave = new WhishlistModel({ whishlist });
      await whishlistSave.save();
      return whishlist;
    } catch (error) {
      console.log("Error in CreateWhislist in MONGODB.model" + error);
      return {};
    }
  }
}
module.exports = WhishlistModelMongoDB;
