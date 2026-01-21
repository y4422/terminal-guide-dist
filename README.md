# ClaudeCode Interactive Tutorial

ターミナル操作に不慣れな初心者が、Webブラウザ上でターミナル風UIを操作しながら、ClaudeCodeの使い方を段階的に学べるインタラクティブチュートリアルアプリケーションです。

## 概要

「ターミナルは怖くない」をコンセプトに、約10分でターミナル操作とClaudeCodeの基本を体験し、実際のプロジェクト作成までを完走できる体験型オンボーディングツールです。

### 主な機能

- ターミナルUIのシミュレーション（xterm.js）
- 段階的なチュートリアルフロー（5ステップ）
- リアルタイムの入力バリデーション
- 進捗管理と保存機能
- アニメーションによるフィードバック

### チュートリアル内容

1. **イントロダクション** - 概要と学習目標の説明
2. **フォルダ作成** - 初めてのClaudeCodeへの依頼
3. **ファイル作成** - ファイルとコンテンツの作成
4. **コード生成と実行** - Pythonプログラムの作成
5. **GitHub連携** - リポジトリへのプッシュ
6. **コード改良** - 既存コードの修正体験

## 技術スタック

- **Framework**: Next.js 14
- **Runtime**: React 18
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Terminal UI**: xterm.js 5.3
- **Animation**: Framer Motion 11
- **State Management**: Zustand 4.4

## セットアップ

### 必要な環境

- Node.js 18.x 以上
- npm または pnpm

### インストール

```bash
# 依存関係のインストール
npm install
# または
pnpm install
```

### 開発サーバーの起動

```bash
# 開発モードで起動
npm run dev
# または
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start

# リント実行
npm run lint
```

## プロジェクト構成

```
terminal-guide/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reactコンポーネント
│   │   └── ui/             # shadcn/uiコンポーネント
│   ├── hooks/              # カスタムフック
│   ├── lib/                # ユーティリティ
│   ├── store/              # Zustand store
│   └── types/              # TypeScript型定義
├── public/                  # 静的ファイル
├── spec.md                  # 詳細仕様書
├── CLAUDE.md               # Claude Code設定
├── tailwind.config.ts      # Tailwind設定
├── tsconfig.json           # TypeScript設定
└── package.json            # 依存関係
```

## 詳細仕様

詳しい仕様については `spec.md` を参照してください。

- UI/UXデザイン詳細
- チュートリアルステップの詳細設計
- データモデル
- API設計
- テスト戦略
- アクセシビリティ要件

## ライセンス

Private - TIMEWELL Inc.
