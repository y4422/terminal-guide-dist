import { GuideLayout } from '@/components/layout/GuideLayout';
import { Terminal, GitBranch, Upload, Download, FolderPlus, Save, History, Users, Package } from 'lucide-react';

const sections = [
  { id: 'what-is-git', title: 'Git とは' },
  { id: 'install', title: 'インストール方法' },
  { id: 'why-git', title: 'なぜ Git を使うの?' },
  { id: 'basic-flow', title: '基本の流れ' },
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

function TermBox({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 my-4">
      <p className="font-bold text-amber-600 dark:text-amber-400 mb-1">📖 用語: {term}</p>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function WhenToUse({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 my-4">
      <p className="font-bold text-blue-600 dark:text-blue-400 mb-1">🕐 いつ使う?</p>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

export default function GitGuidePage() {
  return (
    <GuideLayout
      title="Git の使い方"
      description="はじめてでもわかるバージョン管理入門"
      sections={sections}
      breadcrumb={[
        { label: 'ガイド' },
        { label: 'Git の使い方' },
      ]}
    >
      <Section id="what-is-git" title="Git とは" icon={<GitBranch className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4 text-lg">
          Git（ギット）は、<strong>ファイルの変更履歴を記録するツール</strong>です。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3">💡 わかりやすく言うと...</p>
          <p className="text-muted-foreground mb-4">
            ゲームの<strong>「セーブポイント」</strong>のようなものです。
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>好きなタイミングで「セーブ」できる</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>失敗したら過去のセーブに戻れる</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>「いつ、何を変えたか」の記録が残る</span>
            </li>
          </ul>
        </div>

        <TermBox term="リポジトリ（Repository）">
          Git で管理されているフォルダのこと。「プロジェクトの保管庫」と思ってください。
          普通のフォルダに Git の機能を追加したものです。
        </TermBox>
      </Section>

      <Section id="install" title="Git のインストール方法" icon={<Package className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Git を使う前に、まずパソコンにインストールする必要があります。
          お使いの OS に合わせて進めてください。
        </p>

        {/* Mac */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span>🍎</span> Mac の場合
          </h3>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <p className="font-medium mb-2">方法 1: 一番カンタン（おすすめ）</p>
            <p className="text-sm text-muted-foreground mb-3">
              ターミナルを開いて、以下を入力するだけ。まだ Git が入っていなければ、
              インストールするか聞かれるので「インストール」をクリック。
            </p>
            <CodeBlock title="ターミナルで実行">
{`git --version`}
            </CodeBlock>
            <p className="text-xs text-muted-foreground">
              または <code className="px-1 py-0.5 bg-muted rounded">xcode-select --install</code> でも OK
            </p>
          </div>

          <details className="group">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mb-2">
              <span>📖</span>
              <span>他の方法（Homebrew を使う場合）</span>
              <span className="ml-auto text-xs opacity-50 group-open:rotate-90 transition-transform">▶</span>
            </summary>
            <div className="pl-6 text-sm text-muted-foreground">
              <p className="mb-2">
                Homebrew（Mac のパッケージ管理ツール）を使うと、より新しいバージョンの Git をインストールできます。
              </p>
              <CodeBlock title="Homebrew でインストール">
{`brew install git`}
              </CodeBlock>
            </div>
          </details>
        </div>

        {/* Windows */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span>🪟</span> Windows の場合
          </h3>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <p className="font-medium mb-2">方法 1: 公式サイトからダウンロード（おすすめ）</p>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>
                <a
                  href="https://git-scm.com/download/win"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Git 公式サイト
                </a>
                {' '}にアクセス（自動でダウンロード開始）
              </li>
              <li>ダウンロードしたファイルを開く</li>
              <li>「Next」を押していくだけでOK（設定はデフォルトで大丈夫）</li>
            </ol>
          </div>

          <details className="group">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mb-2">
              <span>📖</span>
              <span>他の方法（winget を使う場合）</span>
              <span className="ml-auto text-xs opacity-50 group-open:rotate-90 transition-transform">▶</span>
            </summary>
            <div className="pl-6 text-sm text-muted-foreground">
              <p className="mb-2">
                PowerShell からコマンドでインストールすることもできます。
              </p>
              <CodeBlock title="PowerShell で実行">
{`winget install --id Git.Git -e --source winget`}
              </CodeBlock>
            </div>
          </details>
        </div>

        {/* Confirm installation */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-4">
          <p className="font-medium mb-2">✅ インストールできたか確認</p>
          <p className="text-sm text-muted-foreground mb-2">
            ターミナル（Mac）または PowerShell（Windows）で以下を実行:
          </p>
          <CodeBlock title="確認コマンド">
{`git --version`}
          </CodeBlock>
          <p className="text-sm text-muted-foreground">
            <code className="px-1 py-0.5 bg-muted rounded">git version 2.xx.x</code> のように
            バージョンが表示されれば成功です!
          </p>
        </div>

        {/* Initial setup */}
        <div className="border rounded-lg p-4">
          <p className="font-medium mb-2">🔧 初期設定（名前とメールアドレス）</p>
          <p className="text-sm text-muted-foreground mb-3">
            Git を使う前に、あなたの名前とメールアドレスを設定します。
            これは「誰が変更したか」を記録するためです。
          </p>
          <CodeBlock title="初期設定コマンド">
{`git config --global user.name "あなたの名前"
git config --global user.email "your@email.com"`}
          </CodeBlock>
          <p className="text-xs text-muted-foreground">
            💡 GitHub アカウントを持っている場合は、同じメールアドレスを使うのがおすすめです
          </p>
        </div>
      </Section>

      <Section id="why-git" title="なぜ Git を使うの?" icon={<History className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          「ファイルを保存するだけじゃダメなの?」と思うかもしれません。Git を使うと、こんな困りごとを解決できます。
        </p>

        <div className="space-y-4 mb-6">
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-2">😱 困りごと 1: 「さっきまで動いてたのに...」</p>
            <p className="text-sm text-muted-foreground mb-2">
              コードを変更したら動かなくなった。でも何を変えたか覚えてない...
            </p>
            <p className="text-sm text-primary">
              → Git なら「動いてた時点」に一瞬で戻れます
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="font-medium mb-2">😱 困りごと 2: 「最終版_本当の最終版_これが最終.docx」</p>
            <p className="text-sm text-muted-foreground mb-2">
              バージョン管理のためにファイル名を変えまくって、どれが最新かわからない...
            </p>
            <p className="text-sm text-primary">
              → Git なら1つのファイルで全履歴を管理できます
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="font-medium mb-2">😱 困りごと 3: 「誰かが上書きしちゃった」</p>
            <p className="text-sm text-muted-foreground mb-2">
              チームで作業中、他の人の変更と自分の変更がぶつかった...
            </p>
            <p className="text-sm text-primary">
              → Git なら変更を安全に合体（マージ）できます
            </p>
          </div>
        </div>
      </Section>

      <Section id="basic-flow" title="基本の流れ" icon={<Save className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Git の基本的な使い方は、たった3ステップです。
        </p>

        <div className="relative">
          {/* Flow diagram */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">1️⃣</div>
              <p className="font-bold mb-1">変更を選ぶ</p>
              <code className="text-xs bg-terminal-bg text-terminal-text px-2 py-1 rounded">git add</code>
              <p className="text-xs text-muted-foreground mt-2">
                「これをセーブに含める」と選択
              </p>
            </div>
            <div className="hidden md:flex items-center text-2xl text-muted-foreground">→</div>
            <div className="flex-1 bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">2️⃣</div>
              <p className="font-bold mb-1">セーブする</p>
              <code className="text-xs bg-terminal-bg text-terminal-text px-2 py-1 rounded">git commit</code>
              <p className="text-xs text-muted-foreground mt-2">
                メモ付きで履歴に保存
              </p>
            </div>
            <div className="hidden md:flex items-center text-2xl text-muted-foreground">→</div>
            <div className="flex-1 bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">3️⃣</div>
              <p className="font-bold mb-1">共有する</p>
              <code className="text-xs bg-terminal-bg text-terminal-text px-2 py-1 rounded">git push</code>
              <p className="text-xs text-muted-foreground mt-2">
                GitHub にアップロード
              </p>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>ポイント:</strong> 1人で作業するなら ①② だけでOK。
            チームで共有したり、バックアップを取りたいときに ③ を使います。
          </p>
        </div>
      </Section>

      <Section id="git-init" title="git init - Git を始める準備" icon={<FolderPlus className="h-6 w-6 text-primary" />}>
        <WhenToUse>
          新しいプロジェクトを作ったとき、最初に1回だけ実行します。
          「このフォルダで Git を使うぞ!」という宣言です。
        </WhenToUse>

        <CodeBlock title="コマンド">
{`# プロジェクトフォルダに移動して...
cd my-project

# Git を開始!
git init`}
        </CodeBlock>

        <p className="text-sm text-muted-foreground mb-4">
          実行すると、フォルダ内に <code className="px-1 py-0.5 bg-muted rounded">.git</code> という
          隠しフォルダが作られます。ここに履歴が保存されていきます。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>💡 ヒント:</strong> GitHub からダウンロード（clone）した場合は、
            すでに Git が設定されているので <code className="px-1 py-0.5 bg-muted rounded">git init</code> は不要です。
          </p>
        </div>
      </Section>

      <Section id="git-add" title="git add - 変更をセーブ対象に選ぶ" icon={<Terminal className="h-6 w-6 text-primary" />}>
        <WhenToUse>
          ファイルを変更した後、「この変更をセーブしたい」と思ったときに使います。
        </WhenToUse>

        <TermBox term="ステージング（Staging）">
          セーブ（コミット）する前の「準備エリア」のこと。
          買い物でいうと「カゴに入れた状態」です。まだ購入（コミット）はしていません。
        </TermBox>

        <p className="text-muted-foreground mb-4">
          なぜ「選ぶ」ステップがあるの? → 全部じゃなく、
          <strong>関連する変更だけをまとめてセーブ</strong>できるからです。
        </p>

        <CodeBlock title="コマンド">
{`# 特定のファイルだけ選ぶ
git add index.html

# 全部まとめて選ぶ（よく使う!）
git add .`}
        </CodeBlock>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>💡 よく使うパターン:</strong> とりあえず全部セーブしたいときは
            <code className="px-1 py-0.5 bg-muted rounded mx-1">git add .</code>
            （ドット = 全部）を使えばOK!
          </p>
        </div>
      </Section>

      <Section id="git-commit" title="git commit - セーブを確定する" icon={<Save className="h-6 w-6 text-primary" />}>
        <WhenToUse>
          git add で選んだ変更を、履歴として保存したいときに使います。
          「ここでセーブ!」というタイミングです。
        </WhenToUse>

        <TermBox term="コミット（Commit）">
          変更を履歴として記録すること。ゲームでいう「セーブ」です。
          「いつ、誰が、何を変えたか」がメモと一緒に記録されます。
        </TermBox>

        <CodeBlock title="コマンド">
{`# メッセージ付きでセーブ
git commit -m "ログインボタンを追加"`}
        </CodeBlock>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
          <p className="text-sm mb-2"><strong>良いメッセージの書き方:</strong></p>
          <p className="text-sm text-muted-foreground mb-2">
            「何をしたか」が後から分かるように書きましょう。
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>✅ 「ログイン機能を追加」「バグ修正: 画像が表示されない問題」</li>
            <li>❌ 「修正」「更新」「あああ」（後で何のことかわからない）</li>
          </ul>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>💡 セーブのタイミング:</strong> 「1つの作業が終わったら」が目安。
            細かすぎても大きすぎても後で困るので、「ログイン機能を追加」「バグを修正」くらいの単位がおすすめです。
          </p>
        </div>
      </Section>

      <Section id="git-push" title="git push - GitHub にアップロード" icon={<Upload className="h-6 w-6 text-primary" />}>
        <WhenToUse>
          手元の変更を GitHub（インターネット上）にアップロードしたいときに使います。
          バックアップや、チームとの共有に使います。
        </WhenToUse>

        <TermBox term="リモート / ローカル">
          <strong>ローカル</strong> = あなたのパソコン内。
          <strong>リモート</strong> = インターネット上（GitHub など）。
          push は「ローカル → リモート」にアップロードすることです。
        </TermBox>

        <CodeBlock title="コマンド">
{`# GitHub にアップロード
git push`}
        </CodeBlock>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <p className="text-sm">
            <strong>⚠️ 注意:</strong> 初めて push するときは、先に GitHub でリポジトリを作成し、
            接続設定が必要です。Claude Code に「GitHub にプッシュしたい」と伝えれば、
            設定方法を教えてもらえます。
          </p>
        </div>
      </Section>

      <Section id="git-pull" title="git pull - 最新版をダウンロード" icon={<Download className="h-6 w-6 text-primary" />}>
        <WhenToUse>
          GitHub にある最新の変更を、手元のパソコンに取り込みたいときに使います。
          チームで作業しているとき、他の人の変更を取得するのに使います。
        </WhenToUse>

        <TermBox term="プル / マージ">
          <strong>プル（Pull）</strong> = リモートから変更をダウンロードすること。
          <strong>マージ（Merge）</strong> = 複数の変更を1つに合体させること。
          git pull は「ダウンロード + 合体」を一度にやってくれます。
        </TermBox>

        <CodeBlock title="コマンド">
{`# 最新版を取得
git pull`}
        </CodeBlock>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>💡 習慣にしよう:</strong> チームで作業するときは、
            作業を始める前に <code className="px-1 py-0.5 bg-muted rounded">git pull</code> して
            最新の状態にしておくと、トラブルを防げます。
          </p>
        </div>
      </Section>

      <Section id="claude-code" title="Claude Code での Git 活用" icon={<Users className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          <strong>朗報です!</strong> Claude Code を使えば、Git コマンドを覚えなくても大丈夫。
          日本語で話しかけるだけで、Git の操作ができます。
        </p>

        <h3 className="text-lg font-semibold mb-3">こう言えば OK</h3>
        <div className="space-y-3">
          {[
            { prompt: '変更をセーブして', result: '→ add + commit を実行' },
            { prompt: 'GitHub にアップして', result: '→ push を実行' },
            { prompt: '最新版にして', result: '→ pull を実行' },
            { prompt: '何を変更したか見せて', result: '→ 変更内容を表示' },
            { prompt: '昨日の状態に戻して', result: '→ 履歴から復元' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <code className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                {item.prompt}
              </code>
              <span className="text-muted-foreground text-sm">{item.result}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-sm">
            <strong>要するに:</strong> Git のコマンドを覚える必要はありません。
            やりたいことを日本語で伝えれば、Claude Code がやってくれます!
          </p>
        </div>
      </Section>

      <Section id="ask-claude" title="Git で困ったら Claude Code に聞こう" icon={<Terminal className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Git でエラーが出たり、やり方がわからないときは、そのまま Claude Code に質問してください。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
          <p className="font-medium mb-3">こんな風に聞けます:</p>
          <div className="space-y-2 text-sm">
            {[
              '「git push したらエラーが出た。これ何?」+ エラーメッセージを貼り付け',
              '「さっきの変更を取り消したい」',
              '「他の人の変更と自分の変更がぶつかった」',
              '「Git って何のためにあるの?」',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-background rounded">
                <span className="text-primary">💬</span>
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
