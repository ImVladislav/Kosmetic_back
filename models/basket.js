module.exports = (sequelize, DataTypes) => {
  const Basket = sequelize.define("Basket", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    owner: { type: DataTypes.INTEGER },
  });

  Basket.associate = (models) => {
    Basket.hasMany(models.BasketItem, { foreignKey: "basketId" });
    Basket.belongsTo(models.User, { foreignKey: "owner" });
  };

  return Basket;
};
