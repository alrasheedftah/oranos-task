const { validate, ValidationError, Joi } = require('express-validation')

const HospitalValidation = {
    body: Joi.object({
      name: Joi.string()
        .required(),
      logo: Joi.string()
        .required(),
      about: Joi.string()
        .required(),
      phone:Joi.string()
      .required(),  
      specialty:Joi.string()
      .required(),
      doctors:Joi.array()
      // .required()

    }),
  }

  module.exports = HospitalValidation;