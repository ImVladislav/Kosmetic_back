module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
        unique: { args: true, msg: "Email already exists" },
      },
      password: { type: DataTypes.STRING, allowNull: false },
      avatarURL: { type: DataTypes.STRING, defaultValue: "avatar.jpg" },
      city: { type: DataTypes.STRING, defaultValue: "city" },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [10, 15], isNumeric: true },
        unique: { args: true, msg: "Number already exists" },
      },
      link: { type: DataTypes.STRING, defaultValue: "link" },
      offlineShop: { type: DataTypes.BOOLEAN, defaultValue: false },
      onlineShop: { type: DataTypes.BOOLEAN, defaultValue: false },
      socialMedia: { type: DataTypes.BOOLEAN, defaultValue: false },
      optUser: { type: DataTypes.BOOLEAN, defaultValue: false },
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
      token: { type: DataTypes.STRING, defaultValue: "" },
      verify: { type: DataTypes.BOOLEAN, defaultValue: false },
      verificationCode: { type: DataTypes.STRING, defaultValue: "" },
    });
  
    User.associate = (models) => {
      User.hasOne(models.Basket, { foreignKey: "owner" });
      User.hasOne(models.Order, { foreignKey: "owner" });
      User.hasMany(models.Feedback, { foreignKey: "owner" });
      User.hasMany(models.Favorite, { foreignKey: "owner" });
    };
  
    return User;
  };