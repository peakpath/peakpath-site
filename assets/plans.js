/* =========================================================
   訓練課表清單 —— 新增或修改課表只要改這個檔案。

   buyUrl：購買連結（例如 TrainingPeaks 課表商店網址）。
           留空 "" 的話，按鈕會顯示「即將推出｜LINE 搶先通知」。
   每個文字欄位都可以寫 { zh: "中文", en: "English" }。

   ⚠️ 以下四份課表是「範例」，名稱、週數、時數、價格都請依你實際的課表修改。
   ========================================================= */

window.PLANS = [
  {
    id: "first-olympic-12w",
    name: { zh: "初鐵完賽｜51.5 標準距離 12 週", en: "First Triathlon — Olympic Distance, 12 Weeks" },
    level: { zh: "入門", en: "Beginner" },
    for: { zh: "會游、會騎、會跑，但還沒比過鐵人三項，想安全、有把握地完成第一場 51.5。", en: "You can swim, bike, and run, and want to finish your first Olympic-distance race safely and confidently." },
    weeks: 12,
    hours: "4–7",
    sessions: "5–6",
    price: { zh: "價格待定", en: "TBA" },
    buyUrl: "",
    includes: [
      { zh: "游泳、自行車、跑步三項均衡的週期化課表", en: "Balanced, periodized swim–bike–run plan" },
      { zh: "轉換區與連續項目（Brick）練習", en: "Transition and brick sessions" },
      { zh: "心率與自覺強度雙指標，沒有功率計也能練", en: "Heart rate and RPE targets — no power meter needed" },
      { zh: "賽前一週減量與比賽日流程指引", en: "Race-week taper and race-day checklist" }
    ],
    phases: [
      { name: { zh: "第 1–4 週", en: "Weeks 1–4" }, desc: { zh: "基礎期：建立三項的有氧底子與規律", en: "Base: aerobic foundation and routine" } },
      { name: { zh: "第 5–9 週", en: "Weeks 5–9" }, desc: { zh: "進展期：加入比賽配速與連續項目", en: "Build: race pace and brick work" } },
      { name: { zh: "第 10–12 週", en: "Weeks 10–12" }, desc: { zh: "巔峰與減量：模擬比賽，帶著新鮮的腿上場", en: "Peak & taper: race simulation, fresh legs" } }
    ]
  },
  {
    id: "ironman-70-3-16w",
    name: { zh: "IRONMAN 70.3｜113 公里 16 週", en: "IRONMAN 70.3 — 16 Weeks" },
    level: { zh: "中階", en: "Intermediate" },
    for: { zh: "已完成過標鐵或 70.3，想在下一場 113 穩定配速、後段不崩的選手。", en: "You've raced Olympic or 70.3 and want to pace your next half steadily without fading late." },
    weeks: 16,
    hours: "7–10",
    sessions: "8–9",
    price: { zh: "價格待定", en: "TBA" },
    buyUrl: "",
    includes: [
      { zh: "以功率／配速／心率設定強度區間", en: "Power, pace, and heart-rate based zones" },
      { zh: "每 4 週一次檢測課，追蹤進步", en: "Test sessions every 4 weeks to track progress" },
      { zh: "長距離騎乘接跑的比賽配速練習", en: "Race-pace long ride + run combinations" },
      { zh: "賽中補給策略與腸胃訓練安排", en: "Race fueling strategy and gut training" }
    ],
    phases: [
      { name: { zh: "第 1–5 週", en: "Weeks 1–5" }, desc: { zh: "基礎期：有氧量與技術", en: "Base: aerobic volume and technique" } },
      { name: { zh: "第 6–12 週", en: "Weeks 6–12" }, desc: { zh: "進展期：閾值與 70.3 比賽強度", en: "Build: threshold and 70.3 race intensity" } },
      { name: { zh: "第 13–14 週", en: "Weeks 13–14" }, desc: { zh: "巔峰期：比賽模擬與補給演練", en: "Peak: race simulation and fueling rehearsal" } },
      { name: { zh: "第 15–16 週", en: "Weeks 15–16" }, desc: { zh: "減量期：保持強度、降低總量", en: "Taper: keep intensity, cut volume" } }
    ]
  },
  {
    id: "ironman-226-20w",
    name: { zh: "IRONMAN 226｜超級鐵人 20 週", en: "IRONMAN Full Distance — 20 Weeks" },
    level: { zh: "進階", en: "Advanced" },
    for: { zh: "準備 226 公里全程超級鐵人，需要一份能兼顧工作、又撐得起長距離訓練量的計畫。", en: "You're preparing for a full IRONMAN and need a plan that supports big volume alongside a full-time job." },
    weeks: 20,
    hours: "10–14",
    sessions: "9–11",
    price: { zh: "價格待定", en: "TBA" },
    buyUrl: "",
    includes: [
      { zh: "以續航力（Durability）為核心的長距離安排", en: "Long sessions built around durability" },
      { zh: "週末長騎、長跑與比賽配速的漸進設計", en: "Progressive weekend long ride/run at race pace" },
      { zh: "恢復週節奏，降低受傷與過度訓練風險", en: "Recovery-week rhythm to reduce injury and overtraining risk" },
      { zh: "完整比賽日配速、補給與轉換區計畫", en: "Full race-day pacing, fueling, and transition plan" }
    ],
    phases: [
      { name: { zh: "第 1–6 週", en: "Weeks 1–6" }, desc: { zh: "基礎期：逐步堆疊三項訓練量", en: "Base: build volume across all three sports" } },
      { name: { zh: "第 7–15 週", en: "Weeks 7–15" }, desc: { zh: "進展期：長距離比賽配速與續航力", en: "Build: long race-pace work and durability" } },
      { name: { zh: "第 16–17 週", en: "Weeks 16–17" }, desc: { zh: "巔峰期：最長訓練日與補給總彩排", en: "Peak: biggest days and full fueling rehearsal" } },
      { name: { zh: "第 18–20 週", en: "Weeks 18–20" }, desc: { zh: "減量期：三週漸進減量，比賽日滿血出發", en: "Taper: three-week taper into race day" } }
    ]
  },
  {
    id: "marathon-16w",
    name: { zh: "全程馬拉松｜16 週", en: "Marathon — 16 Weeks" },
    level: { zh: "中階", en: "Intermediate" },
    for: { zh: "完成過半馬或全馬，想用結構化訓練挑戰新的個人最佳成績。", en: "You've run a half or full marathon and want a structured plan to chase a new PR." },
    weeks: 16,
    hours: "5–8",
    sessions: "5",
    price: { zh: "價格待定", en: "TBA" },
    buyUrl: "",
    includes: [
      { zh: "依目標完賽時間設定配速區間", en: "Pace zones set from your goal finish time" },
      { zh: "長跑、節奏跑與間歇的週期化組合", en: "Periodized long runs, tempo, and intervals" },
      { zh: "肌力與跑姿輔助訓練", en: "Supporting strength and form work" },
      { zh: "比賽日配速與補給策略", en: "Race-day pacing and fueling" }
    ],
    phases: [
      { name: { zh: "第 1–5 週", en: "Weeks 1–5" }, desc: { zh: "基礎期：有氧跑量與肌力", en: "Base: aerobic mileage and strength" } },
      { name: { zh: "第 6–13 週", en: "Weeks 6–13" }, desc: { zh: "進展期：馬拉松配速長跑與閾值", en: "Build: marathon-pace long runs and threshold" } },
      { name: { zh: "第 14–16 週", en: "Weeks 14–16" }, desc: { zh: "減量期：降低跑量、維持節奏感", en: "Taper: lower mileage, keep sharpness" } }
    ]
  }
];
