const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
      unique: {
        args: true,
        msg: "Email already exists",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatarURL: { type: DataTypes.STRING, defaultValue: "avatar.jpg" },
    city: { type: DataTypes.STRING, defaultValue: "city" },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [10, 15], isNumeric: true },
      unique: {
        args: true,
        msg: "Number already exists",
      },
    },
    link: { type: DataTypes.STRING, defaultValue: "link" },
    offlineShop: { type: DataTypes.BOOLEAN, defaultValue: false },
    onlineShop: { type: DataTypes.BOOLEAN, defaultValue: false },
    socialMedia: { type: DataTypes.BOOLEAN, defaultValue: false },
    optUser: { type: DataTypes.BOOLEAN, defaultValue: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    token: { type: DataTypes.STRING, defaultValue: "" },
    verify: { type: DataTypes.BOOLEAN, defaultValue: false },
    verificationCode: { type: DataTypes.STRING, defaultValue: "" },
  },
  { timestamps: true }
);

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  article: { type: DataTypes.STRING, allowNull: false },
  code: {
    type: DataTypes.BIGINT,
    allowNull: false,
    // unique: true,
  },
  amount: { type: DataTypes.INTEGER, defaultValue: 0 },
  description: { type: DataTypes.TEXT, allowNull: false },
  priceOPT: { type: DataTypes.FLOAT, allowNull: false },
  priceOldOPT: { type: DataTypes.FLOAT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  priceOld: { type: DataTypes.FLOAT },
  brand: { type: DataTypes.STRING, allowNull: false },
  images: { type: DataTypes.STRING, allowNull: false },
  newness: { type: DataTypes.BOOLEAN, defaultValue: false },
  sale: { type: DataTypes.BOOLEAN, defaultValue: false },
  category: { type: DataTypes.STRING },
  subCategory: { type: DataTypes.STRING },
  subSubCategory: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  compound: { type: DataTypes.TEXT },
});

const OrderedItem = sequelize.define("orderedItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  productId: {
    type: DataTypes.INTEGER,
    references: { model: Product, key: "id" },
  },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
});

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  owner: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  paymentMethod: DataTypes.STRING,
  comments: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM(
      "Новий",
      "Прийняте в роботу",
      "Збирається",
      "Зібрано",
      "Відправлено",
      "Відміна"
    ),
    defaultValue: "Новий",
    allowNull: false,
  },
  delivery: DataTypes.STRING,
  warehouse: DataTypes.STRING,
  address: DataTypes.STRING,
  building: DataTypes.STRING,
  apartment: DataTypes.STRING,
  orderNumber: DataTypes.STRING,
  orderedItem: {
    type: DataTypes.INTEGER,
    references: { model: OrderedItem, key: "id" },
  },
  date: DataTypes.DATE,
});

const Basket = sequelize.define("basket", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  owner: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  orderedItem: {
    type: DataTypes.INTEGER,
    references: { model: OrderedItem, key: "id" },
  },
});

const Feedback = sequelize.define("feedback", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  owner: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  comment: DataTypes.TEXT,
});

const Favorite = sequelize.define("favorite", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  owner: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
  },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  logo: DataTypes.STRING,
});

const Menu = sequelize.define("menu", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  level: { type: DataTypes.INTEGER, allowNull: false },
  parentId: { type: DataTypes.INTEGER, allowNull: true }, // Для ієрархії меню
  brand: { type: DataTypes.STRING, allowNull: true }, // Якщо це бренд
  category: { type: DataTypes.STRING, allowNull: true }, // Для категорії
  url: { type: DataTypes.STRING, allowNull: true }, // URL або інший параметр для переходу
  children: { type: DataTypes.JSON, allowNull: true }, // Діти (підкатегорії) в JSON
});

// User________________________

User.hasOne(Basket, { foreignKey: "owner" });
Basket.belongsTo(User);

User.hasOne(Order, { foreignKey: "owner" });
Order.belongsTo(User);

User.hasMany(Feedback, { foreignKey: "owner" });
Feedback.belongsTo(User);

User.hasMany(Favorite, { foreignKey: "owner" });
Favorite.belongsTo(User);

// Basket_______________________________

Basket.hasMany(OrderedItem, { foreignKey: "productId" });
OrderedItem.belongsTo(Basket);

// Order__________________________________

Order.hasMany(OrderedItem, { foreignKey: "productId" });
OrderedItem.belongsTo(Order);

// OrderedItem_____________________________

// Product____________________________

// Product.hasMany(OrderedItem, { foreignKey: "productId" });
// OrderedItem.belongsTo(Product);

// Product.hasMany(Favorite, { foreignKey: "productId" });
// Favorite.belongsTo(Product);

// Product.hasMany(Brand);
// Brand.belongsTo(Product);

// Feedback__________________________________

// Favorite__________________________________

// Brand__________________________________

// Menu_____________________________________

module.exports = {
  User,
  Product,
  OrderedItem,
  Order,
  Basket,
  Feedback,
  Favorite,
  Brand,
  Menu,
};
