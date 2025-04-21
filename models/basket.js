module.exports = (sequelize, DataTypes) => {
    const Basket = sequelize.define("Basket", {
      owner: { type: DataTypes.INTEGER },
      orderedItem: { type: DataTypes.INTEGER },
    });
  
    Basket.associate = (models) => {
      // Перевірка, чи існує OrderedItem в models
      if (models.OrderedItem) {
        Basket.hasMany(models.OrderedItem, { foreignKey: "basketId" });
      }
    };
  
    return Basket;
  };