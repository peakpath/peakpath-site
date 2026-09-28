/* =========================================================
   PeakPath Coaching — 共用程式（導覽列、頁尾、語言切換、文章列表）
   一般情況下不需要修改這個檔案。
   文章、課表、聯絡連結都在後台（Pages CMS）編輯，
   資料存在 content/ 資料夾，建置時自動產生 posts.js / plans.js / settings.js
   ========================================================= */

// 聯絡連結由後台「網站設定」管理（建置時產生 assets/settings.js）
const SITE = Object.assign({
  formUrl: "#",
  email: "",
  line: "#",
  instagram: "#",
  facebook: "#",
  tpProfile: "#"
}, window.SITE_SETTINGS || {});

// 每個頁面的 <body data-root="..."> 告訴程式網站根目錄在哪
const ROOT = document.body.getAttribute("data-root") || "";
const PAGE = document.body.getAttribute("data-page") || "home";
const HOME = ROOT + "index.html";

const SHARED_I18N = {
  zh: {
    brand_name: "PeakPath Coaching",
    nav_about: "關於我", nav_pricing: "一對一教練", nav_plans: "訓練課表", nav_blog: "文章",
    nav_services: "企業合作", nav_faq: "常見問題", nav_contact: "聯絡我", nav_cta: "預約諮詢",
    foot_tag: "峰無止境，行者不息。", foot_copy: "© 2026 PeakPath Coaching. All rights reserved.",
    foot_safety: "任何運動皆具風險，請依自身健康狀況評估參與；具心血管疾病或傷病未癒者，請先諮詢醫師。",
    read_more: "閱讀全文 →", all: "全部", no_posts: "這個分類還沒有文章，敬請期待。",
    zh_only: "",
    sub_h: "不錯過每一篇新文章",
    sub_p: "加入 LINE 官方帳號，有新文章、新課表上架時我會第一時間通知你。訓練知識、比賽紀錄、數據分析，一次掌握。",
    sub_btn: "加入 LINE 收到通知", sub_note: "隨時可以封鎖或退出，不會洗版。"
  },
  en: {
    brand_name: "PeakPath Coaching",
    nav_about: "About", nav_pricing: "1:1 Coaching", nav_plans: "Training Plans", nav_blog: "Articles",
    nav_services: "Corporate", nav_faq: "FAQ", nav_contact: "Contact", nav_cta: "Book a Call",
    foot_tag: "The peak has no limit. The path never stops.", foot_copy: "© 2026 PeakPath Coaching. All rights reserved.",
    foot_safety: "All exercise carries risk. Assess your own health before training; consult a doctor if you have a heart condition or an unhealed injury.",
    read_more: "Read article →", all: "All", no_posts: "No articles in this category yet — stay tuned.",
    zh_only: "Articles are currently published in Chinese.",
    sub_h: "Never miss a new article",
    sub_p: "Join my LINE Official Account and I'll let you know whenever a new article or training plan goes live.",
    sub_btn: "Get Notified on LINE", sub_note: "Unsubscribe anytime. No spam."
  }
};

/* ---------- 導覽列與頁尾 ---------- */
function navHref(target) {
  // target: "#about" 之類的首頁區塊，或 "blog" / "plans"
  if (target === "blog") return ROOT + "blog/index.html";
  if (target === "plans") return ROOT + "plans/index.html";
  return (PAGE === "home" ? "" : HOME) + target;
}

