module.exports = (sequelize, DataTypes) => {
  const TypeBrand = sequelize.define("TypeBrand", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  });

  return TypeBrand;
};
