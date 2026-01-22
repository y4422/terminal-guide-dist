import { GuideLayout } from '@/components/layout/GuideLayout';
import { Terminal, Code2, FolderOpen, Layout, Keyboard, Lightbulb, CheckCircle, BookOpen, ExternalLink, PanelBottom, Search, File, Save, Undo, Command, Download } from 'lucide-react';
import { FaApple, FaWindows } from 'react-icons/fa';

const sections = [
  { id: 'what-is-vscode', title: 'VS Code とは' },
  { id: 'install', title: 'インストール方法' },
  { id: 'basic-ui', title: '基本画面の見方' },
  { id: 'open-folder', title: 'フォルダを開く' },
  { id: 'terminal', title: 'ターミナルを使う' },
  { id: 'claude-code', title: 'Claude Code を使う' },
  { id: 'shortcuts', title: '便利なショートカット' },
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

function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 my-4">
      <p className="text-sm">{children}</p>
    </div>
  );
}

function ShortcutKey({ mac, windows }: { mac: string; windows: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="inline-flex items-center gap-1">
        <FaApple className="h-3 w-3" />
        <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">{mac}</kbd>
      </span>
      <span className="text-muted-foreground">/</span>
      <span className="inline-flex items-center gap-1">
        <FaWindows className="h-3 w-3" />
        <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">{windows}</kbd>
      </span>
    </div>
  );
}

