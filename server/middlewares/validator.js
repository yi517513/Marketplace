const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");

class Validators {
  register = (req, res, next) => {
    const { error } = registerValidation(req.body);
    if (error) {
      console.log("In validation middleware");
      return res.status(400).send(error.details[0].message);
    }
    next();
  };
  login = (req, res, next) => {
    const { error } = loginValidation(req.body);
    if (error) {
      console.log("In validation middleware");
      return res.status(400).send(error.details[0].message);
    }
    next();
  };
}

const validators = new Validators();
module.exports = validators;
