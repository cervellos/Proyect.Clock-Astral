const service = require("../service/whishlist");
const saveWhishlist = async (req, res) => {
  const whishlist = req.body;
  const whishlistSaved = await service.saveWhishlist(whishlist);
  res.status(201).json(whishlistSaved);
};
module.exports = {
  saveWhishlist,
};
