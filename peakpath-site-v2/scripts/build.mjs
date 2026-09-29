// =========================================================
// PeakPath 網站建置腳本
// Netlify 每次偵測到 GitHub 有更新時會自動執行：npm run build
// 讀取 content/ 裡的文章、課表、網站設定 → 產生完整網站到 dist/
// 一般情況下不需要修改這個檔案。
// =========================================================
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "dist");
const r = (...p) => path.join(ROOT, ...p);

const CATEGORIES = [
  { id: "training", zh: "訓練知識", en: "Training" },
  { id: "racing", zh: "比賽紀錄", en: "Race Reports" },
  { id: "athletes", zh: "學員故事", en: "Athlete Stories" },
  { id: "gear", zh: "器材與數據", en: "Gear & Data" },
  { id: "podcast", zh: "Podcast 筆記", en: "Podcast Notes" }
];

const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtDate = d => {
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return String(d || "").slice(0, 10);
};
const slugify = s => String(s || "").toLowerCase().trim()
  .replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "")
  .replace(/[^a-z0-9一-鿿-]+/g, "-").replace(/^-+|-+$/g, "");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}
function write(rel, content) {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
}

// ---------- 0. 清空並複製靜態檔案 ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
copyDir(r("assets"), path.join(OUT, "assets"));
for (const f of ["index.html", "blog/index.html", "plans/index.html", "apply/index.html", "apply/thanks.html"]) {
  fs.mkdirSync(path.dirname(path.join(OUT, f)), { recursive: true });
  fs.copyFileSync(r(f), path.join(OUT, f));
}

// ---------- 1. 網站設定 ----------
const settings = JSON.parse(fs.readFileSync(r("content/settings.json"), "utf8"));
const SITE_URL = (settings.siteUrl || "").replace(/\/+$/, "");
const SHOW_PLANS = settings.showPlans === true;
if (!SHOW_PLANS) {
  // 課表先不上架：拿掉課表頁，舊連結轉回首頁
  fs.rmSync(path.join(OUT, "plans"), { recursive: true, force: true });
  write("_redirects", "/plans  /  302\n/plans/*  /  302\n");
  console.log("  (訓練課表未開放，略過課表頁)");
}
write("assets/settings.js", `window.SITE_SETTINGS = ${JSON.stringify(settings, null, 2)};\n`);

// ---------- 2. 課表 ----------
const rawPlans = JSON.parse(fs.readFileSync(r("content/plans.json"), "utf8"));
const bi = (zh, en) => ({ zh: zh ?? "", en: en || zh || "" });
const plans = rawPlans.filter(p => !p.hidden).map((p, i) => ({
  id: p.id || slugify(p.name_en || p.name) || "plan-" + (i + 1),
  name: bi(p.name, p.name_en),
  level: bi(p.level, p.level_en),
  for: bi(p.for, p.for_en),
  weeks: p.weeks ?? "",
  hours: p.hours ?? "",
  sessions: p.sessions ?? "",
  price: bi(p.price, p.price_en),
  buyUrl: p.buyUrl || "",
  includes: (p.includes || []).map(x => bi(x.zh, x.en)),
  phases: (p.phases || []).map(x => ({ name: bi(x.name, x.name_en), desc: bi(x.desc, x.desc_en) }))
}));
write("assets/plans.js", `window.PLANS = ${JSON.stringify(plans, null, 2)};\n`);

// ---------- 3. 文章 ----------
const tpl = fs.readFileSync(r("templates/post.html"), "utf8");
const postsDir = r("content/posts");
const posts = [];
const seen = new Set();

// 中文粗體常見問題：**文字**後面緊接中文時 Markdown 不會轉粗體，先自行處理
const fixBold = md => md.replace(/\*\*([^*\n]+?)\*\*/g, "<strong>$1</strong>");

for (const file of fs.existsSync(postsDir) ? fs.readdirSync(postsDir).filter(f => f.endsWith(".md")) : []) {
  const { data, content } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
  if (data.draft) { console.log("  (草稿，略過) " + file); continue; }
  if (!data.title) { console.warn("  ⚠ 沒有標題，略過 " + file); continue; }

  let slug = slugify(data.slug) || slugify(file);
  while (seen.has(slug)) slug += "-2";
  seen.add(slug);

  // 內文：Markdown 或 HTML 都可以
  let html = marked.parse(fixBold(content || ""), { gfm: true });
  // 大標題加上 id，產生目錄
  const heads = [];
  html = html.replace(/<h2>(.*?)<\/h2>/g, (_, inner) => {
    const id = "s" + (heads.length + 1);
    heads.push({ id, text: inner.replace(/<[^>]+>/g, "") });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  // 表格包一層，手機可以左右滑
  html = html.replace(/<table>/g, '<div class="table-scroll"><table>').replace(/<\/table>/g, "</table></div>");
  // 外部連結開新分頁
  html = html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"');

  const toc = data.toc && heads.length >= 3
    ? `<nav class="toc"><b>這篇會談到</b><ol>${heads.map(h => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join("")}</ol></nav>`
    : "";

  const date = fmtDate(data.date) || new Date().toISOString().slice(0, 10);
  const excerpt = data.excerpt || content.replace(/[#>*|`\-\n]/g, " ").replace(/\s+/g, " ").trim().slice(0, 120) + "…";
  const url = `${SITE_URL}/blog/posts/${slug}.html`;
  const cover = data.cover ? (data.cover.startsWith("http") ? data.cover : SITE_URL + "/" + data.cover.replace(/^\/+/, "")) : SITE_URL + "/assets/img/hero.jpg";

  const page = tpl
    .replaceAll("{{title}}", esc(data.title))
    .replaceAll("{{description}}", esc(excerpt))
    .replaceAll("{{url}}", esc(url))
    .replaceAll("{{image}}", esc(cover))
    .replaceAll("{{slug}}", esc(slug))
    .replaceAll("{{dek}}", data.subtitle ? `<p class="dek">${esc(data.subtitle)}</p>` : "")
    .replace("{{toc}}", toc)
    .replace("{{body}}", html);
  write(`blog/posts/${slug}.html`, page);

  posts.push({
    slug,
    category: CATEGORIES.some(c => c.id === data.category) ? data.category : "training",
    date,
    title: data.title,
    subtitle: data.subtitle || "",
    excerpt
  });
  console.log("  ✓ " + slug);
}
posts.sort((a, b) => b.date.localeCompare(a.date));
write("assets/posts.js",
  `window.CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};\nwindow.POSTS = ${JSON.stringify(posts, null, 2)};\n`);

// ---------- 4. SEO：sitemap 與 robots ----------
if (SITE_URL) {
  const urls = ["/", "/blog/index.html", ...(SHOW_PLANS ? ["/plans/index.html"] : []), "/apply/", ...posts.map(p => `/blog/posts/${p.slug}.html`)];
  write("sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${SITE_URL}${u}</loc></url>`).join("\n") + "\n</urlset>\n");
  write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
}

console.log(`\n完成：${posts.length} 篇文章、${plans.length} 份課表 → dist/`);
