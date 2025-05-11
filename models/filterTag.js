module.exports = (sequelize, DataTypes) => {
  const FilterTag = sequelize.define("FilterTag", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING }, // Наприклад: "skinType", "purpose", "makeup"
    value: { type: DataTypes.STRING }, // Наприклад: "для жирної", "проти зморшок"
  });

  return FilterTag;
};
