const ApiError = require("../helpers/ApiError");

/**
 * Middleware для перевірки чи має користувач роль адміністратора
 * @param {object} req - об'єкт запиту Express
 * @param {object} res - об'єкт відповіді Express
 * @param {function} next - функція для передачі керування наступному middleware
 */
const isAdmin = (req, res, next) => {
  // Перевіряємо, чи користувач авторизований і чи має роль адміністратора
  if (!req.user) {
    return next(ApiError.unauthorized("Потрібна авторизація"));
  }

  if (req.user.isAdmin !== true) {
    return next(
      ApiError.forbidden("Доступ заборонено. Потрібні права адміністратора")
    );
  }

  // Якщо все добре, переходимо до наступного middleware або контролера
  next();
};

module.exports = isAdmin;
