const { Type } = require("../models");
const ApiError = require("../helpers/ApiError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

// 🔹 Отримати всі типи
const getAllType = async (req, res) => {
  const types = await Type.findAll();
  res.json(types);
};
// 🔹 Створити тип
const createType = async (req, res) => {
  const { name } = req.body;
  const type = await Type.create({ name });
  res.json(type);
};

const getTypeById = async (req, res) => {};
const updateType = async (req, res) => {};
const deleteType = async (req, res) => {
  const { id } = req.params;
  await Type.destroy({ where: { id } });
  res.json({ message: "Type deleted successfully" });
};

module.exports = {
  createType: ctrlWrapper(createType),
  getAllType: ctrlWrapper(getAllType),
  deleteType: ctrlWrapper(deleteType),
};
