const WhishlistModel = require("../model/whishlist");
const model = WhishlistModel.get(process.env.PERSISTENCIA || "MONGODB"); // File ° MONGODB

const saveWhishlist = async (whishlist) => {
  const whishlistSave = await model.createWhishlist(whishlist);
  return whishlistSave;
};
module.exports = {
  saveWhishlist,
};
