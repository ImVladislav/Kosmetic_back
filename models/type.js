module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define("Type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  });

  Type.associate = (models) => {
    // Type.hasMany(models.Product, { foreignKey: "type" }); //
    Type.belongsToMany(models.Brand, { through: "TypeBrand" }); //
  };

  return Type;
};
