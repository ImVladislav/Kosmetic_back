const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");

const ApiError = require("../helpers/ApiError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
// const mailer = require("./mailer");

const { User } = require("../models/models");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

// реєстрація користувача
const register = async (req, res, next) => {
  const { email, password, number } = req.body;
  if (!email || !password || !number) {
    return next(ApiError.badRequest("Missing required fields"));
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return next(ApiError.badRequest("User with this email already exists"));
  }
  const existingNumber = await User.findOne({ where: { number } });
  if (existingNumber) {
    return next(ApiError.badRequest("User with this number already exists"));
  }

  if (password.length < 6 || password.length > 20) {
    return next(
      ApiError.badRequest("Password must be between 6 and 20 characters")
    );
  }

  if (number.length !== 10) {
    return next(ApiError.badRequest("Invalid phone number2"));
  }

  const numberWithPlus = `+38${number}`;
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
  const verificationCode = nanoid();
  const isAdmin = req.body.isAdmin;

  const newUser = await User.create({
    ...req.body,
    number: numberWithPlus,
    password: hashedPassword,
    avatarUrl,
    verificationCode,
    isAdmin,
  });
  const message = {
    to: email,
    subject: "Підтвердження реєстрації на сайті beautyblossom.com.ua",
    text: `Вітаємо, Ви успішно зареєструвались на нашому сайті!
        
        данні вашого аккаунту:
        login: ${email}
        password: ${password}
        
        Не потрібно відповідати на данне повідомлення.
        
        Контакти для зворотнього зв'язку
        +380500529100
        beautyblossom.opt@gmail.com`,
  };
  // mailer(message);
  res.status(201).json({
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    number: newUser.number,
    isAdmin: newUser.isAdmin,
    optUser: newUser.optUser,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return next(ApiError.badRequest("Missing email"));
  }
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next(ApiError.badRequest("User not found"));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(ApiError.badRequest("Invalid password"));
  }

  //  if (user.isAdmin) {
  //    user.isAdmin = true;
  //  }

  //  const payload = {
  //    id: user._id,
  //  };

  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  user.token = token;

  await user.save();

  res.json({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    number: user.number,
    isAdmin: user.isAdmin,
    optUser: user.optUser,
    token: user.token,
  });
};

const getCurrent = async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findByPk(id, {
    attributes: { exclude: ["password", "token"] },
  });

  res.json({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    number: user.number,
    isAdmin: user.isAdmin,
    optUser: user.optUser,
    token: user.token,
  });
};

const logout = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByPk(id);
  user.token = null;
  await user.save();
  res.json({ message: "Logout successful" });
};

const uploadAvatar = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByPk(id);
  const avatarName = `${id}_${nanoid()}.jpg`;
  const avatarPath = path.join(avatarsDir, avatarName);
  await fs.promises.rename(req.file.path, avatarPath);
  user.avatarUrl = avatarName;
  await user.save();
  res.json({ avatarUrl: user.avatarUrl });
};

const deleteAvatar = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByPk(id);
  const avatarPath = path.join(avatarsDir, user.avatarUrl);
  await fs.promises.unlink(avatarPath);
  user.avatarUrl = null;
  await user.save();
  res.json({ message: "Avatar deleted successfully" });
};

const verify = async (req, res, next) => {
  const { verificationCode } = req.body;
  const user = await User.findOne({ where: { verificationCode } });
  if (!user) {
    return next(ApiError.badRequest("Invalid verification code"));
  }
  user.verified = true;
  await user.save();
  res.json({ message: "Verification successful" });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(ApiError.badRequest("User not found"));
  }
  const newPassword = nanoid();
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  const message = {
    to: email,
    subject: "Вітаємо, Ви успішно змінили пароль на нашому сайті!",
    text: `Ваш новий пароль: ${newPassword}`,
  };
  // mailer(message);
  res.json({ message: "Password changed successfully" });
};

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;
  const user = await User.findByPk(id);
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return next(ApiError.badRequest("Invalid password"));
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  res.json({ message: "Password changed successfully" });
};

const update = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByPk(id);
  const updatedUser = await user.update(req.body);
  res.json(updatedUser);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
