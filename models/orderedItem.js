module.exports = (sequelize, DataTypes) => {
  const OrderedItem = sequelize.define("OrderedItem", {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    productName: { type: DataTypes.STRING, allowNull: false },
    productImage: { type: DataTypes.STRING, allowNull: false },
  });

  OrderedItem.associate = (models) => {
    OrderedItem.belongsTo(models.Order, { foreignKey: "orderId" });
    OrderedItem.belongsTo(models.Product, { foreignKey: "productId" });
  };

  return OrderedItem;
};
