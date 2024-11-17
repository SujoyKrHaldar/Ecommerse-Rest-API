import Joi from "joi";

const ValidationSchema = {
  validateRegData: Joi.object({
    name: Joi.string().min(3).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    phone: Joi.string()
      .pattern(/^\d{10}$/)
      .label("Phone"),
    role: Joi.string().valid("admin", "employer", "candidate").label("Role"),
  }),

  validateLoginData: Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  }),
};

export default ValidationSchema;
