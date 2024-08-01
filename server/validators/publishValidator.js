const Joi = require("joi");

const publishValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    price: Joi.number().required(),
    inventory: Joi.number().required(),
    picture: Joi.any(),
    description: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = { publishValidation };
