require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./db");
const models = require("./models/models");
const router = require("./routes/index");
const errorHandler = require("./middlewares/ErrorHandlingMiddleware");

const { PORT = 3000 } = process.env;

const app = express();
const swaggerDocs = require("./docs/swagger");

app.use(cors());
app.use(express.json());

// Swagger
swaggerDocs(app);

// роутинг
app.use("/api", router);

// обробка помилок
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    sequelize
      .sync({ force: false }) // або { alter: true } якщо хочеш оновлювати структуру
      .then(() => console.log("Database synced"))
      .catch((err) => console.error("Error syncing database:", err));

    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
