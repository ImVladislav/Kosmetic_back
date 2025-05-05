const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const { HOST, PORT } = process.env;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Beauty Blossom API",
      version: "1.0.0",
      description: "API documentation for the Beauty Blossom online store",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/`,
        description: "Development server",
      },
      {
        url: `https://${HOST}/`,
        description: "Production server",
      },
    ],
    tags: [
      {
        name: "products",
        description: "Product routes",
        url: `http://localhost:${PORT}/api/products`,
      },
      {
        name: "user",
        description: "User routes",
        url: `http://localhost:${PORT}/api/user`,
      },
      {
        name: "brands",
        description: "Brands routes",
        url: `http://localhost:${PORT}/api/brands`,
      },
      {
        name: "basket",
        description: "Basket routes",
        url: `http://localhost:${PORT}/api/basket`,
      },
      {
        name: "order",
        description: "Order routes",
        url: `http://localhost:${PORT}/api/order`,
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          required: [
            "name",
            "article",
            "code",
            "amount",
            "description",
            "price",
            "priceOPT",
            "brand",
            "images",
            "newness",
            "sale",
            "category",
            "country",
          ],
          properties: {
            id: {
              type: "integer",
              description: "ID товару",
              example: 4980142,
            },
            name: {
              type: "string",
              description: "Назва товару",
              example:
                "Легкий сонцезахисний крем Lador Tamanu Airy Sunscreen SPF 50+ PA++++ - 50 мл",
            },
            article: {
              type: "string",
              description: "Артикул товару",
              example: "7c8-754",
            },
            code: {
              type: "integer",
              description: "Код товару",
              example: 738596970461,
            },
            amount: {
              type: "integer",
              description: "Кількість товару",
              example: 566,
            },
            description: {
              type: "string",
              description: "Опис товару",
              example:
                "Легкий сонцезахисний крем Lador Tamanu Airy Sunscreen SPF 50+ PA++++ - 50 мл",
            },
            price: {
              type: "number",
              description: "Ціна товару",
              example: 69.99,
            },
            priceOld: {
              type: "number",
              description: "Ціна товару без знижки",
              example: 79.99,
            },
            priceOPT: {
              type: "number",
              description: "Оптова ціна товару",
              example: 49.99,
            },
            priceOldOPT: {
              type: "number",
              description: "Оптова ціна товару без знижки",
              example: 59.99,
            },
            brand: {
              type: "string",
              description: "Бренд товару",
              example: "BIODANCE",
            },
            images: {
              type: "string",
              description: "Зображення товару (URL)",
              example: "https://example.com/image.jpg",
            },
            newness: {
              type: "boolean",
              description: "Якщо товар новинка",
              example: true,
            },
            sale: {
              type: "boolean",
              description: "Якщо товар акційний",
              example: false,
            },
            category: {
              type: "string",
              description: "Категорія товару",
              example: "Догляд для обличчя",
            },
            subCategory: {
              type: "string",
              description: "Підкатегорія товару",
              example: "Маски для обличчя",
            },
            subSubCategory: {
              type: "string",
              description: "Підпідкатегорія товару",
              example: "Гідрогелеві маски",
            },
            country: {
              type: "string",
              description: "Країна виробник товару",
              example: "Південна Корея",
            },
            compound: {
              type: "string",
              description: "Склад товару",
              example: "Склад: крем забезпечення сонцезахисними світлом, 50 мл",
            },
          },
        },
        Products: {
          type: "object",
          properties: {
            totalItems: {
              type: "integer",
              description: "Кількість товарів",
              example: 5,
            },
            totalPages: {
              type: "integer",
              description: "Кількість сторінок",
              example: 2,
            },
            currentPage: {
              type: "integer",
              description: "Поточна сторінка",
              example: 1,
            },
            products: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        User: {
          type: "object",
          required: ["firstName", "lastName", "email", "password", "number"],
          properties: {
            id: {
              type: "integer",
              description: "ID користувача",
              example: 1,
            },
            firstName: {
              type: "string",
              description: "Ім'я користувача",
              example: "Іван",
            },
            lastName: {
              type: "string",
              description: "Прізвище користувача",
              example: "Іванченко",
            },
            email: {
              type: "string",
              description: "Електронна пошта користувача",
              example: "Ivanchenko_Ivan@example.com",
            },
            password: {
              type: "string",
              description: "Пароль користувача",
              example: "$2b$10$j3h8gK7yB769a7l8..jB.e",
            },
            city: {
              type: "string",
              description: "Місто користувача",
              example: "Київ",
            },
            number: {
              type: "string",
              description: "Номер телефону користувача",
              example: "+380971234567",
            },
            linkSite: {
              type: "string",
              description: "Сайт користувача",
              example: "https://example.com",
            },
            offlineShop: {
              type: "boolean",
              description: "Офлайн магазин користувача",
              example: false,
            },
            onlineShop: {
              type: "boolean",
              description: "Онлайн магазин користувача",
              example: true,
            },
            socialMedia: {
              type: "string",
              description: "Соціальні мережі користувача",
              example: "https://viber.com",
            },
            token: {
              type: "string",
              description: "Токен користувача",
              example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
            },
            avatarUrl: {
              type: "string",
              description: "URL аватарки користувача",
              example: "https://example.com/avatar.jpg",
            },
            verify: {
              type: "boolean",
              description: "Верифікація користувача",
              example: true,
            },
            verificationCode: {
              type: "string",
              description: "Верифікація користувача",
              example: "123456",
            },
            isAdmin: {
              type: "boolean",
              description: "Чи є користувач адміном",
              example: false,
            },
            optUser: {
              type: "boolean",
              description: "Чи є користувач оптовим",
              example: false,
            },
          },
        },
        Brand: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID бренду",
              example: 1,
            },
            name: {
              type: "string",
              description: "Назва бренду",
              example: "BIODANCE",
            },
            description: {
              type: "string",
              description: "Опис бренду",
              example:
                "корейський бренд косметики, відомий своєю відданістю якості та ефективності продуктів. Філософія бренду полягає у створенні оптимальних формул для досягнення здорового і сяючого вигляду шкіри, що відображається у гаслі «Better Formula for Better Glow». Найпопулярніший продукт — гідрогелева маска з колагеном Bio—Collagen Real Deep Mask.",
            },
            logo: {
              type: "string",
              description: "Лого бренду",
              example: "https://example.com/image.jpg",
            },
          },
        },
        Menu: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID меню",
              example: 1,
            },
            name: {
              type: "string",
              description: "Назва меню",
              example: "Основне меню",
            },
            menuItems: {
              type: "array",
              description: "Масив елементів меню",
              example: [
                {
                  id: 1,
                  name: "Спортивна косметика", // Назва елемента меню
                },
                {
                  id: 2,
                  name: "Косметика для волосся", // Назва елемента меню
                },
                {
                  id: 3,
                  name: "Косметика для тіла", // Назва елемента меню
                },
              ],
            },
          },
        },
        BasketItem: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            productId: { type: "integer", example: 123456 },
            quantity: { type: "integer", example: 2 },
            price: { type: "number", example: 89.99 },
            name: { type: "string", example: "Зволожуючий крем для рук" },
            image: { type: "string", example: "https://example.com/image.jpg" },
          },
        },
        Basket: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            owner: { type: "integer", example: 806 },
            total: { type: "number", example: 359.99 },
            BasketItems: {
              type: "array",
              items: { $ref: "#/components/schemas/BasketItem" },
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            owner: { type: "integer", example: 806 },
            status: {
              type: "string",
              enum: [
                "Новий",
                "Прийняте в роботу",
                "Збирається",
                "Зібрано",
                "Відправлено",
                "Відміна",
              ],
              example: "Новий",
            },
            paymentMethod: { type: "string", example: "Накладений платіж" },
            comments: {
              type: "string",
              example: "Будь ласка, зателефонуйте перед доставкою",
            },
            delivery: { type: "string", example: "Нова Пошта" },
            warehouse: { type: "string", example: "Відділення №1" },
            address: { type: "string", example: "вул. Незалежності, 12" },
            building: { type: "string", example: "Буд. 5А" },
            apartment: { type: "string", example: "Кв. 12" },
            orderNumber: { type: "string", example: "153205123" },
            total: { type: "number", example: 359.99 },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-05-03T15:00:00Z",
            },
            OrderedItems: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderedItem" },
            },
          },
        },
        OrderedItem: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            productId: { type: "integer", example: 123456 },
            quantity: { type: "integer", example: 2 },
            price: { type: "number", example: 89.99 },
            name: { type: "string", example: "Зволожуючий крем для рук" },
            image: { type: "string", example: "https://example.com/image.jpg" },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js", "./controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger is running on http://localhost:${PORT}/api-docs`);
};

module.exports = swaggerDocs;
