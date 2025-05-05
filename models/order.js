module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    total: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
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
    paymentMethod: DataTypes.STRING,
    comments: DataTypes.TEXT,
    delivery: DataTypes.STRING,
    warehouse: DataTypes.STRING,
    address: DataTypes.STRING,
    building: DataTypes.STRING,
    apartment: DataTypes.STRING,
    orderNumber: DataTypes.STRING,
    date: DataTypes.DATE,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { as: "ownerInfo", foreignKey: "owner" });
    Order.hasMany(models.OrderedItem, { foreignKey: "orderId" });
  };

  return Order;
};
