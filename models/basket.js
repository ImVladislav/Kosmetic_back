module.exports = (sequelize, DataTypes) => {
  const Basket = sequelize.define("Basket", {
    owner: {
      type: DataTypes.INTEGER,
      allowNull: true, // null якщо неавторизований
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: true, // null якщо авторизований
    },
  });

  Basket.associate = (models) => {
    Basket.belongsTo(models.User, { foreignKey: "owner", allowNull: true });
    Basket.hasMany(models.BasketItem, { foreignKey: "basketId" });
  };

  return Basket;
};
