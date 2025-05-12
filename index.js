require("dotenv").config();
const express = require("express");
const session = require("express-session"); // для роботи з сесіями
const MySQLStore = require("express-mysql-session")(session); // для роботи з сесіями
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

// ✅ CORS whitelist
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://www.beautyblossom.com.ua",
    "https://kosmetic-front.vercel.app",
  ],
  credentials: true, // якщо працюєш із сесіями або cookies
};
app.use(cors(corsOptions));

// ✅ MySQL session store
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(
  session({
    key: "beautyblossom.sid",
    secret: "beautyblossom-secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 днів
    },
  })
);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger)); // використовується для логування запитів

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
