const Joi = require("joi");

class ProductValidation {
  static validity(product) {
    const productSchema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
      mark: Joi.string().required(),
      category: Joi.string().required(),
      details: Joi.string().required(),
      photo: Joi.string().empty(""),
      sending: Joi.boolean().required(),
    });

    const { error } = productSchema.validate(product); // El método validate te devuelve un obj

    console.log(error); // Si hay error, tiene contenido. Si lo hay contenido dentro error, quiere decir que no ocurrió ningún problema de validación
    return error;
  }
}

module.exports = ProductValidation;
