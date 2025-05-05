module.exports = (sequelize, DataTypes) => {
  const BasketItem = sequelize.define("BasketItem", {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    basketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Baskets",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
  });

  BasketItem.associate = (models) => {
    BasketItem.belongsTo(models.Basket, { foreignKey: "basketId" });
    BasketItem.belongsTo(models.Product, { foreignKey: "productId" });
  };

  return BasketItem;
};
