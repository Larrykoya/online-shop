const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
  },
  { timestamps: true }
);
adminSchema.methods.hashPassword = function (plainPW) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainPW, salt);
};
adminSchema.methods.generateToken = function () {
  return JWT.sign(
    { email: this.email, id: this.id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: 14400, //4h
    }
  );
};
adminSchema.methods.checkPassword = function (plainPW) {
  return bcrypt.compareSync(plainPW, this.password);
};
const Admin = model("Admin", adminSchema);
module.exports = Admin;
