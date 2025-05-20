const fs = require("fs");

const xlsx = require("xlsx");
const { FilterTag } = require("../models");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const ApiError = require("../helpers/ApiError");
const path = require("path");

// Імпорт фільтрів з Excel
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
// Експорт фільтрів в Excel
const exportFilterTagToExcel = async (req, res, next) => {
  const tags = await FilterTag.findAll({
    order: [["id", "ASC"]],
  });

  if (!tags.length) {
    return next(ApiError.notFound("Filter tags not found"));
  }

  const data = tags.map(({ id, type, value }) => ({
    id,
    type,
    value,
  }));
  console.log("Отримано дані для експорту:", data.length);
  const worksheet = xlsx.utils.json_to_sheet(data);
  console.log("Згенеровано лист Excel");
  const workbook = xlsx.utils.book_new();
  console.log("Створено нову книгу Excel");
  xlsx.utils.book_append_sheet(workbook, worksheet, "FilterTags");
  console.log("Додано лист до книги Excel");

  const filePath = path.join(__dirname, "../uploads/FilterTags.xlsx");
  xlsx.writeFile(workbook, filePath);

  res.download(filePath, "FilterTags.xlsx", (err) => {
    if (!err) {
      console.log("Файл успішно відправлено");
      setTimeout(() => fs.unlinkSync(filePath), 1000); // очищення файлу після відправки
    }
  });
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
  exportFilterTagToExcel: ctrlWrapper(exportFilterTagToExcel),
  getAllFilterTags: ctrlWrapper(getAllFilterTags),
  getGroupedFilterTags: ctrlWrapper(getGroupedFilterTags),
};
