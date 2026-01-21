import { GuideLayout } from '@/components/layout/GuideLayout';
import { Zap, FileText, Code, GitCommit, Paintbrush, Table, Download, GitPullRequest, Trash2, AlertTriangle } from 'lucide-react';

const sections = [
  { id: 'what-is-skill', title: 'スキルとコマンド' },
  { id: 'builtin-commands', title: 'ビルトインコマンド' },
  { id: 'ask-claude', title: '困ったら聞こう' },
  { id: 'install-plugin', title: 'プラグインのインストール' },
  { id: 'commit-commands', title: 'commit-commands' },
  { id: 'example-skills', title: 'example-skills' },
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
        { label: 'ガイド', href: '/guides' },
        { label: 'Claude Code スキル' },
      ]}
    >
      <Section id="what-is-skill" title="スキルとコマンド" icon={<Zap className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Claude Code では <code className="px-1 py-0.5 bg-muted rounded">/</code> で始まる入力で様々な機能を呼び出せます。
          これらは大きく2種類に分かれます。
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="font-medium mb-2">ビルトインコマンド</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 標準で使用可能</li>
              <li>• /help, /init, /model など</li>
              <li>• インストール不要</li>
            </ul>
          </div>
          <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <p className="font-medium mb-2">スキル（プラグイン）</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• プラグインで追加</li>
              <li>• /commit, /pdf, /xlsx など</li>
              <li>• インストールが必要</li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          <strong>ヒント:</strong> Claude Code で <code className="px-1 py-0.5 bg-muted rounded">/</code> と入力すると、
          使用可能なコマンドとスキルの一覧が表示されます。
        </p>
      </Section>

      <Section id="builtin-commands" title="ビルトインコマンド（標準搭載）" icon={<Code className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          以下のコマンドはインストール不要で、すぐに使えます。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {[
            { cmd: '/help', desc: 'ヘルプを表示' },
            { cmd: '/init', desc: 'CLAUDE.md を作成' },
            { cmd: '/memory', desc: 'CLAUDE.md を編集' },
            { cmd: '/model', desc: 'AI モデルを変更' },
            { cmd: '/config', desc: '設定画面を開く' },
            { cmd: '/clear', desc: '会話履歴をクリア' },
            { cmd: '/compact', desc: '会話を圧縮' },
            { cmd: '/context', desc: 'コンテキスト使用量を表示' },
            { cmd: '/cost', desc: 'トークン使用量を表示' },
            { cmd: '/export', desc: '会話をエクスポート' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <code className="font-mono text-sm font-medium text-primary">{item.cmd}</code>
              <span className="text-sm text-muted-foreground">{item.desc}</span>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3">よく使うコマンド</h3>

        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">/init - プロジェクト初期化</p>
            <p className="text-sm text-muted-foreground mb-2">
              CLAUDE.md ファイルを作成し、プロジェクトの設定を Claude に伝えます。
            </p>
            <CodeBlock>{`/init`}</CodeBlock>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">/model - モデル変更</p>
            <p className="text-sm text-muted-foreground mb-2">
              使用する AI モデルを切り替えます（Sonnet, Opus など）。
            </p>
            <CodeBlock>{`/model`}</CodeBlock>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">/compact - 会話圧縮</p>
            <p className="text-sm text-muted-foreground mb-2">
              長い会話を要約して、コンテキストを節約します。
            </p>
            <CodeBlock>{`/compact`}</CodeBlock>
          </div>
        </div>
      </Section>

      <Section id="ask-claude" title="困ったら Claude Code に聞こう" icon={<Zap className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          使い方がわからなくなったら、Claude Code に直接質問するのが一番です。
          日本語で気軽に聞いてみましょう。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="font-medium mb-3">こんな時は Claude Code に聞こう:</p>
          <div className="space-y-2">
            {[
              { q: '「このコマンドの使い方を教えて」', a: '詳しい説明と例を教えてくれます' },
              { q: '「ファイルの作り方がわからない」', a: '手順を一から説明してくれます' },
              { q: '「エラーが出たけど意味がわからない」', a: 'エラーの原因と解決策を提案してくれます' },
              { q: '「もっと効率的な方法はある?」', a: 'より良いやり方を提案してくれます' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 p-2 bg-background rounded">
                <code className="text-sm text-primary font-medium">{item.q}</code>
                <span className="text-xs text-muted-foreground">→ {item.a}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>ポイント:</strong> Claude Code は会話の文脈を覚えています。
            「さっきのファイルを...」のように前の内容を参照した質問もできます。
          </p>
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

      <Section id="example-skills" title="example-skills プラグイン" icon={<Zap className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Anthropic が提供する公式スキル集です。PDF、Excel、フロントエンドデザインなど、様々な実用的スキルが含まれています。
        </p>

        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">インストール</p>
          <CodeBlock>
{`/plugin install example-skills@anthropic-agent-skills`}
          </CodeBlock>
        </div>

        <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
          <FileText className="h-5 w-5" />
          /pdf - PDF操作
        </h3>
        <p className="text-muted-foreground mb-3">
          PDF ファイルの読み取り、作成、編集、フォーム入力ができます。
        </p>
        <CodeBlock title="使い方">
{`# PDF を読み取り・要約
/pdf report.pdf の内容を要約して

# PDF を作成
/pdf 議事録を PDF で作成して

# PDF フォームに入力
/pdf application.pdf のフォームに記入して`}
        </CodeBlock>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 mt-4">
          {['テキスト抽出', '新規作成', '結合・分割', 'フォーム入力'].map((item, i) => (
            <div key={i} className="p-2 bg-muted/30 rounded text-center text-xs">
              {item}
            </div>
          ))}
        </div>

        <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
          <Table className="h-5 w-5" />
          /xlsx - スプレッドシート操作
        </h3>
        <p className="text-muted-foreground mb-3">
          Excel ファイル（.xlsx、.csv）の読み取り、作成、編集、分析ができます。
        </p>
        <CodeBlock title="使い方">
{`# Excel を読み取り・分析
/xlsx sales.xlsx のデータを分析して

# Excel を作成
/xlsx 売上データをスプレッドシートにまとめて

# 数式を含むシートを作成
/xlsx 予算計算シートを作って（合計と平均の数式付き）`}
        </CodeBlock>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 mt-4">
          {['データ読み取り', '新規作成', '数式サポート', 'データ分析'].map((item, i) => (
            <div key={i} className="p-2 bg-muted/30 rounded text-center text-xs">
              {item}
            </div>
          ))}
        </div>

        <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
          <Paintbrush className="h-5 w-5" />
          /frontend-design - フロントエンド設計
        </h3>
        <p className="text-muted-foreground mb-3">
          モダンで美しいフロントエンドデザインを生成します。
          React、Tailwind CSS を使ったプロダクションレベルの UI を作成できます。
        </p>
        <CodeBlock title="使い方">
{`# デザインを生成
/frontend-design ダッシュボード画面を作って

# 既存のデザインを改善
/frontend-design このページをもっとモダンにして

# 特定のスタイルを指定
/frontend-design ダークモード対応のログインページを作って`}
        </CodeBlock>
        <div className="space-y-2 mt-4 mb-6">
          {[
            'モダンで洗練されたデザイン',
            'レスポンシブ対応',
            'アクセシビリティを考慮',
            'ダークモード対応',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3">その他のスキル</h3>
        <p className="text-muted-foreground mb-3">
          example-skills には他にも便利なスキルが含まれています:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: '/docx', desc: 'Word ドキュメントの作成・編集' },
            { name: '/pptx', desc: 'PowerPoint プレゼンテーション作成' },
            { name: '/doc-coauthoring', desc: 'ドキュメント共同編集ワークフロー' },
            { name: '/mcp-builder', desc: 'MCP サーバー作成ガイド' },
            { name: '/skill-creator', desc: 'カスタムスキル作成ガイド' },
            { name: '/webapp-testing', desc: 'Playwright を使った Web アプリテスト' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-muted/30 rounded-lg">
              <p className="font-mono text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
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
