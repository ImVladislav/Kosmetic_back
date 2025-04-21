const ApiError = require("../helpers/ApiError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Brand } = require("../models");

// 🔹 Отримати всі літери та назви брендів
const getAllBrands = async (req, res) => {
  const brands = await Brand.findAll();

  const brandsLetters = brands.map((brand) => brand.name[0]);
  const uniqueLetters = [...new Set(brandsLetters)];

  const brandsByLetters = uniqueLetters.map((letter) => ({
    letter,
    brandsName: brands
      .filter((brand) => brand.name[0] === letter)
      .map((brand) => brand.name),
  }));

  res.json(brandsByLetters);
};

// 🔹 Отримати бренд за ID
const getBrandById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(ApiError.badRequest("Missing brand ID"));
  const brand = await Brand.findByPk(id);
  if (!brand) return next(ApiError.notFound("Brand not found"));
  return res.json(brand);
};

// 🔹 Створити бренд
const createBrand = async (req, res) => {
  const { id, name, description, logo } = req.body;
  const brand = await Brand.create({ id, name, description, logo });
  res.json(brand);
};

module.exports = {
  getAllBrands: ctrlWrapper(getAllBrands),
  getBrandById: ctrlWrapper(getBrandById),
  createBrand: ctrlWrapper(createBrand),
};
