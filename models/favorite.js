module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define("Favorite", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    });
  
    Favorite.associate = (models) => {
      Favorite.belongsTo(models.User, { foreignKey: "owner" });
      Favorite.belongsTo(models.Product, { foreignKey: "productId" });
    };
  
    return Favorite;
  };