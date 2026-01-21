import { GuideLayout } from '@/components/layout/GuideLayout';
import { Terminal, GitBranch, Upload, Download, FolderPlus } from 'lucide-react';

const sections = [
  { id: 'what-is-git', title: 'Git とは' },
  { id: 'git-init', title: 'git init' },
  { id: 'git-add', title: 'git add' },
  { id: 'git-commit', title: 'git commit' },
  { id: 'git-push', title: 'git push' },
  { id: 'git-pull', title: 'git pull' },
  { id: 'claude-code', title: 'Claude Code での活用' },
  { id: 'ask-claude', title: '困ったら聞こう' },
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

export default function GitGuidePage() {
  return (
    <GuideLayout
      title="Git の使い方"
      description="バージョン管理の基本を学びましょう"
      sections={sections}
      breadcrumb={[
        { label: 'ガイド' },
        { label: 'Git の使い方' },
      ]}
    >
      <Section id="what-is-git" title="Git とは" icon={<GitBranch className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Git は「バージョン管理システム」です。ファイルの変更履歴を記録し、いつでも過去の状態に戻したり、
          複数人で同じプロジェクトを編集したりできます。
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
          <p className="font-medium mb-2">Git でできること:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>ファイルの変更履歴を保存</li>
            <li>過去のバージョンに戻す</li>
            <li>複数人での共同作業</li>
            <li>変更内容の確認・比較</li>
          </ul>
        </div>
      </Section>

      <Section id="git-init" title="git init - リポジトリの初期化" icon={<FolderPlus className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          新しいプロジェクトで Git を使い始めるときに実行します。
          フォルダを「Git リポジトリ」として初期化します。
        </p>
        <CodeBlock title="コマンド">
{`# プロジェクトフォルダに移動
cd my-project

# Git リポジトリとして初期化
git init`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground">
          これで <code className="px-1 py-0.5 bg-muted rounded">.git</code> フォルダが作成され、
          変更履歴を記録できるようになります。
        </p>
      </Section>

      <Section id="git-add" title="git add - ステージング" icon={<Terminal className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          変更したファイルを「ステージングエリア」に追加します。
          これは「次のコミットに含めるファイルを選ぶ」作業です。
        </p>
        <CodeBlock title="コマンド">
{`# 特定のファイルを追加
git add index.html

# 複数ファイルを追加
git add index.html styles.css

# すべての変更を追加
git add .`}
        </CodeBlock>
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>ポイント:</strong> <code className="px-1 py-0.5 bg-muted rounded">git add .</code> は
            現在のフォルダ以下のすべての変更を追加します。よく使うコマンドです。
          </p>
        </div>
      </Section>

      <Section id="git-commit" title="git commit - コミット" icon={<Terminal className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          ステージングした変更を「コミット」として保存します。
          コミットには必ずメッセージ（何を変更したか）を付けます。
        </p>
        <CodeBlock title="コマンド">
{`# メッセージ付きでコミット
git commit -m "ログイン機能を追加"

# 複数行のメッセージ
git commit -m "ログイン機能を追加

- ログインフォームを作成
- バリデーションを実装"`}
        </CodeBlock>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-sm mb-2"><strong>良いコミットメッセージの例:</strong></p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>「ヘッダーのデザインを修正」</li>
            <li>「ユーザー登録機能を追加」</li>
            <li>「バグ修正: ログイン時のエラー」</li>
          </ul>
        </div>
      </Section>

      <Section id="git-push" title="git push - リモートにプッシュ" icon={<Upload className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          ローカルのコミットを GitHub などのリモートリポジトリに送信します。
        </p>
        <CodeBlock title="コマンド">
{`# 初回: リモートリポジトリを追加
git remote add origin https://github.com/username/repo.git

# プッシュ
git push origin main

# 以降は省略形で OK
git push`}
        </CodeBlock>
      </Section>

      <Section id="git-pull" title="git pull - リモートから取得" icon={<Download className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          リモートリポジトリの最新の変更を取得してマージします。
          チームで作業する際は、作業開始前に実行しましょう。
        </p>
        <CodeBlock title="コマンド">
{`# リモートの変更を取得してマージ
git pull

# 特定のブランチから取得
git pull origin main`}
        </CodeBlock>
      </Section>

      <Section id="claude-code" title="Claude Code での Git 活用" icon={<Terminal className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Claude Code を使えば、Git コマンドを覚えなくても自然言語で操作できます。
        </p>

        <h3 className="text-lg font-semibold mb-3">よく使う依頼例</h3>
        <div className="space-y-3">
          {[
            { prompt: '変更をコミットして', description: 'git add . && git commit を実行' },
            { prompt: 'GitHub にプッシュして', description: 'git push を実行' },
            { prompt: '最新の変更を取得して', description: 'git pull を実行' },
            { prompt: '変更履歴を見せて', description: 'git log を実行して表示' },
            { prompt: '今の変更状況を教えて', description: 'git status を実行して説明' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
              <code className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium shrink-0">
                {item.prompt}
              </code>
              <span className="text-muted-foreground text-sm">{item.description}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="font-medium mb-2">スキルを使う</p>
          <p className="text-sm text-muted-foreground">
            <code className="px-1 py-0.5 bg-muted rounded">/commit</code> スキルを使うと、
            変更内容を自動で分析して適切なコミットメッセージを生成してくれます。
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            ※ 使用前に <code className="px-1 py-0.5 bg-muted rounded">/plugin install commit-commands@claude-plugins-official</code> でインストールが必要です
          </p>
        </div>
      </Section>

      <Section id="ask-claude" title="Git で困ったら Claude Code に聞こう" icon={<Terminal className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Git の操作で困ったら、Claude Code に直接質問するのが一番です。
          エラーメッセージをそのまま貼り付けて聞くこともできます。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
          <p className="font-medium mb-3">こんな質問ができます:</p>
          <div className="space-y-2 text-sm">
            {[
              '「コンフリクトが起きたけどどうすればいい?」',
              '「間違えてコミットしたのを取り消したい」',
              '「ブランチの切り方を教えて」',
              '「このエラーの意味を教えて: (エラーメッセージ)」',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-background rounded">
                <span className="text-primary">💬</span>
                <code className="text-muted-foreground">{item}</code>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>ポイント:</strong> Git のコマンドを覚える必要はありません。
            やりたいことを日本語で伝えれば、Claude Code が適切なコマンドを実行してくれます。
          </p>
        </div>
      </Section>
    </GuideLayout>
  );
}
