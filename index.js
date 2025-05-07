require("dotenv").config();
const express = require("express");
const moment = require("moment"); // для роботи з датами
const logger = require("morgan"); // для логування
const fs = require("fs/promises"); // для роботи з файлами
const cors = require("cors");
const fileUpload = require("express-fileupload"); // для додавання файлів якщо потрібно
const path = require("path"); // для роботи з шляхами

const db = require("./models"); // Підключення до бази даних
const router = require("./routes/index"); // Підключення до маршрутів
const errorHandler = require("./middlewares/ErrorHandlingMiddleware"); // Підключення до middleware
const swaggerDocs = require("./docs/swagger"); // Підключення до swagger документації

const app = express();
const PORT = process.env.PORT || 3000;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger)); // використовується для логування запитів
app.use(cors()); // використовується для роботи з кросс-доменними запитами
app.use(express.urlencoded({ extended: true })); // використовується для роботи з формами
app.use(express.json()); // використовується для роботи з JSON
// app.use(fileUpload({}));// використовується для роботи з файлами
app.use(express.static(path.join(__dirname, "public"))); // для роботи з статичними файлами
// Swagger
swaggerDocs(app); // Підключення до swagger документації
// API routes
app.use("/api", router); // Підключення до маршрутів
// Error middleware
app.use(errorHandler); // Підключення до middleware

// Логгер
app.use(async (req, res, next) => {
  const { method, url } = req; // метод та url беремо з реквесту
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  const logData = `\n${method} ${url} ${date}`;
  //  \n щоб писало з нової строки
  await fs.appendFile("./public/server.log", logData);

  next(); // щоб експерес продовжував далі працювати ставимо некст.
});
// Запуск сервера
const start = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: false }); // або { force: false }

    app.listen(PORT, () => console.log(`✅ SERVER RUNNING on port ${PORT}`));
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err);
  }
};

start();
