const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const { Product } = require("../models");
const ApiError = require("../helpers/ApiError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

/** 🔹 Отримати всі продукти */
const getAllProducts = async (req, res, next) => {
  const { page = 1, limit = 32, filterTagIds } = req.query;
  const offset = (+page - 1) * +limit;

  const whereClause = {};
  const orderClause = [];

  // Категорії
  if (req.query.category) {
    whereClause[Op.or] = [
      { category: req.query.category },
      { subCategory: req.query.category },
      { subSubCategory: req.query.category },
    ];
  }

  // Бренд
  if (req.query.brand) {
    whereClause.brand = req.query.brand;
  }

  // Новинки
  if (req.query.newness === "true") {
    whereClause.newness = true;
  }

  // Знижка
  if (req.query.sale === "true") {
    whereClause.sale = true;
  }

  // Наявність
  if (req.query.amount === "true") {
    whereClause.amount = { [Op.ne]: 0 };
  }

  // Пошук за фільтрами (filterTagIds)
  if (filterTagIds) {
    const tagArray = Array.isArray(filterTagIds)
      ? filterTagIds
      : filterTagIds.split(",").map((id) => id.trim());

    whereClause[Op.and] = tagArray.map((tagId) => ({
      filterTagIds: {
        [Op.like]: `%${tagId}%`,
      },
    }));
  }

  // Сортування
  if (req.query.price === "true") orderClause.push(["price", "ASC"]);
  if (req.query.price === "false") orderClause.push(["price", "DESC"]);
  if (req.query.priceOPT === "true") orderClause.push(["priceOPT", "ASC"]);
  if (req.query.priceOPT === "false") orderClause.push(["priceOPT", "DESC"]);
  if (req.query.name === "true") orderClause.push(["name", "ASC"]);
  if (req.query.name === "false") orderClause.push(["name", "DESC"]);

  const products = await Product.findAndCountAll({
    where: whereClause,
    limit: +limit,
    offset,
    order: orderClause,
  });

  if (!products.rows.length) {
    return next(ApiError.notFound("Products not found"));
  }

  return res.json({
    totalItems: products.count,
    totalPages: Math.ceil(products.count / +limit),
    currentPage: +page,
    products: products.rows,
  });
};

/** 🔹 Отримати продукт за ID */
const getProductById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(ApiError.badRequest("Missing product ID"));
  const product = await Product.findByPk(id);
  if (!product) return next(ApiError.notFound("Product not found"));
  return res.json(product);
};

/** 🔹 Створити продукт */
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      article,
      code,
      amount,
      description,
      price,
      priceOld,
      priceOldOPT,
      priceOPT,
      brand,
      images,
      newness,
      sale,
      category,
      subCategory,
      subSubCategory,
      country,
      compound,
    } = req.body;

    if (!name || !article || !code || !description || !brand) {
      return next(ApiError.badRequest("Missing required fields"));
    }

    const existingProduct = await Product.findOne({ where: { code } });
    if (existingProduct) {
      return next(ApiError.badRequest("Product with this code already exists"));
    }

    const product = await Product.create({
      name,
      article,
      code: Number(code),
      amount: amount !== null ? Number(amount) : 0,
      description,
      price: price !== null ? Number(price) : 0,
      priceOld: priceOld !== null ? Number(priceOld) : 0,
      priceOldOPT: priceOldOPT !== null ? Number(priceOldOPT) : 0,
      priceOPT: priceOPT !== null ? Number(priceOPT) : 0,
      brand,
      images: images || "",
      newness: Boolean(newness),
      sale: Boolean(sale),
      category: category || "",
      subCategory: subCategory || "",
      subSubCategory: subSubCategory || "",
      country: country || "",
      compound: compound || "",
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error); // додали вивід реальної помилки
    next(
      ApiError.internal(error.message || "Server error while creating product")
    );

    // console.error("Error in createProduct:", error);
    // next(ApiError.internal("Server error while creating product"));
  }
};

/** 🔹 Оновити продукт */
const updateProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(ApiError.badRequest("Missing product ID"));

  const product = await Product.findByPk(id);
  if (!product) return next(ApiError.notFound("Product not found"));

  const newProduct = await product.update(req.body);
  return res.json({ message: "Product updated successfully", newProduct });
};

/** 🔹 Видалити продукт */
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(ApiError.badRequest("Missing product ID"));

  const product = await Product.findByPk(id);
  if (!product) return next(ApiError.notFound("Product not found"));

  await product.destroy();

  return res.json({ message: "Product deleted successfully", product });
};

