module.exports = (sequelize, DataTypes) => {
    const OrderedItem = sequelize.define("OrderedItem", {
      quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    });
  
    OrderedItem.associate = (models) => {
      OrderedItem.belongsTo(models.Product, { foreignKey: "productId" });
      OrderedItem.belongsTo(models.Order, { foreignKey: "orderId" });
      OrderedItem.belongsTo(models.Basket, { foreignKey: "basketId" });
    };
  
    return OrderedItem;
  };
  