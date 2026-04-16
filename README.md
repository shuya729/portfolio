# Shuya's Portfolio

管秀哉（Suga Shuya）のスキルや開発実績について、チャット形式で確認できるポートフォリオサイトです。

訪問者が AI アシスタントに質問すると、プロフィール・経歴・個人開発プロジェクト・技術スタック・将来像などの情報をもとに回答が返ります。各プロジェクトのスクリーンショットも画像ギャラリーとして表示できます。

---

## 技術スタック

| レイヤー | 技術 |
| --- | --- |
| フレームワーク | [Next.js](https://nextjs.org/) 16 (App Router / Turbopack) |
| UI ライブラリ | [React](https://react.dev/) 19 / [Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/) |
| チャット UI | [@assistant-ui/react](https://github.com/assistant-ui/assistant-ui) / [Vercel AI SDK](https://sdk.vercel.ai/) |
| AI モデル | OpenAI GPT-5 mini（`@ai-sdk/openai`） |
| レート制限 | [Upstash Redis](https://upstash.com/)（IP ベース、毎時 60 リクエスト） |
| スタイリング | [Tailwind CSS](https://tailwindcss.com/) v4 |
| 状態管理 | [Zustand](https://zustand.docs.pmnd.rs/) |
| Lint / Format | [Biome](https://biomejs.dev/) |
| 言語 | TypeScript 6 |

---

## ディレクトリ構成

```text
portfolio/
├── app/
│   ├── api/chat/
│   │   ├── route.ts                 # POST エンドポイント（ストリーミング応答）
│   │   ├── prompts/
│   │   │   └── system-prompt.ts     # システムプロンプト（ポートフォリオ情報）
│   │   └── tools/
│   │       ├── index.ts             # ツール定義の集約
│   │       ├── create-app-image-tool.ts  # 画像表示ツールのファクトリ
│   │       ├── app-image-galleries.ts    # 画像ギャラリーデータ
│   │       └── app-image-tool-ui.tsx     # 画像ギャラリーの UI コンポーネント
│   ├── assistant.tsx                # チャットランタイムプロバイダー
│   ├── page.tsx                     # トップページ
│   └── layout.tsx                   # ルートレイアウト
├── components/
│   ├── assistant-ui/                # チャット UI コンポーネント
│   ├── icons/                       # アイコン
│   └── ui/                          # shadcn/ui コンポーネント
├── lib/
│   ├── chat/
│   │   └── chat-api-error.ts        # クライアント側エラーハンドリング
│   ├── rate-limit/
│   │   ├── chat-ip-rate-limit.ts    # IP ベースレート制限
│   │   └── constants.ts             # レート制限の定数
│   └── utils.ts                     # cn() ユーティリティ
├── public/images/                   # プロジェクトのスクリーンショット
├── biome.jsonc
├── next.config.ts
└── package.json
```

---

## 主な機能

- **AI チャットインターフェース** — @assistant-ui/react によるスレッド形式の対話 UI。メッセージの編集・コピー・ブランチ切り替えに対応
- **システムプロンプト** — ポートフォリオ情報（プロフィール、経歴、個人開発、インターン経験、技術スタック、将来像）を構造化して AI に提供
- **画像表示ツール** — AI が文脈に応じて各プロジェクトのスクリーンショットを横スクロール可能なギャラリーとして表示
- **レート制限** — Upstash Redis を用いた IP ベースのレート制限（毎時 60 リクエスト）。超過時はトースト通知で案内
- **ウェルカム画面** — 「自己紹介」「個人開発」「技術スタック」「将来像」の 4 つのサジェスチョンを表示

---

## セットアップ

### 前提

- Node.js
- npm

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` を `.env` にコピーして値を設定します。

```bash
cp .env.example .env
```

| 変数 | 説明 |
| --- | --- |
| `OPENAI_API_KEY` | OpenAI の API キー |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis の REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis の REST トークン |

### 3. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアクセスできます。

---

## スクリプト

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動（Turbopack） |
| `npm run build` | プロダクションビルド |
| `npm run start` | プロダクションサーバーを起動 |
| `npm run lint` | Biome による静的チェック |
| `npm run lint:fix` | Biome による自動修正 |
| `npm run format` | Biome によるフォーマットチェック |
| `npm run format:fix` | Biome による自動フォーマット |