function buildNav() {
  const items = [
    ["#about", "nav_about", "about"],
    ["#pricing", "nav_pricing", "pricing"],
    ["plans", "nav_plans", "plans"],
    ["blog", "nav_blog", "blog"],
    ["#faq", "nav_faq", "faq"]
  ];
  const links = items.map(([t, k, id]) =>
    `<li><a href="${navHref(t)}" data-i18n="${k}" class="${PAGE === id ? "active" : ""}"></a></li>`).join("");
  const mobile = items.concat([["#contact", "nav_contact", "contact"]]).map(([t, k]) =>
    `<a href="${navHref(t)}" data-i18n="${k}" onclick="this.closest('nav').classList.remove('open')"></a>`).join("");
  const nav = document.createElement("nav");
  nav.innerHTML = `
  <div class="nav-inner">
    <a class="brand" href="${HOME}">
      <img src="${ROOT}assets/img/logo.png" alt="PeakPath Coaching" height="28">
      <span data-i18n="brand_name">PeakPath Coaching</span>
    </a>
    <ul class="nav-links">${links}</ul>
    <div class="nav-right">
      <div class="lang-toggle">
        <button id="btn-zh" class="active" onclick="setLang('zh')">中文</button>
        <button id="btn-en" onclick="setLang('en')">EN</button>
      </div>
      <a href="${SITE.formUrl}" target="_blank" rel="noopener" class="btn" data-i18n="nav_cta">預約諮詢</a>
      <button class="menu-toggle" aria-label="Menu" onclick="this.closest('nav').classList.toggle('open')">☰</button>
    </div>
  </div>
  <div class="mobile-menu">${mobile}</div>`;
  document.body.prepend(nav);
}

function buildFooter() {
  const f = document.createElement("footer");
  f.innerHTML = `
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <div class="foot-brand">
          <img src="${ROOT}assets/img/logo.png" alt="PeakPath Coaching" height="24">
          <span data-i18n="brand_name">PeakPath Coaching</span>
        </div>
        <div class="foot-tag" data-i18n="foot_tag"></div>
      </div>
      <div class="foot-links">
        <a href="${navHref("#about")}" data-i18n="nav_about"></a>
        <a href="${navHref("#pricing")}" data-i18n="nav_pricing"></a>
        <a href="${navHref("plans")}" data-i18n="nav_plans"></a>
        <a href="${navHref("blog")}" data-i18n="nav_blog"></a>
        <a href="${navHref("#services")}" data-i18n="nav_services"></a>
        <a href="${navHref("#faq")}" data-i18n="nav_faq"></a>
        <a href="${navHref("#contact")}" data-i18n="nav_contact"></a>
      </div>
    </div>
    <div class="foot-bottom">
      <div data-i18n="foot_safety" style="margin-bottom:10px;"></div>
      <div data-i18n="foot_copy"></div>
    </div>
  </div>`;
  document.body.append(f);
}

/* ---------- 語言切換（記住訪客的選擇，跨頁面一致） ---------- */
let CURRENT_LANG = "zh";
function savedLang() {
  try { return localStorage.getItem("pp_lang") || "zh"; } catch (e) { return "zh"; }
}
function setLang(lang) {
  CURRENT_LANG = lang;
  try { localStorage.setItem("pp_lang", lang); } catch (e) {}
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  const page = window.PAGE_I18N || { zh: {}, en: {} };
  const dict = Object.assign({}, SHARED_I18N[lang], page[lang] || {});
  if (dict.page_title) document.title = dict.page_title;
  const bz = document.getElementById("btn-zh"), be = document.getElementById("btn-en");
  if (bz) bz.classList.toggle("active", lang === "zh");
  if (be) be.classList.toggle("active", lang === "en");
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
}
function t(key) {
  const page = window.PAGE_I18N || { zh: {}, en: {} };
  const v = (page[CURRENT_LANG] || {})[key];
  return v !== undefined ? v : SHARED_I18N[CURRENT_LANG][key];
}

