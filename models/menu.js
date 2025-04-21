module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define("Menu", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      level: { type: DataTypes.INTEGER, allowNull: false },
      parentId: { type: DataTypes.INTEGER },
      brand: { type: DataTypes.STRING },
      category: { type: DataTypes.STRING },
      url: { type: DataTypes.STRING },
      children: { type: DataTypes.JSON },
    });
  
    return Menu;
  };
  