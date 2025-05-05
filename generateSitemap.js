const fs = require("fs");
const path = require("path");
const { Product } = require("./models");

async function generateSitemap() {
  try {
    const products = await Product.findAll();
    const baseUrl = "https://www.beautyblossom.com.ua/product/";

    const urls = products.map((product) => {
      return `${baseUrl}${product.id}`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

    // const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
    fs.writeFileSync("sitemap.xml", xml, "utf8");
    console.log("✅ Sitemap збережено у public/sitemap.xml");
  } catch (error) {
    console.error("❌ Помилка генерації sitemap:", error.message);
  }
}

generateSitemap();
