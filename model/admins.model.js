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
  },
  { timestamps: true }
);
adminSchema.methods.hashPassword = (plainPW) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(plainPW, salt);
  return hashedPassword;
};
adminSchema.methods.generateToken = () => {
  token = JWT.sign(
    { email: this.email, id: this.id },
    process.env.JWT_SECRET_KEY
  );
  return token;
};
const Admin = model("Admin", adminSchema);
module.exports = Admin;
