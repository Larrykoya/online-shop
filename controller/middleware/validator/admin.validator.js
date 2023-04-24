const Joi = require("joi");
const passwordRegExp = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
);

const adminSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string.required(),
  password: Joi.string()
    .pattern(
      passwordRegExp,
      "one uppercase, one lowercase, special characters [*.!@#$%^&(){}[]:;<>,.?/~_+-=|\\] , min length 8 max length 32"
    )
    .required(),
});
const validatorSignup = (req, res, next) => {
  const { error, value } = adminSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      Message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};
