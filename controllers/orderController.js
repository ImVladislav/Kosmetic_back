const {
  Order,
  OrderedItem,
  Product,
  User,
  Basket,
  BasketItem,
} = require("../models");
const ApiError = require("../helpers/ApiError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Op } = require("sequelize");

// генерація унікального номера замовлення
const generateOrderNumber = () => {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const milliseconds = currentTime.getMilliseconds();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedMilliseconds =
    milliseconds < 10
      ? `00${milliseconds}`
      : milliseconds < 100
      ? `0${milliseconds}`
      : milliseconds;

  return `${hours}${formattedMinutes}${formattedSeconds}${formattedMilliseconds}`;
};

/** Створення замовлення */
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

  const basket = await Basket.findOne({
    where: { owner: req.user.id },
    include: [BasketItem],
  });
  if (!basket || basket.BasketItems.length === 0)
    throw ApiError.badRequest("Кошик порожній");

  let total = 0;
  const orderedItems = await Promise.all(
    basket.BasketItems.map(async (item) => {
      const product = await Product.findByPk(item.productId);
      if (!product || product.amount === 0) return null;

      const price = req.user.optUser ? product.priceOPT : product.price;
      total += price * item.quantity;

      return {
        productId: product.id,
        quantity: item.quantity,
        price,
        productName: product.name,
        productImage: product.images,
      };
    })
  );

  const filteredItems = orderedItems.filter(Boolean);
  if (filteredItems.length === 0)
    throw ApiError.badRequest("Всі товари з кошика недоступні");

  const newOrder = await Order.create({
    owner: req.user.id,
    total,
    paymentMethod,
    comments,
    delivery,
    warehouse,
    address,
    building,
    apartment,
    date: new Date(),
    orderNumber: generateOrderNumber(),
  });

  await OrderedItem.bulkCreate(
    filteredItems.map((item) => ({ ...item, orderId: newOrder.id }))
  );

  await BasketItem.destroy({ where: { basketId: basket.id } });

  res.status(201).json({
    message: "Замовлення створено",
    orderNumber: newOrder.orderNumber,
  });
};

/** Отримання списку замовлень користувача */
const getUserOrders = async (req, res) => {
  const orders = await Order.findAll({
    where: { owner: req.user.id },
    include: [OrderedItem],
    order: [["createdAt", "DESC"]],
  });
  res.json(orders);
};

/** Отримання замовлення користувача по id */
const getUserOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: { id, owner: req.user.id },
    include: [OrderedItem],
  });
  if (!order) throw ApiError.notFound("Замовлення не знайдено");
  res.json(order);
};

/** Отримання всіх замовлень (тільки для адміністратора) */
// const getAllOrdersAdmin = async (req, res) => {
//   const orders = await Order.findAll({
//     include: [User, OrderedItem],
//     order: [["createdAt", "DESC"]],
//   });
//   res.json(orders);
// };

const getAllOrdersAdmin = async (req, res) => {
  const {
    page = 1,
    limit = 24,
    email,
    status,
    fullName,
    orderNumber,
    date,
    paymentMethod,
    total,
  } = req.query;

  const offset = (page - 1) * limit;

  const where = {};
  const userWhere = {};

  if (email) userWhere.email = email;
  if (orderNumber) where.orderNumber = { [Op.like]: `%${orderNumber}%` };
  if (date) {
    where.date = {
      [Op.gte]: new Date(date),
      [Op.lt]: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
    };
  }
  if (paymentMethod) where.paymentMethod = { [Op.like]: `%${paymentMethod}%` };
  if (status && status !== "Всі") where.status = status;
  if (total) where.total = +total;

  if (fullName) {
    const [firstName, lastName] = fullName.trim().split(" ");
    userWhere.firstName = { [Op.like]: `%${firstName || ""}%` };
    userWhere.lastName = { [Op.like]: `%${lastName || ""}%` };
  }

  const result = await Order.findAndCountAll({
    where,
    include: [
      {
        model: User,
        as: "ownerInfo",
        where: userWhere,
        attributes: ["firstName", "lastName", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit: +limit,
    offset,
  });

  res.json({
    total: result.count,
    totalPages: Math.ceil(result.count / limit),
    page: +page,
    orders: result.rows,
  });
};

/** Отримання замовлення по id (тільки для адміністратора) */
const getOrderByIdAdmin = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id, {
    include: [User, OrderedItem],
  });
  if (!order) throw ApiError.notFound("Замовлення не знайдено");
  res.json(order);
};

/** Оновлення статусу замовлення (тільки для адміністратора) */
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findByPk(id);
  if (!order) throw ApiError.notFound("Замовлення не знайдено");

  order.status = status;
  await order.save();

  res.json({ message: "Статус оновлено", status: order.status });
};

module.exports = {
  createOrder: ctrlWrapper(createOrder),
  getUserOrders: ctrlWrapper(getUserOrders),
  getUserOrderById: ctrlWrapper(getUserOrderById),
  getAllOrdersAdmin: ctrlWrapper(getAllOrdersAdmin),
  getOrderByIdAdmin: ctrlWrapper(getOrderByIdAdmin),
  updateOrderStatus: ctrlWrapper(updateOrderStatus),
};
