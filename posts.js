/* =========================================================
   文章清單 —— 新增文章時只要做兩件事：
   1. 複製 blog/posts/_template.html，改名成新的網址名稱（例如 race-fueling.html），寫入內文
   2. 在下面的 POSTS 最上方加一筆資料，slug 要和檔名相同（不含 .html）

   category 請用下面 CATEGORIES 裡的 id。
   日期格式：YYYY-MM-DD（列表會自動按日期由新到舊排列）
   ========================================================= */

window.CATEGORIES = [
  { id: "training", zh: "訓練知識", en: "Training" },
  { id: "racing",   zh: "比賽紀錄", en: "Race Reports" },
  { id: "athletes", zh: "學員故事", en: "Athlete Stories" },
  { id: "gear",     zh: "器材與數據", en: "Gear & Data" },
  { id: "podcast",  zh: "Podcast 筆記", en: "Podcast Notes" }
];

window.POSTS = [
  {
    slug: "trainingpeaks-ctl-atl-tsb",
    category: "gear",
    date: "2026-09-23",
    title: "看懂 TrainingPeaks 的體能曲線：CTL、ATL、TSB 到底在說什麼？",
    subtitle: "三條線、一個數字，決定你該加量、該休息，還是該去比賽",
    excerpt: "打開 TrainingPeaks 的 Performance Management Chart，藍色、粉紅、黃色三條線交錯，很多人看了半年還是不確定它在說什麼。這篇用最白話的方式拆解 CTL（體能）、ATL（疲勞）與 TSB（狀態）怎麼算出來、各自代表什麼，以及排課時該怎麼用這三個數字判斷：加量、休息，還是準備比賽。"
  }
];
