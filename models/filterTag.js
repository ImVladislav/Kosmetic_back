module.exports = (sequelize, DataTypes) => {
  const FilterTag = sequelize.define("FilterTag", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING },
    value: { type: DataTypes.STRING },
  });

  return FilterTag;
};
