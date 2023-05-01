const Admin = require("../model/admins.model");

const fetchSingleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    res.status(200).json({
      Message: "Fetch successful",
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Messgae: error.message });
  }
};

const fetchAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({
      Message: "Fetch successful",
      admins,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: error.message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.findByIdAndDelete(id);
    return res.status(201).json({ Message: "delete successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Messgae: error.message });
  }
};

module.exports = { fetchAllAdmin, fetchSingleAdmin, deleteAdmin };
