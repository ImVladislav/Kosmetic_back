module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
      paymentMethod: DataTypes.STRING,
      comments: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM(
          "Новий",
          "Прийняте в роботу",
          "Збирається",
          "Зібрано",
          "Відправлено",
          "Відміна"
        ),
        defaultValue: "Новий",
        allowNull: false,
      },
      delivery: DataTypes.STRING,
      warehouse: DataTypes.STRING,
      address: DataTypes.STRING,
      building: DataTypes.STRING,
      apartment: DataTypes.STRING,
      orderNumber: DataTypes.STRING,
      date: DataTypes.DATE,
    });
  
    Order.associate = (models) => {
      Order.belongsTo(models.User, { foreignKey: "owner" });
      // ❗ Перенесено сюди
      Order.hasMany(models.OrderedItem, { foreignKey: "orderId" });
    };
  
    return Order;
  };
  