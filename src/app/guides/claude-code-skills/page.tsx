import { GuideLayout } from '@/components/layout/GuideLayout';
import { Zap, FileText, Code, GitCommit, Search, Paintbrush, Table, Download, GitPullRequest, Trash2, AlertTriangle } from 'lucide-react';

const sections = [
  { id: 'what-is-skill', title: 'スキルとは' },
  { id: 'install-plugin', title: 'プラグインのインストール' },
  { id: 'commit-commands', title: 'commit-commands' },
  { id: 'review-pr', title: '/review-pr' },
  { id: 'pdf', title: '/pdf' },
  { id: 'xlsx', title: '/xlsx' },
  { id: 'frontend-design', title: '/frontend-design' },
  { id: 'claude-md', title: 'CLAUDE.md の活用' },
];

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-border/50">
      {title && (
        <div className="px-4 py-2 bg-muted/50 border-b border-border/50 text-sm font-medium">
          {title}
        </div>
      )}
      <pre className="p-4 bg-terminal-bg text-terminal-text overflow-x-auto">
        <code className="text-sm font-mono">{children}</code>
      </pre>
    </div>
  );
}

function Section({ id, title, icon, children }: {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ClaudeCodeSkillsPage() {
  return (
    <GuideLayout
      title="Claude Code スキル"
      description="スキル機能と CLAUDE.md を活用して開発効率をアップ"
      sections={sections}
      breadcrumb={[
        { label: 'ガイド' },
        { label: 'Claude Code スキル' },
      ]}
    >
      <Section id="what-is-skill" title="スキルとは" icon={<Zap className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          スキルは Claude Code の機能を拡張する「ショートカット」です。
          <code className="px-1 py-0.5 bg-muted rounded">/スキル名</code> と入力するだけで、
          特定のタスクを効率的に実行できます。
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
          <p className="font-medium mb-2">スキルのメリット:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>複雑なタスクをワンコマンドで実行</li>
            <li>ベストプラクティスに基づいた処理</li>
            <li>一貫した出力フォーマット</li>
          </ul>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-600 dark:text-amber-400">注意</p>
            <p className="text-sm text-muted-foreground mt-1">
              一部のスキル（<code className="px-1 py-0.5 bg-muted rounded">/commit</code> など）は
              プラグインとして提供されており、使用前にインストールが必要です。
            </p>
          </div>
        </div>
      </Section>

      <Section id="install-plugin" title="プラグインのインストール" icon={<Download className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Claude Code のプラグインは <code className="px-1 py-0.5 bg-muted rounded">/plugin</code> コマンドで管理します。
        </p>

        <h3 className="text-lg font-semibold mb-3">プラグインマネージャーを開く</h3>
        <CodeBlock title="コマンド">
{`/plugin`}
        </CodeBlock>
        <p className="text-muted-foreground mb-4">
          Tab キーで「Discover」タブに移動すると、インストール可能なプラグイン一覧が表示されます。
        </p>

        <h3 className="text-lg font-semibold mb-3">直接インストール</h3>
        <CodeBlock title="コマンド">
{`# プラグインを直接インストール
/plugin install <プラグイン名>@claude-plugins-official

# 例: commit-commands をインストール
/plugin install commit-commands@claude-plugins-official`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3 mt-6">インストールスコープ</h3>
        <div className="space-y-3">
          {[
            {
              title: 'User（ユーザー）',
              description: '全プロジェクトで使用可能。個人設定に保存されます。',
            },
            {
              title: 'Project（プロジェクト）',
              description: '.claude/settings.json に保存。チームメンバーと共有できます。',
            },
            {
              title: 'Local（ローカル）',
              description: 'このリポジトリのみで使用。Git にはコミットされません。',
            },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="font-medium mb-2">バージョン要件</p>
          <p className="text-sm text-muted-foreground">
            プラグイン機能を使うには Claude Code バージョン 1.0.33 以上が必要です。
            <code className="px-1 py-0.5 bg-muted rounded ml-1">claude --version</code> で確認できます。
          </p>
        </div>
      </Section>

      <Section id="commit-commands" title="commit-commands プラグイン" icon={<GitCommit className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Git 操作を効率化する公式プラグインです。コミット、プッシュ、PR 作成をワンコマンドで実行できます。
        </p>

        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">インストール</p>
          <CodeBlock>
{`/plugin install commit-commands@claude-plugins-official`}
          </CodeBlock>
        </div>

        <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
          <GitCommit className="h-5 w-5" />
          /commit
        </h3>
        <p className="text-muted-foreground mb-3">
          変更内容を分析して、適切なコミットメッセージを自動生成します。
        </p>
        <CodeBlock title="使い方">
{`# スキルを実行
/commit

# Claude が以下を実行:
# 1. 変更内容を分析
# 2. 過去のコミット履歴からスタイルを学習
# 3. 適切なメッセージを生成
# 4. git add && git commit を実行`}
        </CodeBlock>
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
          <p className="text-sm">
            <strong>ポイント:</strong> Conventional Commits 形式（fix:, feat: など）に対応。
            .env や credentials.json などの機密ファイルは自動でスキップされます。
          </p>
        </div>

        <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
          <GitPullRequest className="h-5 w-5" />
          /commit-push-pr
        </h3>
        <p className="text-muted-foreground mb-3">
          コミット、プッシュ、PR 作成を一発で実行します。
        </p>
        <CodeBlock title="使い方">
{`# コミット → プッシュ → PR作成 を一発で
/commit-push-pr

# Claude が以下を実行:
# 1. 変更をコミット
# 2. リモートにプッシュ
# 3. PR を作成（タイトルと説明も自動生成）`}
        </CodeBlock>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">
              <strong>前提条件:</strong> GitHub CLI（gh）がインストールされ、認証済みである必要があります。
            </p>
          </div>
        </div>

        <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
          <Trash2 className="h-5 w-5" />
          /clean_gone
        </h3>
        <p className="text-muted-foreground mb-3">
          リモートで削除されたブランチをローカルからクリーンアップします。
        </p>
        <CodeBlock title="使い方">
{`# 不要なブランチを削除
/clean_gone

# リモートで削除済みのブランチを
# ローカルからも削除してくれます`}
        </CodeBlock>
      </Section>

      <Section id="review-pr" title="/review-pr - PRレビュー" icon={<Search className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Pull Request の内容をレビューし、改善点やバグを指摘します。
        </p>

        <div className="bg-muted/30 rounded-lg p-4 mb-4">
          <p className="font-medium mb-2">このスキルはビルトイン</p>
          <p className="text-sm text-muted-foreground">
            /review-pr は Claude Code に標準搭載されています。プラグインのインストールは不要です。
          </p>
        </div>

        <CodeBlock title="使い方">
{`# PR番号を指定してレビュー
/review-pr 123

# または現在のブランチの PR をレビュー
/review-pr

# GitHub の URL を指定
/review-pr https://github.com/owner/repo/pull/123`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3 mt-6">レビュー内容</h3>
        <div className="space-y-2">
          {[
            'コードの問題点・バグの検出',
            'セキュリティリスクの指摘',
            'パフォーマンスの改善点',
            'コーディング規約の違反',
            '設計上の懸念点',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">
              <strong>前提条件:</strong> GitHub CLI（gh）がインストールされ、認証済みである必要があります。
            </p>
          </div>
        </div>
      </Section>

      <Section id="pdf" title="/pdf - PDF操作" icon={<FileText className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          PDF ファイルの読み取り、作成、編集、フォーム入力ができます。
        </p>

        <div className="bg-muted/30 rounded-lg p-4 mb-4">
          <p className="font-medium mb-2">ビルトインスキル</p>
          <p className="text-sm text-muted-foreground">
            Claude Code に標準搭載。インストール不要ですぐに使えます。
          </p>
        </div>

        <CodeBlock title="使い方">
{`# PDF を読み取り・要約
/pdf report.pdf の内容を要約して

# PDF を作成
/pdf 議事録を PDF で作成して

# PDF フォームに入力
/pdf application.pdf のフォームに記入して`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3 mt-6">できること</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'テキスト抽出', desc: 'PDF からテキストを抽出' },
            { title: '新規作成', desc: 'テキストや表を含む PDF を生成' },
            { title: '結合・分割', desc: '複数 PDF の結合や分割' },
            { title: 'フォーム入力', desc: 'PDF フォームへの自動入力' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-muted/30 rounded-lg">
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="xlsx" title="/xlsx - スプレッドシート操作" icon={<Table className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Excel ファイル（.xlsx、.csv）の読み取り、作成、編集、分析ができます。
        </p>

        <div className="bg-muted/30 rounded-lg p-4 mb-4">
          <p className="font-medium mb-2">ビルトインスキル</p>
          <p className="text-sm text-muted-foreground">
            Claude Code に標準搭載。インストール不要ですぐに使えます。
          </p>
        </div>

        <CodeBlock title="使い方">
{`# Excel を読み取り・分析
/xlsx sales.xlsx のデータを分析して

# Excel を作成
/xlsx 売上データをスプレッドシートにまとめて

# 数式を含むシートを作成
/xlsx 予算計算シートを作って（合計と平均の数式付き）`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3 mt-6">できること</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'データ読み取り', desc: 'Excel/CSV のデータ抽出' },
            { title: '新規作成', desc: '書式付きスプレッドシート生成' },
            { title: '数式サポート', desc: 'SUM, AVERAGE など数式対応' },
            { title: 'データ分析', desc: 'グラフ・チャートの作成' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-muted/30 rounded-lg">
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="frontend-design" title="/frontend-design - フロントエンド設計" icon={<Paintbrush className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          モダンで美しいフロントエンドデザインを生成します。
          React、Tailwind CSS を使ったプロダクションレベルの UI を作成できます。
        </p>

        <div className="bg-muted/30 rounded-lg p-4 mb-4">
          <p className="font-medium mb-2">ビルトインスキル</p>
          <p className="text-sm text-muted-foreground">
            Claude Code に標準搭載。インストール不要ですぐに使えます。
          </p>
        </div>

        <CodeBlock title="使い方">
{`# デザインを生成
/frontend-design ダッシュボード画面を作って

# 既存のデザインを改善
/frontend-design このページをもっとモダンにして

# 特定のスタイルを指定
/frontend-design ダークモード対応のログインページを作って`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3 mt-6">特徴</h3>
        <div className="space-y-2">
          {[
            'モダンで洗練されたデザイン',
            'レスポンシブ対応（モバイル〜デスクトップ）',
            'アクセシビリティを考慮',
            'ダークモード対応',
            'アニメーション・マイクロインタラクション',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="claude-md" title="CLAUDE.md の活用" icon={<Code className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          <code className="px-1 py-0.5 bg-muted rounded">CLAUDE.md</code> は、プロジェクト固有の設定やルールを
          Claude Code に伝えるためのファイルです。プロジェクトのルートに配置します。
        </p>

        <h3 className="text-lg font-semibold mb-3">CLAUDE.md の書き方</h3>
        <CodeBlock title="CLAUDE.md の例">
{`# CLAUDE.md

## プロジェクト概要
- Next.js 14 + TypeScript のウェブアプリ
- スタイリングは Tailwind CSS を使用

## コーディング規約
- コンポーネントは関数コンポーネントで作成
- 型定義は必ず付ける
- 日本語でコメントを書く

## よく使うコマンド
- npm run dev: 開発サーバー起動
- npm run build: ビルド
- npm run test: テスト実行

## ディレクトリ構造
- src/app: ページコンポーネント
- src/components: 共通コンポーネント
- src/lib: ユーティリティ関数`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3 mt-6">ベストプラクティス</h3>
        <div className="space-y-3">
          {[
            {
              title: 'プロジェクト概要を書く',
              description: '技術スタック、目的、主要な機能を簡潔に記載',
            },
            {
              title: 'コーディング規約を明記',
              description: '命名規則、フォーマット、使用するライブラリなど',
            },
            {
              title: 'よく使うコマンドを記載',
              description: 'ビルド、テスト、デプロイなどのコマンド',
            },
            {
              title: 'ディレクトリ構造を説明',
              description: '各フォルダの役割を記載しておくと Claude が理解しやすい',
            },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="font-medium mb-2">CLAUDE.md を置く場所</p>
          <p className="text-sm text-muted-foreground">
            プロジェクトのルートディレクトリに配置します。Claude Code は起動時に自動で読み込み、
            プロジェクトのコンテキストとして活用します。
          </p>
        </div>
      </Section>
    </GuideLayout>
  );
}
