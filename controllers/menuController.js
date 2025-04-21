const { Product } = require("../models");

const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAllMenu = async (req, res, next) => {
  // const products = await Product.findAll({});
  const category = await Product.findAll({ category: "category" });
  const subCategory = await Product.findAll({ subCategory: "subCategory" });
  const subSubCategory = await Product.findAll({
    subSubCategory: "subSubCategory",
  });
  const products = [...category, ...subCategory, ...subSubCategory];
  return res.json(products);
};

module.exports = {
  getAllMenu: ctrlWrapper(getAllMenu),
};
