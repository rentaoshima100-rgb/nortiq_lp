# NORTIQ LABS LP — Vercel デプロイ手順

> ⚠️ **本番上書き注意（2026-05-28 確認）**
> 現在の本番 https://nortiqlab.com は、このフォルダとは**別ビルド**（React 製・多ページ
> プリレンダリング: `/web /chatbot /dx /voice /works /news /recruit`）が公開中です。
> このフォルダは単一ページ静的 LP の**並行版**。`vercel --prod` をここから実行すると
> 本番の多ページ版を上書きし、ルート・構造化データ（ProfessionalService / パンくず）等を
> 失う恐れがあります。**どちらを正とするか確定してから本番デプロイすること。**

静的サイトです（ビルド不要）。`index.html` がエントリーポイント。
クライアントサイドフレームワークは不使用（React / ReactDOM / Babel は性能のため撤去済み）。
FAQ アコーディオンと問い合わせフォーム送信は、`index.html` 末尾のインライン Vanilla JS で動きます。

## 配信されるファイル
- `index.html` … LP 本体（FAQ・フォーム JS をインライン同梱）
- `privacy.html` / `terms.html` / `tokushoho.html` … 法務ページ（cleanUrls で /privacy 等で配信）
- `styles.css` … スタイル
- `assets/` … 画像（hero-tokyo-office.jpg, loop-ai-step03/04.png, moko-shop-mobile.png, logo.png）
- `favicon.ico` / `favicon.svg` / `apple-touch-icon.png` / `ogp.png` … アイコン・OGP
- `robots.txt` / `sitemap.xml` … SEO
- `vercel.json` … 静的配信設定（セキュリティヘッダ + キャッシュヘッダ）

## 配信しないファイル（`.vercelignore` で除外）
- `uploads/` … 社内資料（料金戦略・法務雛形・広告KW等）。**公開禁止**
- `NORTIQ-LP-standalone.html` … 10MB の単一ファイル書き出し版（共有用フォールバック）
- `index-v1-warm-editorial.html` / `styles-v1.css` … 旧バージョン

## デプロイ
ログイン済み（`vercel whoami` で確認）。このフォルダで実行：

```bash
# プレビュー（確認用 URL を発行）
vercel --yes

# 本番として公開
vercel --prod --yes
```

初回はプロジェクトがリンクされ、`.vercel/` フォルダが作成されます。
2 回目以降は同じプロジェクトに上書きデプロイされます。
