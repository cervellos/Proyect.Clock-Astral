const mercadopago = require("mercadopago");
const service = require("../service/whishlist");

const saveWhishlist = async (req, res) => {
  const whishlist = req.body;
  const whishlistSaved = await service.saveWhishlist(whishlist);
  res.status(201).json(whishlistSaved);
  let items = [];
  for (let item in whishlistSaved) {
    items.push({
      title: item.name,
      unit_price: Number(item.price),
      quantity: Number(item.count),
    });
  }
  let preference = {
    items: items,
    back_urls: {
      success: "http://localhost:8080/api/whislist/feedback",
      failure: "http://localhost:8080/api/whislist/feedback",
      pending: "http://localhost:8080/api/whislist/feedback",
    },
    auto_return: "approved",
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
        items,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
module.exports = {
  saveWhishlist,
};
