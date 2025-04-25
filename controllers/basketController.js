const { Basket, OrderedItem } = require("../models");
const ApiError = require("../helpers/ApiError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

// Додати товар в кошик
const addToBasket = async (req, res) => {
  const { productId, quantity } = req.body;
  const owner = req.user.id;

  let basket = await Basket.findOne({ where: { owner } });
  if (!basket) {
    basket = await Basket.create({ owner });
  }

  const item = await OrderedItem.create({
    basketId: basket.id,
    productId,
    quantity: quantity || 1,
  });

  res.json({ item });
};

//Отримати всі товари в кошику по користувачу
const getBasket = async (req, res) => {
  // const { id } = req.params;
  const owner = req.user.id;

  const basket = await Basket.findOne({
    where: { owner: userId },
    include: {
      model: OrderedItem,
      include: ["Product"],
    },
  });

  if (!basket) return res.json({ items: [] });
  res.json(basket.OrderedItems || []);
};

// Оновити кількість товару в кошику

const updateQuantity = async (req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity <= 0) {
    return next(ApiError.badRequest("Кількість має бути більшою за 0"));
  }

  const item = await OrderedItem.findByPk(id);
  if (!item) {
    return next(ApiError.notFound("Товар не знайдено"));
  }

  item.quantity = quantity;
  await item.save();

  res.json({
    message: "Кількість оновлено",
    item,
  });
};

// Видалити товар з кошика
const deleteBasketItem = async (req, res, next) => {
  const { id } = req.params;
  const owner = req.user.id;

  const item = await OrderedItem.findOne({
    where: { id },
    include: {
      model: Basket,
      where: { owner },
    },
  });

  if (!item) {
    return next(
      ApiError.notFound("Товар не знайдено або не належить користувачу")
    );
  }

  await OrderedItem.destroy({ where: { id } });

  res.json({ message: "Товар видалено з кошика" });
};
// Очистити кошик
const clearBasket = async (req, res) => {
  const userId = req.user.id;

  const basket = await Basket.findOne({ where: { owner: userId } });
  if (!basket) return res.status(404).json({ message: "Basket not found" });

  await OrderedItem.destroy({ where: { basketId: basket.id } });

  res.json({ message: "Basket cleared" });
};

module.exports = {
  addToBasket: ctrlWrapper(addToBasket),
  getBasket: ctrlWrapper(getBasket),
  updateQuantity: ctrlWrapper(updateQuantity),
  deleteBasketItem: ctrlWrapper(deleteBasketItem),
  clearBasket: ctrlWrapper(clearBasket),
};
