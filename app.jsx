/* NORTIQ LP — FAQ accordion + Tweaks panel */

const { useState, useEffect } = React;

// ───────────────────────────────────────
// FAQ
// ───────────────────────────────────────
const FAQS = [
  {
    q: "社員数が少ない小さな会社ですが、依頼できますか？",
    a: "もちろん可能です。むしろ中小企業のWeb制作・DX支援を中心に行っています。会社規模に合わせて、無理なく実行できるプランをご提案します。"
  },
  {
    q: "社内にIT担当が1人もいません。大丈夫ですか？",
    a: "その状態を前提にプロジェクトを設計します。中の人の負担を最小化する伴走型が、私たちの基本スタンスです。"
  },
  {
    q: "Web制作だけで終わらず、後からAI導入もお願いできますか？",
    a: "もちろん可能です。むしろ Web制作 → AIチャットボット → DX/ML の段階的支援が私たちの基本モデルです。最初は小さく、効果を見ながら次のステップへ進めます。"
  },
  {
    q: "他社のWeb制作会社やDXコンサルと何が違いますか？",
    a: "チームの80%が米国大学出身のエンジニア・データサイエンティストで構成されている点が独自性です。「米国の最新事例」を「日本の中小企業の現場」に翻案できる体制です。戦略立案だけでなく、実装まで一気通貫でお引き受けします。"
  },
  {
    q: "セキュリティはどう担保されますか？",
    a: "業務データを扱う案件では、データの取り扱いルール設計から始めます。AIセキュリティ研究プロダクト「VetoNet」を社内で開発する技術背景を活かし、御社の状況に合わせた構成をご提案します。"
  },
  {
    q: "初回相談で費用は発生しますか？",
    a: "30分の無料相談（オンライン）と、サービス資料のご請求は完全無料です。営業のための営業はいたしません。"
  },
  {
    q: "全国対応していますか？",
    a: "オンラインで全国対応しています。京都を拠点としていますが、関西圏は訪問もご相談いただけます。"
  },
  {
    q: "どのくらいの期間で動き出せますか？",
    a: "営業日24時間以内に一次返信させていただきます。Web制作の場合、お打ち合わせから2〜3週間でデザイン提示が一般的です。"
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <ol className="faq__list">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className={"faq__item" + (isOpen ? " faq__item--open" : "")}>
            <button
              type="button"
              className="faq__q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="faq__q-num">{`Q${i + 1}`}</span>
              <span className="faq__q-text">{item.q}</span>
              <span className="faq__q-toggle" aria-hidden="true"></span>
            </button>
            <div
              className="faq__a"
              style={{ maxHeight: isOpen ? "400px" : "0" }}
            >
              <div className="faq__a-inner">{item.a}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

const faqMount = document.getElementById("faq-mount");
if (faqMount) ReactDOM.createRoot(faqMount).render(<FAQ />);


// ───────────────────────────────────────
// Tweaks
// ───────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#1849E5",
  "accentLight": "#E8EEFC",
  "showHeroDash": true,
  "diagramDense": false
}/*EDITMODE-END*/;

// Curated brand-accent palettes — each is [accent, light tint]
const PALETTES = [
  ["#1849E5", "#E8EEFC"],   // cobalt (default)
  ["#0E7C66", "#E0F1EC"],   // emerald
  ["#9333EA", "#F1E6FB"],   // royal violet
  ["#E11D48", "#FCE5EB"],   // crimson
  ["#0F172A", "#E7E9F0"],   // monochrome navy
];

function TweaksApp() {
  const { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakToggle } = window;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--blue", t.accent);

    // Recompute the light tint to match
    const match = PALETTES.find(([c]) => c.toLowerCase() === (t.accent || "").toLowerCase());
    const tint = match ? match[1] : t.accentLight;
    root.style.setProperty("--blue-100", tint);
    root.style.setProperty("--blue-50", lighten(tint, 0.4));

    const dash = document.querySelector(".hero__viz");
    if (dash) dash.style.display = t.showHeroDash ? "" : "none";

    // Diagram density — collapse the per-layer cell padding when dense
    const arch = document.querySelector(".arch");
    if (arch) arch.classList.toggle("arch--dense", !!t.diagramDense);
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Brand accent">
        <TweakColor
          label="Accent palette"
          value={t.accent}
          options={PALETTES.map((p) => p[0])}
          onChange={(v) => {
            const found = PALETTES.find(([c]) => c === v);
            setTweak({ accent: v, accentLight: found ? found[1] : t.accentLight });
          }}
        />
      </TweakSection>
      <TweakSection title="Layout">
        <TweakToggle
          label="Hero dashboard mock"
          value={t.showHeroDash}
          onChange={(v) => setTweak("showHeroDash", v)}
        />
        <TweakToggle
          label="Dense capability diagram"
          value={t.diagramDense}
          onChange={(v) => setTweak("diagramDense", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

function lighten(hex, mix) {
  // Mix the provided hex toward white by `mix` (0..1).
  const m = (hex || "").match(/^#?([0-9a-f]{6})$/i);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const mr = Math.round(r + (255 - r) * mix);
  const mg = Math.round(g + (255 - g) * mix);
  const mb = Math.round(b + (255 - b) * mix);
  return "#" + [mr, mg, mb].map((c) => c.toString(16).padStart(2, "0")).join("");
}

const tweaksMount = document.getElementById("tweaks-root");
if (tweaksMount && window.useTweaks) {
  ReactDOM.createRoot(tweaksMount).render(<TweaksApp />);
}