/* ---------- FAQ 展開 ---------- */
function toggleFaq(el) {
  const item = el.parentElement;
  const answer = item.querySelector(".faq-a");
  const isOpen = item.classList.contains("open");
  document.querySelectorAll(".faq-item.open").forEach(i => {
    i.classList.remove("open");
    i.querySelector(".faq-a").style.maxHeight = null;
  });
  if (!isOpen) {
    item.classList.add("open");
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
}

/* ---------- 文章 ---------- */
function catName(id) {
  const c = (window.CATEGORIES || []).find(c => c.id === id);
  return c ? (CURRENT_LANG === "en" ? c.en : c.zh) : id;
}
function fmtDate(d) {
  const [y, m, day] = d.split("-").map(Number);
  if (CURRENT_LANG === "en") {
    return new Date(y, m - 1, day).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }
  return `${y} 年 ${m} 月 ${day} 日`;
}
function sortedPosts() {
  return (window.POSTS || []).slice().sort((a, b) => b.date.localeCompare(a.date));
}
function postUrl(p) { return ROOT + "blog/posts/" + p.slug + ".html"; }

// 列表樣式（文章頁）
function postRow(p) {
  return `<a class="post-card" href="${postUrl(p)}">
    <div class="post-meta"><span class="post-cat">${catName(p.category)}</span><span>${fmtDate(p.date)}</span></div>
    <div>
      <div class="post-title">${p.title}</div>
      ${p.subtitle ? `<div class="post-sub">${p.subtitle}</div>` : ""}
      <div class="post-excerpt">${p.excerpt}</div>
      <div class="post-read">${t("read_more")}</div>
    </div></a>`;
}
// 卡片樣式（首頁、相關文章）
function postCard(p) {
  return `<a class="teaser-card" href="${postUrl(p)}">
    <span class="post-cat">${catName(p.category)} · ${fmtDate(p.date)}</span>
    <div class="post-title">${p.title}</div>
    <div class="post-excerpt">${p.excerpt}</div>
    <div class="post-read" style="margin-top:auto;">${t("read_more")}</div></a>`;
}

function renderPostCards(el, { limit = 3, exclude = null, preferCategory = null } = {}) {
  if (!el) return;
  let list = sortedPosts().filter(p => p.slug !== exclude);
  if (preferCategory) {
    list = list.filter(p => p.category === preferCategory).concat(list.filter(p => p.category !== preferCategory));
  }
  list = list.slice(0, limit);
  const wrap = el.closest("[data-hide-if-empty]");
  if (!list.length) { if (wrap) wrap.style.display = "none"; return; }
  el.innerHTML = list.map(postCard).join("");
}

let ACTIVE_CAT = "all";
function renderBlogIndex() {
  const listEl = document.getElementById("post-list");
  const filterEl = document.getElementById("filter-row");
  if (!listEl) return;
  const posts = sortedPosts();
  const cats = [{ id: "all" }].concat(window.CATEGORIES || []);
  filterEl.innerHTML = cats.map(c => {
    const n = c.id === "all" ? posts.length : posts.filter(p => p.category === c.id).length;
    const label = c.id === "all" ? t("all") : catName(c.id);
    return `<button class="chip ${ACTIVE_CAT === c.id ? "active" : ""}" data-cat="${c.id}">${label} <span style="opacity:.6">${n}</span></button>`;
  }).join("");
  filterEl.querySelectorAll(".chip").forEach(b => b.onclick = () => {
    ACTIVE_CAT = b.dataset.cat;
    try { history.replaceState(null, "", ACTIVE_CAT === "all" ? location.pathname : "?cat=" + ACTIVE_CAT); } catch (e) {}
    renderBlogIndex();
  });
  const shown = ACTIVE_CAT === "all" ? posts : posts.filter(p => p.category === ACTIVE_CAT);
  listEl.innerHTML = shown.length ? shown.map(postRow).join("") : `<p class="empty-note">${t("no_posts")}</p>`;
}

/* ---------- 單篇文章：自動填入標題資訊與相關文章 ---------- */
function renderArticleMeta() {
  const slug = document.body.getAttribute("data-slug");
  if (!slug) return;
  const p = (window.POSTS || []).find(x => x.slug === slug);
  if (!p) return;
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.innerHTML = v; };
  set("a-cat", `<a href="${ROOT}blog/index.html?cat=${p.category}">${catName(p.category)}</a>`);
  set("a-date", fmtDate(p.date));
  renderPostCards(document.getElementById("related-list"), { limit: 3, exclude: slug, preferCategory: p.category });
}