export default function VscodeSetupGuidePage() {
  return (
    <GuideLayout
      title="VS Code の使い方"
      description="初心者向けエディタ入門ガイド"
      sections={sections}
      breadcrumb={[
        { label: 'ガイド', href: '/guides' },
        { label: 'VS Code の使い方' },
      ]}
    >
      <Section id="what-is-vscode" title="VS Code とは" icon={<Code2 className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4 text-lg">
          VS Code（Visual Studio Code）は、<strong>無料で使える高機能なコードエディタ</strong>です。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" /> わかりやすく言うと...</p>
          <p className="text-muted-foreground mb-4">
            <strong>「プログラマーのためのメモ帳」</strong>です。普通のメモ帳と違って:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>コードが色分けされて見やすい</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>入力補完で効率アップ</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>ターミナルが内蔵されている</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>ファイル管理が簡単</span>
            </li>
          </ul>
        </div>

        <TermBox term="コードエディタ">
          プログラムのコードを書くための専用アプリ。
          コードの色分け、入力補完、エラー表示などの機能があり、開発を効率的に進められます。
        </TermBox>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="font-medium mb-2">なぜ VS Code がおすすめ?</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> 完全無料で高機能</li>
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> 世界で最も使われているエディタ（シェア率 70% 以上）</li>
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> ターミナルが統合されている（Claude Code が使いやすい!）</li>
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> 初心者でも直感的に操作できる</li>
          </ul>
        </div>
      </Section>

      <Section id="install" title="インストール方法" icon={<Download className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          VS Code は公式サイトから無料でダウンロードできます。
        </p>

        {/* Mac */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaApple className="h-5 w-5" /> Mac の場合
          </h3>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <p className="font-medium mb-2">方法 1: 公式サイトからダウンロード（おすすめ）</p>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>
                <a
                  href="https://code.visualstudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  VS Code 公式サイト
                  <ExternalLink className="h-3 w-3" />
                </a>
                {' '}にアクセス
              </li>
              <li>「Download for Mac」ボタンをクリック</li>
              <li>ダウンロードした .zip ファイルを開く</li>
              <li>VS Code アプリを「アプリケーション」フォルダにドラッグ</li>
            </ol>
          </div>

          <details className="group">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4" />
              <span>他の方法（Homebrew を使う場合）</span>
              <span className="ml-auto text-xs opacity-50 group-open:rotate-90 transition-transform">▶</span>
            </summary>
            <div className="pl-6 text-sm text-muted-foreground">
              <p className="mb-2">
                Homebrew がインストール済みなら、コマンド 1 つでインストールできます。
              </p>
              <CodeBlock title="Homebrew でインストール">
{`brew install --cask visual-studio-code`}
              </CodeBlock>
            </div>
          </details>
        </div>

        {/* Windows */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaWindows className="h-5 w-5" /> Windows の場合
          </h3>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <p className="font-medium mb-2">公式サイトからダウンロード</p>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>
                <a
                  href="https://code.visualstudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  VS Code 公式サイト
                  <ExternalLink className="h-3 w-3" />
                </a>
                {' '}にアクセス
              </li>
              <li>「Download for Windows」ボタンをクリック</li>
              <li>ダウンロードしたインストーラー（.exe）を実行</li>
              <li>「次へ」を押していく（デフォルト設定でOK）</li>
            </ol>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <p className="font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span>重要: PATH への追加</span>
            </p>
            <p className="text-sm text-muted-foreground">
              インストール時に「PATH への追加」にチェックを入れておくと、
              ターミナルから <code className="px-1 py-0.5 bg-muted rounded">code</code> コマンドで VS Code を起動できるようになります。
            </p>
          </div>
        </div>

        {/* Confirm installation */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="font-medium mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> インストール完了!</p>
          <p className="text-sm text-muted-foreground">
            VS Code を起動して、ウェルカム画面が表示されればインストール成功です。
            次のセクションで基本的な画面の見方を説明します。
          </p>
        </div>
      </Section>

      <Section id="basic-ui" title="基本画面の見方" icon={<Layout className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          VS Code の画面は大きく 4 つのエリアに分かれています。
        </p>

        <div className="bg-muted/30 rounded-lg p-6 mb-6">
          <div className="border-2 border-dashed border-border rounded-lg overflow-hidden">
            {/* Header bar */}
            <div className="bg-muted/50 px-4 py-2 border-b border-border text-sm">
              メニューバー（ファイル、編集、表示...）
            </div>

            <div className="flex min-h-[300px]">
              {/* Sidebar */}
              <div className="w-48 bg-muted/30 border-r border-border p-3">
                <div className="text-sm font-medium mb-2 flex items-center gap-2">
                  <File className="h-4 w-4" />
                  サイドバー
                </div>
                <p className="text-xs text-muted-foreground">
                  ファイル一覧、検索、Git などを表示
                </p>
              </div>

              <div className="flex-1 flex flex-col">
                {/* Editor */}
                <div className="flex-1 p-4 border-b border-border">
                  <div className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Code2 className="h-4 w-4" />
                    エディタ（中央）
                  </div>
                  <p className="text-xs text-muted-foreground">
                    コードを書く場所。複数のファイルをタブで開ける
                  </p>
                </div>

                {/* Terminal */}
                <div className="h-24 bg-terminal-bg text-terminal-text p-3">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <Terminal className="h-4 w-4" />
                    ターミナル（下）
                  </div>
                  <p className="text-xs opacity-70">
                    コマンドを実行する場所
                  </p>
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="bg-primary/80 text-primary-foreground px-4 py-1 text-xs">
              ステータスバー（現在の状態を表示）
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-1 flex items-center gap-2">
              <Layout className="h-4 w-4 text-blue-500" /> サイドバー（左）
            </p>
            <p className="text-sm text-muted-foreground">
              ファイルエクスプローラー、検索、Git、拡張機能などのアイコンが並んでいます。
              アイコンをクリックすると、それぞれの機能が表示されます。
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="font-medium mb-1 flex items-center gap-2">
              <Code2 className="h-4 w-4 text-green-500" /> エディタ（中央）
            </p>
            <p className="text-sm text-muted-foreground">
              コードを編集するメインの場所。上部にタブがあり、複数のファイルを開いて切り替えられます。
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="font-medium mb-1 flex items-center gap-2">
              <PanelBottom className="h-4 w-4 text-orange-500" /> ターミナル（下）
            </p>
            <p className="text-sm text-muted-foreground">
              コマンドを実行する場所。ここで Claude Code を起動したり、
              <code className="px-1 py-0.5 bg-muted rounded">npm</code> コマンドを実行できます。
            </p>
          </div>
        </div>

        <TipBox>
          <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>ヒント:</strong></span>
          最初は「サイドバー」と「ターミナル」だけ覚えれば OK です。
          他の機能は必要になったら覚えていきましょう。
        </TipBox>
      </Section>

      <Section id="open-folder" title="フォルダを開く" icon={<FolderOpen className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          VS Code では<strong>フォルダ単位</strong>で作業します。
          プロジェクトのフォルダを開いて、ファイルを編集しましょう。
        </p>

        <TermBox term="ワークスペース">
          VS Code で開いているフォルダのこと。
          フォルダを開くと、その中のファイルがすべてサイドバーに表示されます。
        </TermBox>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3">フォルダを開く方法</p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0">1</div>
              <div>
                <p className="font-medium">メニューから開く</p>
                <p className="text-sm text-muted-foreground">
                  「ファイル」→「フォルダを開く」（または「Open Folder」）
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0">2</div>
              <div>
                <p className="font-medium">ドラッグ＆ドロップ</p>
                <p className="text-sm text-muted-foreground">
                  フォルダを VS Code のウィンドウにドラッグするだけでも開けます
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0">3</div>
              <div>
                <p className="font-medium">ターミナルから開く</p>
                <p className="text-sm text-muted-foreground">
                  ターミナルで <code className="px-1 py-0.5 bg-muted rounded">code .</code> と入力すると、現在のフォルダが VS Code で開きます
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="font-medium mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> フォルダを開いたら</p>
          <p className="text-sm text-muted-foreground">
            サイドバーにフォルダ内のファイルが一覧表示されます。
            ファイルをクリックすると、エディタで開いて編集できます。
          </p>
        </div>
      </Section>

      <Section id="terminal" title="ターミナルを使う" icon={<Terminal className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          VS Code には<strong>ターミナルが内蔵</strong>されています。
          別のアプリを開かなくても、そのままコマンドを実行できます。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3">ターミナルを開く方法</p>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-background">
              <p className="font-medium mb-2">方法 1: ショートカットキー（おすすめ）</p>
              <ShortcutKey mac="Ctrl + `" windows="Ctrl + `" />
              <p className="text-xs text-muted-foreground mt-2">
                ※ <kbd className="px-1 py-0.5 bg-muted rounded text-xs">`</kbd> はバッククォート（数字の 1 の左隣のキー）
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-background">
              <p className="font-medium mb-2">方法 2: メニューから</p>
              <p className="text-sm text-muted-foreground">
                「表示」→「ターミナル」（または「View」→「Terminal」）
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-2">ターミナルの種類</p>
            <p className="text-sm text-muted-foreground mb-2">
              使っている OS によって、デフォルトのターミナルが異なります:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <FaApple className="h-4 w-4" />
                <span>Mac: zsh または bash</span>
              </li>
              <li className="flex items-center gap-2">
                <FaWindows className="h-4 w-4" />
                <span>Windows: PowerShell または コマンドプロンプト</span>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <p className="font-medium mb-2">複数のターミナルを開く</p>
            <p className="text-sm text-muted-foreground">
              ターミナルパネル右上の <code className="px-1 py-0.5 bg-muted rounded">+</code> ボタンで
              新しいターミナルを追加できます。
              開発サーバーを動かしながら、別のコマンドを実行したいときに便利です。
            </p>
          </div>
        </div>

        <TipBox>
          <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>よく使う操作:</strong></span>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>• ターミナルをクリア: <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Cmd+K</kbd>（Mac）/ <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+K</kbd>（Windows）</li>
            <li>• 前のコマンドを呼び出す: <kbd className="px-1 py-0.5 bg-muted rounded text-xs">↑</kbd> キー</li>
            <li>• 実行中のコマンドを止める: <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+C</kbd></li>
          </ul>
        </TipBox>
      </Section>

      <Section id="claude-code" title="Claude Code を使う" icon={<Terminal className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          VS Code のターミナルで Claude Code を起動すると、
          <strong>ファイルの編集結果をリアルタイムで確認</strong>できます。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3">VS Code + Claude Code の使い方</p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0">1</div>
              <div>
                <p className="font-medium">プロジェクトフォルダを VS Code で開く</p>
                <p className="text-sm text-muted-foreground">
                  作業したいフォルダを VS Code で開きます
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0">2</div>
              <div>
                <p className="font-medium">ターミナルを開く</p>
                <p className="text-sm text-muted-foreground">
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl + `</kbd> でターミナルを表示
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0">3</div>
              <div>
                <p className="font-medium">Claude Code を起動</p>
                <CodeBlock title="ターミナルで実行">
{`claude`}
                </CodeBlock>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0">4</div>
              <div>
                <p className="font-medium">対話を始める</p>
                <p className="text-sm text-muted-foreground">
                  Claude Code が起動したら、そのまま日本語で指示を出せます
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" /> VS Code を使う最大のメリット</p>
          <p className="text-sm text-muted-foreground">
            Claude Code がファイルを編集すると、VS Code のエディタに<strong>即座に反映</strong>されます。
            「どこが変わったか」が一目でわかるので、安心して作業を進められます。
          </p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <p className="font-medium mb-3">便利なワークフロー例</p>
          <div className="space-y-3 text-sm">
            {[
              { prompt: '「新しいファイルを作って」', result: '→ サイドバーに新しいファイルが追加される' },
              { prompt: '「このエラーを直して」', result: '→ エディタで変更箇所がハイライトされる' },
              { prompt: '「テストを実行して」', result: '→ ターミナルで結果が表示される' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                <code className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                  {item.prompt}
                </code>
                <span className="text-muted-foreground text-xs">{item.result}</span>
              </div>
            ))}
          </div>
        </div>

        <TipBox>
          <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>ヒント:</strong></span>
          VS Code でファイルを開いておくと、Claude Code に「このファイルを修正して」と指示するとき、
          変更前と変更後を比較しやすくなります。
        </TipBox>
      </Section>

      <Section id="shortcuts" title="便利なショートカット" icon={<Keyboard className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          覚えておくと作業効率がアップするショートカットキーを紹介します。
          最初は<strong>上の 3 つだけ</strong>覚えれば十分です!
        </p>

        <div className="space-y-4 mb-6">
          {/* Essential shortcuts */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="font-medium mb-3 text-primary">まずはこの 3 つ!</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <Save className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">保存</p>
                    <p className="text-xs text-muted-foreground">ファイルを保存する</p>
                  </div>
                </div>
                <ShortcutKey mac="Cmd + S" windows="Ctrl + S" />
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <Undo className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">元に戻す</p>
                    <p className="text-xs text-muted-foreground">直前の操作を取り消す</p>
                  </div>
                </div>
                <ShortcutKey mac="Cmd + Z" windows="Ctrl + Z" />
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <Terminal className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">ターミナルを開く/閉じる</p>
                    <p className="text-xs text-muted-foreground">ターミナルパネルの表示切り替え</p>
                  </div>
                </div>
                <ShortcutKey mac="Ctrl + `" windows="Ctrl + `" />
              </div>
            </div>
          </div>

          {/* More shortcuts */}
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-3">慣れてきたら</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">ファイル検索</p>
                    <p className="text-xs text-muted-foreground">ファイル名で検索して開く</p>
                  </div>
                </div>
                <ShortcutKey mac="Cmd + P" windows="Ctrl + P" />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">全体検索</p>
                    <p className="text-xs text-muted-foreground">プロジェクト内のテキストを検索</p>
                  </div>
                </div>
                <ShortcutKey mac="Cmd + Shift + F" windows="Ctrl + Shift + F" />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Command className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">コマンドパレット</p>
                    <p className="text-xs text-muted-foreground">VS Code の全機能にアクセス</p>
                  </div>
                </div>
                <ShortcutKey mac="Cmd + Shift + P" windows="Ctrl + Shift + P" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="font-medium mb-2">ショートカットを覚えるコツ</p>
          <p className="text-sm text-muted-foreground">
            一度に全部覚える必要はありません。
            「保存」と「元に戻す」だけでも、作業がグッと楽になります。
            他のショートカットは、必要になったときに少しずつ覚えていきましょう。
          </p>
        </div>
      </Section>
    </GuideLayout>
  );
}
