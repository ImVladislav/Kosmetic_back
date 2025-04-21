const { Order, Basket, OrderedItem } = require("../models");
const ApiError = require("../helpers/ApiError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { date } = require("joi");

const createOrder = async (req, res) => {
  const {
    paymentMethod,
    comments,
    delivery,
    warehouse,
    address,
    building,
    apartment,
  } = req.body;
  const owner = req.user.id;

  if (
    !paymentMethod ||
    !delivery ||
    !warehouse ||
    !address ||
    !building ||
    !apartment
  ) {
    return next(ApiError.badRequest("Missing required fields"));
  }
  const basketItems = await Basket.findAll({
    where: { owner },
    include: OrderedItem,
  });

  if (!basketItems.length) {
    return next(ApiError.notFound("Basket is empty"));
  }

  const order = await Order.create({
    owner,
    paymentMethod,
    comments,
    delivery,
    warehouse,
    address,
    building,
    apartment,
    status: "Новий",
    date: new Date(),
  });
  for (const item of basketItems) {
    await OrderedItem.create({
      orderId: order.id,
      productId: item.orderedItem.productId,
      quantity: item.orderedItem.quantity,
    });
  }
  await Basket.destroy({ where: { owner } });
  res.json({ message: "Order created successfully", order });
};

module.exports = {
  createOrder: ctrlWrapper(createOrder),
};
