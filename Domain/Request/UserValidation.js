const { validate, ValidationError, Joi } = require('express-validation')

const UserValidation = {
    body: Joi.object({
      name: Joi.string()
        .required(),
        password: Joi.string()
        .required(),
      email: Joi.string().email()
        .required(),
      phone:Joi.string()
      .required(),  
      gender:Joi.string()
      .required(),
      birth:Joi.date(),
      age:Joi.number().required()

    }),
  }

  module.exports = UserValidation;