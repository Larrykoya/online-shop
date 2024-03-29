const Joi = require("joi");
const passwordRegExp = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
);

const adminSignupSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().required(),
  password: Joi.string()
    .pattern(
      passwordRegExp,
      "8-32characters, at least one uppercase and lowercase, one number and one special character"
    )
    .required(),
  confirmPassword: Joi.string()
    .pattern(passwordRegExp, '"Password" value')
    .required(),
});

const adminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateAdminSchema = Joi.object({
  firstName: Joi.string().min(3).max(20),
  lastName: Joi.string().min(3).max(20),
  email: Joi.string(),
  password: Joi.string().pattern(
    passwordRegExp,
    "8-32characters, at least one uppercase and lowercase, one number and one special character"
  ),
});

const validateAdminUpdate = (req, res, next) => {
  const { error, value } = updateAdminSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  req.body = value;
  next();
};

const validateSignup = (req, res, next) => {
  const { error, value } = adminSignupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};

const validateLogin = (req, res, next) => {
  const { error, value } = adminLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};

module.exports = { validateSignup, validateLogin, validateAdminUpdate };
