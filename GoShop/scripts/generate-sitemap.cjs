// Script tạo sitemap.xml động khi build
// Chạy: node scripts/generate-sitemap.cjs

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://goshopminhntd.vercel.app";
const DIST_DIR = path.resolve(__dirname, "..", "dist");

const staticPages = [
  { loc: "/", priority: "1.0", changefreq: "daily" },
  { loc: "/login", priority: "0.3", changefreq: "monthly" },
  { loc: "/register", priority: "0.3", changefreq: "monthly" },
  { loc: "/cart", priority: "0.5", changefreq: "weekly" },
];

function generateSitemap() {
  const urls = [...staticPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  const outputPath = path.join(DIST_DIR, "sitemap.xml");
  fs.writeFileSync(outputPath, xml, "utf-8");
  console.log(`✅ Sitemap generated: ${outputPath}`);
}

generateSitemap();
