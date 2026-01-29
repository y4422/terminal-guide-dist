import { GuideLayout } from '@/components/layout/GuideLayout';
import { Terminal, Upload, Download, FolderPlus, Users, BookOpen, Clock, Lightbulb, CheckCircle, AlertTriangle, MessageCircle, Github, GitPullRequest, ExternalLink, GitBranch } from 'lucide-react';
import { FaApple, FaWindows } from 'react-icons/fa';

const sections = [
  { id: 'what-is-github', title: 'GitHub とは' },
  { id: 'github-setup', title: 'アカウント作成と認証' },
  { id: 'github-repo', title: 'リポジトリを作成' },
  { id: 'git-push', title: 'git push' },
  { id: 'git-pull', title: 'git pull' },
  { id: 'git-clone', title: 'git clone' },
  { id: 'branch', title: 'ブランチとは' },
  { id: 'pull-request', title: 'プルリクエスト' },
  { id: 'claude-code-github', title: 'Claude Code で GitHub' },
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

function TermBox({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 my-4">
      <p className="font-bold text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        <span>用語: {term}</span>
      </p>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function WhenToUse({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 my-4">
      <p className="font-bold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span>いつ使う?</span>
      </p>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

export default function GitHubGuidePage() {
  return (
    <GuideLayout
      title="GitHub の使い方"
      description="コードをクラウドで管理・共有しよう"
      sections={sections}
      breadcrumb={[
        { label: 'ガイド', href: '/guides' },
        { label: 'GitHub の使い方' },
      ]}
    >
      <Section id="what-is-github" title="GitHub とは" icon={<Github className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4 text-lg">
          GitHub（ギットハブ）は、Git で管理したコードを<strong>インターネット上に保存・共有</strong>できるサービスです。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" /> GitHub でできること</p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>バックアップ</strong> - パソコンが壊れてもコードは安全</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>どこからでもアクセス</strong> - 別のPCでも同じコードで作業</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>チーム開発</strong> - 他の人とコードを共有して共同作業</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>ポートフォリオ</strong> - 自分の作品を世界に公開</span>
            </li>
          </ul>
        </div>

        <TermBox term="GitHub（ギットハブ）">
          Git で管理したコードをインターネット上に保存・共有できるサービス。
          「Git のクラウド版」と思ってください。無料で使えます。
        </TermBox>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>Git と GitHub の違い:</strong> Git = セーブ機能（ローカル）、GitHub = クラウド保存（インターネット）。
            Git だけでも使えますが、GitHub があると安心で便利です。
          </p>
        </div>
      </Section>

      <Section id="github-setup" title="アカウント作成と認証" icon={<Github className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          GitHub を使うには、アカウント作成と認証設定が必要です。
          一度設定すれば、あとは自動でログインできます。
        </p>

        <h3 className="text-lg font-semibold mb-3">Step 1: GitHub アカウントを作成</h3>
        <div className="space-y-3 mb-6">
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm">
              <strong>1.</strong>{' '}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                github.com <ExternalLink className="h-3 w-3" />
              </a>
              {' '}にアクセス
            </p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>2.</strong> 「Sign up」をクリック</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>3.</strong> メールアドレス、パスワード、ユーザー名を入力</p>
            <p className="text-xs text-muted-foreground mt-1">ユーザー名は公開されます。本名でも OK ですが、後から変更しにくいので慎重に決めましょう</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>4.</strong> メールで届く確認コードを入力して完了</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3">Step 2: GitHub CLI で認証（推奨）</h3>
        <p className="text-sm text-muted-foreground mb-4">
          GitHub CLI（gh コマンド）を使うと、ターミナルから簡単に GitHub を操作できます。
          Claude Code も内部でこれを使っています。
        </p>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2 flex items-center gap-2">
            <FaApple className="h-4 w-4" /> Mac の場合
          </p>
          <CodeBlock title="Homebrew でインストール">
{`brew install gh`}
          </CodeBlock>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2 flex items-center gap-2">
            <FaWindows className="h-4 w-4" /> Windows の場合
          </p>
          <CodeBlock title="winget でインストール">
{`winget install GitHub.cli`}
          </CodeBlock>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">認証を実行</p>
          <CodeBlock title="GitHub にログイン">
{`gh auth login`}
          </CodeBlock>
          <div className="text-sm text-muted-foreground space-y-1 mt-2">
            <p>対話式で質問されるので、以下のように選択:</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>GitHub.com を選択</li>
              <li>HTTPS を選択</li>
              <li>「Login with a web browser」を選択</li>
              <li>表示されるコードをコピーして、開いたブラウザに入力</li>
            </ul>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
          <p className="font-medium mb-2 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" /> Claude Code にお願いする場合</p>
          <p className="text-sm text-muted-foreground mb-3">
            コマンドを覚えなくても、こう伝えるだけでOK:
          </p>
          <div className="space-y-2">
            <div className="p-3 bg-muted/30 rounded-lg">
              <code className="text-sm text-primary">「GitHub CLI をインストールして認証して」</code>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /><strong>これで準備完了!</strong></span>
            {' '}以降は <code className="px-1 py-0.5 bg-muted rounded">git push</code> や <code className="px-1 py-0.5 bg-muted rounded">gh</code> コマンドが使えるようになります。
          </p>
        </div>
      </Section>

      <Section id="github-repo" title="リポジトリを作成" icon={<FolderPlus className="h-6 w-6 text-primary" />}>
        <TermBox term="リポジトリ（Repository）">
          プロジェクトの保管場所のこと。コードやファイル、変更履歴がまとめて保存されます。
          「リポ」や「レポ」と略されることもあります。GitHub 上の「フォルダ」だと思ってください。
        </TermBox>

        <WhenToUse>
          新しいプロジェクトを GitHub で管理したいとき、または既存のプロジェクトを GitHub にアップロードしたいときに使います。
        </WhenToUse>

        <h3 className="text-lg font-semibold mb-3">方法 1: GitHub のサイトで作成</h3>
        <div className="space-y-3 mb-6">
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>1.</strong> GitHub にログインして、右上の「+」→「New repository」をクリック</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>2.</strong> Repository name にプロジェクト名を入力（例: my-first-app）</p>
            <p className="text-xs text-muted-foreground mt-1">英数字とハイフンのみ使用可能</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>3.</strong> Public（公開）または Private（非公開）を選択</p>
            <p className="text-xs text-muted-foreground mt-1">練習用なら Private でOK。ポートフォリオにするなら Public</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>4.</strong> 「Create repository」をクリックして完了</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3">方法 2: コマンドで作成（GitHub CLI）</h3>
        <CodeBlock title="リポジトリを作成">
{`# 現在のフォルダを GitHub リポジトリとして作成
gh repo create my-app --private --source=. --push`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground mb-6">
          <code className="px-1 py-0.5 bg-muted rounded">--private</code> を <code className="px-1 py-0.5 bg-muted rounded">--public</code> に変えると公開リポジトリになります。
        </p>

        <h3 className="text-lg font-semibold mb-3">既存のプロジェクトを GitHub にアップロード</h3>
        <p className="text-sm text-muted-foreground mb-3">
          すでにローカルで作成したプロジェクトを GitHub に上げる場合:
        </p>
        <CodeBlock title="既存プロジェクトをアップロード">
{`# 1. GitHub でリポジトリを作成した後...

# 2. リモートを追加（GitHub のURLを設定）
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git

# 3. アップロード
git push -u origin main`}
        </CodeBlock>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-sm">
            <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>Claude Code なら簡単:</strong></span>
            {' '}「このプロジェクトを GitHub にアップして」と言うだけで、リポジトリ作成からプッシュまで全部やってくれます。
          </p>
        </div>
      </Section>

      <Section id="git-push" title="git push - GitHub にアップロード" icon={<Upload className="h-6 w-6 text-primary" />}>
        <WhenToUse>
          手元でコミットした変更を GitHub にアップロードしたいときに使います。
          バックアップや、チームとの共有に使います。
        </WhenToUse>

        <TermBox term="プッシュ（Push）">
          ローカル（自分のPC）の変更を、リモート（GitHub）にアップロードすること。
          「自分の変更を GitHub に送る」操作です。
        </TermBox>

        <CodeBlock title="コマンド">
{`# GitHub にアップロード
git push`}
        </CodeBlock>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
          <p className="text-sm">
            <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>ポイント:</strong></span>
            {' '}push する前に必ず commit しておく必要があります。commit していない変更は push されません。
          </p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <p className="text-sm">
            <span className="flex items-center gap-1"><AlertTriangle className="h-4 w-4" /><strong>初回のみ:</strong></span>
            {' '}初めて push するときは <code className="px-1 py-0.5 bg-muted rounded">git push -u origin main</code> のように、
            リモートとブランチを指定する必要があります。2回目以降は <code className="px-1 py-0.5 bg-muted rounded">git push</code> だけでOK。
          </p>
        </div>
      </Section>

      <Section id="git-pull" title="git pull - 最新版をダウンロード" icon={<Download className="h-6 w-6 text-primary" />}>
        <WhenToUse>
          GitHub にある最新の変更を、手元のパソコンに取り込みたいときに使います。
          チームで作業しているとき、他の人の変更を取得するのに使います。
        </WhenToUse>

        <TermBox term="プル（Pull）">
          リモート（GitHub）の変更を、ローカル（自分のPC）にダウンロードすること。
          「GitHub から最新を取ってくる」操作です。
        </TermBox>

        <CodeBlock title="コマンド">
{`# 最新版を取得
git pull`}
        </CodeBlock>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>習慣にしよう:</strong></span> チームで作業するときは、
            作業を始める前に <code className="px-1 py-0.5 bg-muted rounded">git pull</code> して
            最新の状態にしておくと、トラブルを防げます。
          </p>
        </div>
      </Section>

      <Section id="git-clone" title="git clone - リポジトリをダウンロード" icon={<Download className="h-6 w-6 text-primary" />}>
        <WhenToUse>
          GitHub にあるプロジェクトを自分のパソコンにダウンロードしたいときに使います。
          他の人のコードを見たいときや、チームのプロジェクトを始めるときに使います。
        </WhenToUse>

        <TermBox term="クローン（Clone）">
          リポジトリを丸ごとコピーすること。ファイルだけでなく、Git の履歴も全部ダウンロードされます。
        </TermBox>

        <CodeBlock title="コマンド">
{`# GitHub からダウンロード
git clone https://github.com/ユーザー名/リポジトリ名.git

# 例: React の公式リポジトリをダウンロード
git clone https://github.com/facebook/react.git`}
        </CodeBlock>

        <p className="text-sm text-muted-foreground mb-4">
          実行すると、カレントディレクトリにリポジトリ名のフォルダが作成されます。
        </p>

        <h3 className="text-lg font-semibold mb-3">URL の取得方法</h3>
        <div className="space-y-3 mb-6">
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>1.</strong> GitHub でリポジトリのページを開く</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>2.</strong> 緑色の「Code」ボタンをクリック</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>3.</strong> 「HTTPS」タブの URL をコピー</p>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-sm">
            <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>Claude Code での使い方:</strong></span>
            {' '}「https://github.com/... をクローンして」と URL を伝えるだけでダウンロードしてくれます。
          </p>
        </div>
      </Section>

      <Section id="branch" title="ブランチとは" icon={<GitBranch className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4 text-lg">
          ブランチは<strong>「作業場所の枝分かれ」</strong>です。
          本流（main）を壊さずに、安全に新機能を開発できます。
        </p>

        <TermBox term="ブランチ（Branch）">
          「枝」という意味。本流（main ブランチ）とは別の場所で作業して、完成したら合流させます。
        </TermBox>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" /> なぜブランチを使うの?</p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>本番を壊さない</strong> - 作りかけのコードが本番に混ざらない</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>並行作業できる</strong> - 複数の機能を同時に開発できる</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>失敗しても大丈夫</strong> - うまくいかなければブランチを捨てればOK</span>
            </li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-3">ブランチのイメージ</h3>
        <div className="bg-muted/30 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-muted-foreground text-xs sm:text-sm font-mono whitespace-pre">
{`main ブランチ（本流）
●───●───●───●───────●───● ← 安定版
        \\           /
         ●───●───●─┘ ← feature/login（作業ブランチ）
          新機能を開発`}
          </pre>
        </div>

        <h3 className="text-lg font-semibold mb-3">基本のコマンド</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-sm font-medium mb-2">新しいブランチを作って移動</p>
            <CodeBlock>
{`git checkout -b feature/login-button`}
            </CodeBlock>
            <p className="text-xs text-muted-foreground mt-1">
              <code className="px-1 py-0.5 bg-muted rounded">-b</code> は「新しいブランチを作る」オプション
            </p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">ブランチを切り替える</p>
            <CodeBlock>
{`git checkout main          # main に戻る
git checkout feature/login  # 作業ブランチに移動`}
            </CodeBlock>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">今いるブランチを確認</p>
            <CodeBlock>
{`git branch`}
            </CodeBlock>
            <p className="text-xs text-muted-foreground mt-1">
              <code className="px-1 py-0.5 bg-muted rounded">*</code> がついているのが今いるブランチ
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3">ブランチの命名ルール</h3>
        <div className="space-y-2 mb-6 text-sm">
          <div className="p-3 bg-muted/30 rounded-lg">
            <code className="text-primary">feature/機能名</code>
            <span className="text-muted-foreground ml-2">→ 新機能の開発（例: feature/login-button）</span>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <code className="text-primary">fix/修正内容</code>
            <span className="text-muted-foreground ml-2">→ バグ修正（例: fix/header-layout）</span>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <code className="text-primary">docs/ドキュメント</code>
            <span className="text-muted-foreground ml-2">→ ドキュメント修正（例: docs/readme-update）</span>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="font-medium mb-2 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" /> Claude Code にお願いする場合</p>
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-muted/30 rounded-lg">
              <code className="text-primary">「ログイン機能用のブランチを作って」</code>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <code className="text-primary">「main ブランチに戻って」</code>
            </div>
          </div>
        </div>
      </Section>

      <Section id="pull-request" title="プルリクエスト" icon={<GitPullRequest className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          プルリクエスト（Pull Request、略して PR）は、<strong>「自分のブランチの変更を別のブランチに取り込んでもらう」</strong>お願いです。
          チーム開発では必須の機能です。
        </p>

        <TermBox term="プルリクエスト（Pull Request）">
          「私のブランチの変更を見てください、問題なければ取り込んでください」というお願い。
          略して PR（ピーアール）と呼ばれます。
        </TermBox>

        <h3 className="text-lg font-semibold mb-3">プルリクエストのイメージ</h3>
        <div className="bg-muted/30 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-muted-foreground text-xs sm:text-sm font-mono whitespace-pre">
{`feature/login ブランチ
●───●───●  「この変更を取り込んで!」
         \\
          \\  ← プルリクエスト（PR）
           \\
            ▼
●───●───●───● main ブランチ
            ↑
         マージ（取り込み）`}
          </pre>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" /> なぜプルリクエストを使うの?</p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>レビューできる</strong> - 他の人にコードをチェックしてもらえる</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>バグ防止</strong> - 取り込む前に問題を発見できる</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>履歴が残る</strong> - 「誰が何をしたか」が記録される</span>
            </li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-3">プルリクエストの流れ</h3>
        <div className="space-y-3 mb-6">
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>1.</strong> 作業用のブランチを作る</p>
            <CodeBlock>
{`git checkout -b feature/login-button`}
            </CodeBlock>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>2.</strong> コードを変更して、コミットする</p>
            <CodeBlock>
{`git add .
git commit -m "ログインボタンを追加"`}
            </CodeBlock>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>3.</strong> GitHub にプッシュする</p>
            <CodeBlock>
{`git push -u origin feature/login-button`}
            </CodeBlock>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>4.</strong> GitHub でプルリクエストを作成</p>
            <p className="text-xs text-muted-foreground mt-1">
              GitHub を開くと「Compare & pull request」ボタンが表示されるのでクリック
            </p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>5.</strong> レビューを受けて、承認されたらマージ</p>
            <p className="text-xs text-muted-foreground mt-1">
              マージ = ブランチの変更を main に取り込むこと
            </p>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>個人開発でも使おう:</strong> 1人で開発していても、プルリクエストを使うと「何をしたか」の記録が残って便利です。
            将来チーム開発するときの練習にもなります。
          </p>
        </div>
      </Section>

      <Section id="claude-code-github" title="Claude Code で GitHub を使う" icon={<Users className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          GitHub の操作も、Claude Code なら日本語で話しかけるだけ。
          面倒なコマンドを覚える必要はありません。
        </p>

        <h3 className="text-lg font-semibold mb-3">こう言えば OK</h3>
        <div className="space-y-3 mb-6">
          {[
            { prompt: 'GitHub にアップして', result: '→ push を実行' },
            { prompt: '最新版にして', result: '→ pull を実行' },
            { prompt: 'このプロジェクトを GitHub にアップして', result: '→ リポジトリ作成 + push' },
            { prompt: 'プルリクエストを作って', result: '→ ブランチ作成からPR作成まで' },
            { prompt: 'https://github.com/... をクローンして', result: '→ clone を実行' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <code className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                {item.prompt}
              </code>
              <span className="text-muted-foreground text-sm">{item.result}</span>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>要するに:</strong> GitHub の操作も Claude Code にお任せ!
            やりたいことを伝えれば、必要なコマンドを全部実行してくれます。
          </p>
        </div>
      </Section>

      <Section id="ask-claude" title="GitHub で困ったら聞こう" icon={<MessageCircle className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          GitHub でエラーが出たり、やり方がわからないときは、そのまま Claude Code に質問してください。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
          <p className="font-medium mb-3">こんな風に聞けます:</p>
          <div className="space-y-2 text-sm">
            {[
              '「git push したらエラーが出た。これ何?」+ エラーメッセージを貼り付け',
              '「プルリクエストの作り方を教えて」',
              '「他の人の変更と自分の変更がぶつかった」',
              '「GitHub でリポジトリを公開したい」',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-background rounded">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>大事なこと:</strong> 「こんな初歩的なこと聞いていいのかな...」と思わなくて大丈夫。
            Claude Code は何度でも丁寧に教えてくれます。わからないことは、どんどん聞きましょう!
          </p>
        </div>
      </Section>
    </GuideLayout>
  );
}
