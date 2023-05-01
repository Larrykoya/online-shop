const Admin = require("../model/admins.model");

const adminSignupController = async (req, res) => {
  try {
    const emailExist = await Admin.findOne({
      email: req.body.email,
    });
    if (emailExist)
      return res
        .status(400)
        .json({ Message: "Account already exist, please login" });
    if (req.body.password === req.body.confirmPassword) {
      delete req.body.confirmPassword;
      const admin = new Admin(req.body);
      admin.password = admin.hashPassword(req.body.password);
      await admin.save();
      const token = await admin.generateToken();
      req.session.token = token;
      //return res.redirect(303, "/items");
      return res.status(200).json({
        Message: "Admin created",
        token,
        admin,
      });
    }
    res.status(400).json({
      Message: "password must match comfirmPassword",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: error.message,
    });
  }
};

const adminLoginController = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      email: req.body.email,
    });
    if (!admin)
      return res
        .status(400)
        .json({ Message: "No account with this email, please signup" });

    const correctPassword = admin.checkPassword(req.body.password);
    if (!correctPassword)
      return res.status(400).json({ Message: "incorrect credentials" });
    const token = admin.generateToken();
    req.session.token = token;
    return res.redirect(303, "/items");
    res.status(200).json({
      Message: "Login success",
      token,
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: error.message,
    });
  }
};

const updateAdminController = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (req.body.password)
      req.body.password = admin.hashPassword(req.body.password);
    await Admin.updateOne({ _id: id }, req.body);
    res.status(201).json({ Message: "update successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Messgae: error.message });
  }
};

module.exports = {
  adminLoginController,
  adminSignupController,
  updateAdminController,
};
