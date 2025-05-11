const { Basket, BasketItem, Product } = require("../models");
const ApiError = require("../helpers/ApiError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

// Додати або оновити товар у кошику
const addOrUpdateItem = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user?.id || null;
  const sessionId = req.sessionID;

  if (!productId || !quantity || quantity < 1) {
    throw ApiError.badRequest("Невірний productId або quantity");
  }

  const product = await Product.findByPk(productId);
  if (!product) {
    throw ApiError.notFound("Товар не знайдено");
  }

  let basket = await Basket.findOne({
    where: userId ? { owner: userId } : { sessionId },
  });

  if (!basket) {
    basket = await Basket.create(userId ? { owner: userId } : { sessionId });
  }

  let item = await BasketItem.findOne({
    where: { basketId: basket.id, productId },
  });

  if (item) {
    item.quantity = quantity;
    await item.save();
  } else {
    item = await BasketItem.create({
      basketId: basket.id,
      productId,
      quantity,
    });
  }

  res.status(200).json(item);
};

// Отримати кошик користувача
const getBasket = async (req, res, next) => {
  const userId = req.user?.id || null;
  const sessionId = req.sessionID;

  const basket = await Basket.findOne({
    where: userId ? { owner: userId } : { sessionId },
    include: {
      model: BasketItem,
      include: {
        model: Product,
        attributes: ["id", "name", "images", "price", "priceOPT", "amount"],
      },
    },
  });

  if (!basket) return res.json({ items: [], totalSum: 0 });

  const validItems = [];
  const isOptUser = req.user?.optUser;

  const maintenanceTasks = basket.BasketItems.map(async (item) => {
    const product = item.Product;

    if (!product || product.amount === 0) {
      await item.destroy();
      return;
    }

    if (item.quantity > product.amount) {
      item.quantity = product.amount;
      await item.save();
    }

    const price = isOptUser ? product.priceOPT : product.price;
    validItems.push({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      price,
      total: price * item.quantity,
      product,
    });
  });

  await Promise.all(maintenanceTasks);

  const totalSum = validItems.reduce((sum, i) => sum + i.total, 0);

  res.json({ items: validItems, totalSum });
};

// Видалити товар з кошика
const removeItem = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user?.id || null;
  const sessionId = req.sessionID;
  const basket = await Basket.findOne({
    where: userId ? { owner: userId } : { sessionId },
  });
  if (!basket) throw ApiError.notFound("Кошик не знайдено");

  const item = await BasketItem.findOne({
    where: { basketId: basket.id, productId },
  });

  if (!item) throw ApiError.notFound("Товар у кошику не знайдено");

  await item.destroy();
  res.status(204).send();
};

// Очистити весь кошик
const clearBasket = async (req, res, next) => {
  const userId = req.user?.id || null;
  const sessionId = req.sessionID;
  const basket = await Basket.findOne({
    where: userId ? { owner: userId } : { sessionId },
  });
  if (!basket) throw ApiError.notFound("Кошик не знайдено");

  await BasketItem.destroy({ where: { basketId: basket.id } });
  res.json({ message: "Кошик очищено" });
};

module.exports = {
  addOrUpdateItem: ctrlWrapper(addOrUpdateItem),
  getBasket: ctrlWrapper(getBasket),
  removeItem: ctrlWrapper(removeItem),
  clearBasket: ctrlWrapper(clearBasket),
};
