const { Basket, OrderedItem } = require("../models");
const ApiError = require("../helpers/ApiError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

// Додати товар в кошик
const createBasket = async (req, res) => {
  const { productId, quantity } = req.body;
  const owner = req.user.id;
  if (!productId || quantity <= 0)
    return next(ApiError.badRequest("Missing product ID or quantity"));

  const orderedItem = await OrderedItem.create({ productId, quantity });

  const basket = await Basket.create({ owner, orderedItem: orderedItem.id });
  res.json({ message: "Товар додано в кошик", orderedItem });
};

//Отримати всі товари в кошику по користувачу
const getBasket = async (req, res) => {
  const { id } = req.params;
  const owner = req.user.id;
  const basketItems = await Basket.findAll({
    where: { owner },
    include: OrderedItem,
  });

  if (!basketItems.length) {
    return next(ApiError.notFound("Basket is empty"));
  }
  res.json({ basketItems });
};

// Оновити кількість товару в кошику
const updateQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const owner = req.user.id;
  if (quantity <= 0) {
    return next(ApiError.badRequest("Quantity must be greater than 0"));
  }
  const OrderedItem = await OrderedItem.findByPk(id);
  if (!OrderedItem) {
    return next(ApiError.notFound("OrderedItem not found"));
  }
  OrderedItem.quantity = quantity;
  await OrderedItem.save();
  res.json({ message: "Quantity updated successfully", OrderedItem });
};

// Видалити товар з кошика
const deleteBasketItem = async (req, res) => {
  const { id } = req.params;
  const owner = req.user.id;

  const basketItem = await Basket.findByPk({
    where: { owner, orderedItem: id },
  });
  if (!basketItem) {
    return next(ApiError.notFound("OrderedItem not found"));
  }
  await OrderedItem.destroy({ where: { id } });
  await Basket.destroy({ where: { orderedItem: id, owner } });
  res.json({ message: "OrderedItem deleted successfully" });
};

module.exports = {
  createBasket: ctrlWrapper(createBasket),
  getBasket: ctrlWrapper(getBasket),
  updateQuantity: ctrlWrapper(updateQuantity),
  deleteBasketItem: ctrlWrapper(deleteBasketItem),
};
