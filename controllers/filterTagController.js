const fs = require("fs");
const xlsx = require("xlsx");
const { FilterTag } = require("../models");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const ApiError = require("../helpers/ApiError");

const importFilterTagFromExcel = async (req, res, next) => {
  if (!req.file || !req.file.path) {
    return next(ApiError.badRequest("Файл не надано"));
  }

  const workbook = xlsx.readFile(req.file.path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet);

  if (!rows.length) {
    return next(ApiError.badRequest("Файл порожній або некоректний"));
  }

  console.log("Знайдено рядків:", rows.length);

  let created = 0;
  let skipped = 0;

  for (const row of rows) {
    if (!row.type) continue;

    const where = {
      type: row.type,
      value: row.value || null,
    };

    const existing = await FilterTag.findOne({ where });

    if (existing) {
      console.log("Пропущено (вже існує):", row.type, row.value);
      skipped++;
      continue;
    }

    await FilterTag.create(row);
    console.log("Створено:", row.type, row.value);
    created++;
  }

  fs.unlinkSync(req.file.path);
  res.json({ message: `Імпорт завершено успішно`, created, skipped });
};

// Отримати всі фільтри
const getAllFilterTags = async (req, res, next) => {
  const tags = await FilterTag.findAll({
    order: [["id", "ASC"]],
  });

  if (!tags.length) {
    return next(ApiError.notFound("Filter tags not found"));
  }

  res.json(tags);
};
// Отримати всі фільтри з групуванням
const getGroupedFilterTags = async (req, res, next) => {
  const tags = await FilterTag.findAll({
    order: [
      // ["type", "ASC"],
      ["id", "ASC"],
    ],
  });

  if (!tags.length) {
    return next(ApiError.notFound("Filter tags not found"));
  }

  const grouped = tags.reduce((acc, tag) => {
    if (!acc[tag.type]) acc[tag.type] = [];
    acc[tag.type].push({ id: tag.id, value: tag.value });
    return acc;
  }, {});

  res.json(grouped);
};

module.exports = {
  importFilterTagFromExcel: ctrlWrapper(importFilterTagFromExcel),
  getAllFilterTags: ctrlWrapper(getAllFilterTags),
  getGroupedFilterTags: ctrlWrapper(getGroupedFilterTags),
};
