module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      article: { type: DataTypes.STRING, allowNull: false },
      code: { type: DataTypes.BIGINT, allowNull: false },
      amount: { type: DataTypes.INTEGER, defaultValue: 0 },
      description: { type: DataTypes.TEXT, allowNull: false },
      priceOPT: { type: DataTypes.FLOAT, allowNull: false },
      priceOldOPT: { type: DataTypes.FLOAT },
      price: { type: DataTypes.FLOAT, allowNull: false },
      priceOld: { type: DataTypes.FLOAT },
      brand: { type: DataTypes.STRING, allowNull: false },
      images: { type: DataTypes.STRING, allowNull: false },
      newness: { type: DataTypes.BOOLEAN, defaultValue: false },
      sale: { type: DataTypes.BOOLEAN, defaultValue: false },
      category: { type: DataTypes.STRING },
      subCategory: { type: DataTypes.STRING },
      subSubCategory: { type: DataTypes.STRING },
      country: { type: DataTypes.STRING },
      compound: { type: DataTypes.TEXT },
    });
  
    Product.associate = (models) => {
      Product.hasMany(models.Favorite, { foreignKey: "productId" });
      Product.hasMany(models.OrderedItem, { foreignKey: "productId" });
    };
  
    return Product;
  };