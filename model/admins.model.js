const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const hashPassword = (plainPW) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(plainPW, salt);
  console.log("Hashed pw:", hashPassword);
  return hashPassword;
};

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
const Admin = model("Admin", adminSchema);
module.exports = Admin;
