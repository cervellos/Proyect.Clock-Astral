const Joi = require("joi");
class ProductoValidation {
  static validity(product) {
    const productSchema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
      mark: Joi.string().required(),
      category: Joi.string().required(),
      details: Joi.string().required(),
      photo: Joi.object(),
      sending: Joi.boolean().required(),
    });
    const { error } = productSchema.validate(product);
  }
}
module.exports = ProductoValidation;
