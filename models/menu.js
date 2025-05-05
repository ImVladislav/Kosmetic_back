module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define("Menu", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category: { type: DataTypes.STRING },
    children: [{ subCategory: { type: DataTypes.STRING }, children: [] }],
  });

  return Menu;
};
