module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define("Feedback", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      comment: DataTypes.TEXT,
    });
  
    Feedback.associate = (models) => {
      Feedback.belongsTo(models.User, { foreignKey: "owner" });
    };
  
    return Feedback;
  };