/** 🔹 Отримати продукти за категорією */
const getCategoryProducts = async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 32 } = req.query;
  const offset = (+page - 1) * limit;

  if (!category) return next(ApiError.badRequest("Missing category"));

  const products = await Product.findAndCountAll({
    where: {
      [Op.or]: [
        { category },
        { subCategory: category },
        { subSubCategory: category },
      ],
    },
    limit,
    offset,
  });

  if (!products.rows.length) {
    return next(ApiError.notFound("No products found for this category"));
  }

  return res.json({
    totalItems: products.count,
    totalPages: Math.ceil(products.count / limit),
    currentPage: +page,
    products: products.rows,
  });
};

/** 🔹 Отримати продукти за брендом */
const getBrandProducts = async (req, res, next) => {
  const { brand } = req.params;
  const { page = 1, limit = 32 } = req.query;
  const offset = (+page - 1) * limit;

  if (!brand) return next(ApiError.badRequest("Missing brand"));

  const products = await Product.findAndCountAll({
    where: { brand: { [Op.iLike]: brand } },
    limit,
    offset,
  });

  if (!products.rows.length) {
    return next(ApiError.notFound("No products found for this brand"));
  }

  return res.json({
    totalItems: products.count,
    totalPages: Math.ceil(products.count / limit),
    currentPage: +page,
    products: products.rows,
  });
};

/** 🔹 Пошук продуктів по назві та коду */
const getSearchQueryProducts = async (req, res, next) => {
  const { page = 1, limit = 24, query } = req.query;

  const offset = (+page - 1) * +limit;

  if (!query) return next(ApiError.badRequest("Missing search query"));
  const parsedQuery = Number(query);

  const products = await Product.findAndCountAll({
    where: {
      [Op.or]: [
        { code: { [Op.eq]: query } },
        ...(isNaN(parsedQuery) ? [] : [{ code: { [Op.eq]: parsedQuery } }]),
        { name: { [Op.like]: `%${query}%` } },
        { brand: { [Op.like]: `%${query}%` } },
        { article: { [Op.like]: `%${query}%` } },
        { category: { [Op.like]: `%${query}%` } },
        { subCategory: { [Op.like]: `%${query}%` } },
        { subSubCategory: { [Op.like]: `%${query}%` } },
      ],
    },
    limit: +limit,
    offset,
  });

  if (!products.rows.length) {
    return next(
      ApiError.notFound("No products found matching the search query")
    );
  }

  return res.json({
    totalItems: products.count,
    totalPages: Math.ceil(products.count / limit),
    currentPage: +page,
    products: products.rows,
  });
};

/** 🔹 Отримати продукти зі знижками */
const getDiscountedProducts = async (req, res, next) => {
  const { page = 1, limit = 32 } = req.query;
  const offset = (+page - 1) * limit;

  const products = await Product.findAndCountAll({
    where: { sale: true },
    limit,
    offset,
  });

  if (!products.rows.length) {
    return next(ApiError.notFound("No products found on discount"));
  }

  return res.json({
    totalItems: products.count,
    totalPages: Math.ceil(products.count / limit),
    currentPage: +page,
    products: products.rows,
  });
};

/** 🔹 Отримати новинки з продуктів */
const getNewnessProducts = async (req, res, next) => {
  const { page = 1, limit = 32 } = req.query;
  const offset = (+page - 1) * limit;

  const products = await Product.findAll({
    where: { newness: true },
    limit,
    offset,
  });

  if (!products.length) {
    return next(ApiError.notFound("No products found in news"));
  }

  return res.json({
    totalItems: products.count,
    totalPages: Math.ceil(products.count / limit),
    currentPage: +page,
    products: products.rows,
  });
};

const importProductsFromExcel = async (req, res, next) => {
  try {
    console.log("Імпорт стартував", req.file);

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    console.log("Знайдено рядків:", rows.length);

    for (const row of rows) {
      console.log("Обробка товару:", row.code);

      const existing = await Product.findOne({ where: { code: row.code } });
      if (existing) {
        await existing.update(row);
        console.log("Оновлено:", row.code);
      } else {
        await Product.create(row);
        console.log("Створено:", row.code);
      }
    }

    fs.unlinkSync(req.file.path);
    res.json({ message: "Імпорт завершено успішно" });
  } catch (err) {
    console.error("Помилка імпорту:", err);
    res.status(500).json({ message: "Помилка імпорту файлу" });
  }
};

module.exports = {
  createProduct: ctrlWrapper(createProduct),
  getAllProducts: ctrlWrapper(getAllProducts),
  getProductById: ctrlWrapper(getProductById),
  updateProduct: ctrlWrapper(updateProduct),
  deleteProduct: ctrlWrapper(deleteProduct),
  getCategoryProducts: ctrlWrapper(getCategoryProducts),
  getBrandProducts: ctrlWrapper(getBrandProducts),
  getSearchQueryProducts: ctrlWrapper(getSearchQueryProducts),
  getDiscountedProducts: ctrlWrapper(getDiscountedProducts),
  getNewnessProducts: ctrlWrapper(getNewnessProducts),
  importProductsFromExcel: ctrlWrapper(importProductsFromExcel),
};
