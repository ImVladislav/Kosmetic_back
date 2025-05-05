module.exports = (sequelize, DataTypes) => {
  const ProductInfo = sequelize.define("ProductInfo", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
  });

  ProductInfo.associate = (models) => {
    ProductInfo.belongsTo(models.Product, { foreignKey: "productId" }); //
  };

  return ProductInfo;
};
