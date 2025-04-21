module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define("Brand", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      logo: DataTypes.STRING,
    });
  
    return Brand;
  };