/* ---------- 課表 ---------- */
function L(obj) { // 取目前語言的欄位
  if (obj == null) return "";
  if (typeof obj === "string" || typeof obj === "number") return obj;
  return obj[CURRENT_LANG] !== undefined ? obj[CURRENT_LANG] : obj.zh;
}
function planCard(p, { full = true } = {}) {
  const en = CURRENT_LANG === "en";
  const buy = p.buyUrl
    ? `<a class="btn" href="${p.buyUrl}" target="_blank" rel="noopener">${en ? "Get this plan" : "購買課表"} →</a>`
    : `<a class="btn btn-ghost" href="${SITE.line}" target="_blank" rel="noopener">${en ? "Coming soon · Notify me" : "即將推出｜LINE 搶先通知"}</a>`;
  const phases = (p.phases || []).map(ph => `<div class="phase"><b>${L(ph.name)}</b><span>${L(ph.desc)}</span></div>`).join("");
  return `<div class="tp-plan" id="${p.id}">
    <div class="top"><h3>${L(p.name)}</h3><span class="level">${L(p.level)}</span></div>
    <p class="for">${L(p.for)}</p>
    <div class="spec">
      <div><b>${p.weeks}</b><span>${en ? "weeks" : "週"}</span></div>
      <div><b>${L(p.hours)}</b><span>${en ? "hrs / week" : "小時 / 週"}</span></div>
      <div><b>${L(p.sessions)}</b><span>${en ? "sessions / wk" : "堂 / 週"}</span></div>
    </div>
    ${full ? `<ul>${(p.includes || []).map(i => `<li>${L(i)}</li>`).join("")}</ul>` : ""}
    ${full && phases ? `<details><summary>${en ? "See the phase breakdown" : "查看週期安排"}</summary>${phases}</details>` : ""}
    <div class="buy-row">
      <div class="buy-price">${L(p.price)}<small>${en ? "One-time · delivered in TrainingPeaks" : "一次購買・課表直接匯入 TrainingPeaks"}</small></div>
      ${full ? buy : `<a class="btn btn-ghost" href="${ROOT}plans/index.html#${p.id}">${en ? "Details" : "查看內容"} →</a>`}
    </div>
  </div>`;
}
function renderPlans(el, opts = {}) {
  if (!el) return;
  let list = (window.PLANS || []);
  if (opts.limit) list = list.slice(0, opts.limit);
  const wrap = el.closest("[data-hide-if-empty]");
  if (!list.length) { if (wrap) wrap.style.display = "none"; return; }
  el.innerHTML = list.map(p => planCard(p, opts)).join("");
  if (location.hash && opts.full !== false) {
    const target = document.querySelector(location.hash);
    if (target) setTimeout(() => target.scrollIntoView(), 50);
  }
}

/* ---------- 套用聯絡連結 ---------- */
function applyLinks() {
  const map = { form: SITE.formUrl, line: SITE.line, instagram: SITE.instagram, facebook: SITE.facebook, tp_profile: SITE.tpProfile };
  document.querySelectorAll("[data-link]").forEach(a => {
    const k = a.getAttribute("data-link");
    if (k === "email") {
      if (SITE.email) { a.href = "mailto:" + SITE.email; a.textContent = SITE.email; }
      return;
    }
    if (map[k] && map[k] !== "#") {
      a.href = map[k];
      a.target = "_blank";
      a.rel = "noopener";
    }
  });
}

/* ---------- 啟動 ---------- */
function renderDynamic() {
  applyLinks();
  renderBlogIndex();
  renderArticleMeta();
  renderPostCards(document.getElementById("latest-posts"), { limit: 3 });
  renderPlans(document.getElementById("plans-list"), { full: true });
  renderPlans(document.getElementById("plans-teaser"), { full: false, limit: 2 });
}
buildNav();
buildFooter();
try { const c = new URLSearchParams(location.search).get("cat"); if (c) ACTIVE_CAT = c; } catch (e) {}
document.addEventListener("langchange", renderDynamic);
setLang(savedLang());
