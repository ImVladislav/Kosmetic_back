require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./models"); // models/index.js
const router = require("./routes/index");
const errorHandler = require("./middlewares/ErrorHandlingMiddleware");
const swaggerDocs = require("./docs/swagger"); // ТВОЙ swagger – залишаємо обов'язково

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger
swaggerDocs(app); // ✅ НЕ ВИДАЛЯЄМО

// API routes
app.use("/api", router);

// Error middleware
app.use(errorHandler);

// Запуск сервера
const start = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: false }); // або { force: false }

    app.listen(PORT, () =>
      console.log(`✅ SERVER RUNNING on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err);
  }
};

start();
