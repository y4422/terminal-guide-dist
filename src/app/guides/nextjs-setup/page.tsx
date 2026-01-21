import { GuideLayout } from '@/components/layout/GuideLayout';
import { Terminal, FolderTree, Play, Rocket, Package, FileCode, ExternalLink } from 'lucide-react';
import { FaApple, FaWindows } from 'react-icons/fa';

const sections = [
  { id: 'what-is-nextjs', title: 'Next.js とは' },
  { id: 'prerequisites', title: '準備するもの' },
  { id: 'create-project', title: 'プロジェクトを作ろう' },
  { id: 'file-structure', title: 'ファイル構成を理解しよう' },
  { id: 'run-app', title: 'アプリを動かそう' },
  { id: 'next-steps', title: '次のステップ' },
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

function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 my-4">
      <p className="text-sm">{children}</p>
    </div>
  );
}

export default function NextjsSetupGuidePage() {
  return (
    <GuideLayout
      title="Next.js アプリを作ろう"
      description="Claude Code で Web アプリを始める方法"
      sections={sections}
      breadcrumb={[
        { label: 'ガイド', href: '/guides' },
        { label: 'Next.js アプリを作ろう' },
      ]}
    >
      <Section id="what-is-nextjs" title="Next.js とは" icon={<Rocket className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4 text-lg">
          Next.js（ネクストジェイエス）は、<strong>Web アプリを簡単に作れるフレームワーク</strong>です。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3">💡 わかりやすく言うと...</p>
          <p className="text-muted-foreground mb-4">
            料理に例えると、<strong>React が「食材」</strong>で、<strong>Next.js は「レシピ付きの料理キット」</strong>です。
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>面倒な下準備が不要（ゼロ設定で始められる）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>レシピ通りに作れば美味しくできる（ベストプラクティスが組み込み済み）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>プロの技が詰まっている（高速表示、SEO 対応など）</span>
            </li>
          </ul>
        </div>

        <TermBox term="フレームワーク（Framework）">
          アプリを作るための「枠組み」のこと。よく使う機能があらかじめ用意されていて、
          ゼロから全部作る必要がなくなります。
        </TermBox>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="font-medium mb-2">なぜ Next.js を選ぶの?</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>✅ 設定不要ですぐ始められる</li>
            <li>✅ ファイルを作るだけでページが増やせる</li>
            <li>✅ 表示が高速（自動で最適化）</li>
            <li>✅ 世界中で使われている人気フレームワーク</li>
          </ul>
        </div>
      </Section>

      <Section id="prerequisites" title="準備するもの（Node.js のインストール）" icon={<Package className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Next.js を使うには、まず <strong>Node.js</strong> をパソコンにインストールする必要があります。
        </p>

        <TermBox term="Node.js（ノードジェイエス）">
          JavaScript をパソコン上で動かすためのソフトウェア。
          Web アプリ開発には必須のツールです。
        </TermBox>

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
                  href="https://nodejs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Node.js 公式サイト
                  <ExternalLink className="h-3 w-3" />
                </a>
                {' '}にアクセス
              </li>
              <li><strong>「LTS」</strong>と書いてあるボタンをクリック（推奨版）</li>
              <li>ダウンロードしたファイルを開いてインストール</li>
            </ol>
          </div>

          <details className="group">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mb-2">
              <span>📖</span>
              <span>他の方法（Homebrew を使う場合）</span>
              <span className="ml-auto text-xs opacity-50 group-open:rotate-90 transition-transform">▶</span>
            </summary>
            <div className="pl-6 text-sm text-muted-foreground">
              <p className="mb-2">
                Homebrew（Mac のパッケージ管理ツール）がインストール済みなら、こちらでも OK です。
              </p>
              <CodeBlock title="Homebrew でインストール">
{`brew install node`}
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
                  href="https://nodejs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Node.js 公式サイト
                  <ExternalLink className="h-3 w-3" />
                </a>
                {' '}にアクセス
              </li>
              <li><strong>「LTS」</strong>と書いてあるボタンをクリック（推奨版）</li>
              <li>ダウンロードした .msi ファイルを開く</li>
              <li>「Next」を押していくだけでOK（設定はデフォルトで大丈夫）</li>
            </ol>
          </div>
        </div>

        {/* Confirm installation */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="font-medium mb-2">✅ インストールできたか確認</p>
          <p className="text-sm text-muted-foreground mb-2">
            ターミナル（Mac）または PowerShell（Windows）で以下を実行:
          </p>
          <CodeBlock title="確認コマンド">
{`node --version
npm --version`}
          </CodeBlock>
          <p className="text-sm text-muted-foreground">
            <code className="px-1 py-0.5 bg-muted rounded">v20.x.x</code> のように
            バージョンが表示されれば成功です!
          </p>
        </div>
      </Section>

      <Section id="create-project" title="プロジェクトを作ろう" icon={<Terminal className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Node.js がインストールできたら、Claude Code を使って Next.js プロジェクトを作りましょう。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3">Claude Code に頼む場合</p>
          <p className="text-muted-foreground mb-3">
            Claude Code に「Next.js のプロジェクトを作って」と伝えるだけで、
            自動でプロジェクトを作成してくれます。
          </p>
          <div className="p-4 bg-background rounded-lg border border-border/50">
            <code className="text-primary">「Next.js のプロジェクトを my-app という名前で作って」</code>
          </div>
        </div>

        <div className="border rounded-lg p-4 mb-6">
          <p className="font-medium mb-3">自分でコマンドを実行する場合</p>
          <p className="text-sm text-muted-foreground mb-3">
            以下のコマンドをターミナルで実行します:
          </p>
          <CodeBlock title="プロジェクト作成コマンド">
{`npx create-next-app@latest my-app`}
          </CodeBlock>
          <p className="text-sm text-muted-foreground">
            <code className="px-1 py-0.5 bg-muted rounded">my-app</code> の部分は好きな名前に変えてOKです。
          </p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
          <p className="font-bold text-amber-600 dark:text-amber-400 mb-2">📝 質問への回答例</p>
          <p className="text-sm text-muted-foreground mb-3">
            コマンド実行時にいくつか質問されます。初めての場合は以下のように答えるのがおすすめ:
          </p>
          <div className="text-sm font-mono bg-terminal-bg text-terminal-text p-3 rounded-lg space-y-1">
            <div><span className="text-green-400">?</span> Would you like to use TypeScript? <span className="text-primary">Yes</span></div>
            <div><span className="text-green-400">?</span> Would you like to use ESLint? <span className="text-primary">Yes</span></div>
            <div><span className="text-green-400">?</span> Would you like to use Tailwind CSS? <span className="text-primary">Yes</span></div>
            <div><span className="text-green-400">?</span> Would you like to use `src/` directory? <span className="text-primary">Yes</span></div>
            <div><span className="text-green-400">?</span> Would you like to use App Router? <span className="text-primary">Yes</span></div>
            <div><span className="text-green-400">?</span> Would you like to use Turbopack? <span className="text-primary">No</span></div>
            <div><span className="text-green-400">?</span> Would you like to customize the import alias? <span className="text-primary">No</span></div>
          </div>
        </div>

        <TipBox>
          <strong>💡 ヒント:</strong> Claude Code に頼めば、これらの設定も自動で選んでくれます。
          「TypeScript と Tailwind CSS を使った Next.js プロジェクトを作って」のように具体的に伝えると、
          希望通りの設定で作成してくれます。
        </TipBox>
      </Section>

      <Section id="file-structure" title="ファイル構成を理解しよう" icon={<FolderTree className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          プロジェクトが作成されると、いくつかのファイルとフォルダが自動で生成されます。
          最初は全部理解する必要はありません。<strong>重要なファイルだけ</strong>覚えましょう。
        </p>

        <div className="bg-muted/30 rounded-lg p-4 mb-6 font-mono text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">📁</span>
              <span>my-app/</span>
            </div>
            <div className="pl-6 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">📄</span>
                <span>package.json</span>
                <span className="text-muted-foreground ml-2">← プロジェクトの設定ファイル</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">📁</span>
                <span>src/</span>
              </div>
              <div className="pl-6 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">📁</span>
                  <span>app/</span>
                  <span className="text-muted-foreground ml-2">← ページを置く場所</span>
                </div>
                <div className="pl-6 space-y-1">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span>📄</span>
                    <span>page.tsx</span>
                    <span className="text-muted-foreground ml-2 font-normal">← トップページ（ここから編集!）</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📄</span>
                    <span>layout.tsx</span>
                    <span className="text-muted-foreground ml-2">← 共通レイアウト</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📄</span>
                    <span>globals.css</span>
                    <span className="text-muted-foreground ml-2">← 全体のスタイル</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">📁</span>
                <span>public/</span>
                <span className="text-muted-foreground ml-2">← 画像などを置く場所</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-4">
          <p className="font-medium mb-2">🎯 最初は page.tsx だけでOK!</p>
          <p className="text-sm text-muted-foreground">
            <code className="px-1 py-0.5 bg-muted rounded">src/app/page.tsx</code> がトップページです。
            ここを編集すれば、画面に表示される内容が変わります。他のファイルは必要になったら覚えましょう。
          </p>
        </div>

        <div className="space-y-3">
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-1">📄 package.json</p>
            <p className="text-sm text-muted-foreground">
              プロジェクトの「説明書」のようなファイル。使用するライブラリや、
              実行できるコマンド（npm run dev など）が書いてあります。
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-1">📁 src/app/</p>
            <p className="text-sm text-muted-foreground">
              ページを作る場所。フォルダを作ると、そのまま URL になります。
              例: <code className="px-1 py-0.5 bg-muted rounded">src/app/about/page.tsx</code> を作ると
              <code className="px-1 py-0.5 bg-muted rounded">/about</code> でアクセスできます。
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-1">📁 public/</p>
            <p className="text-sm text-muted-foreground">
              画像やアイコンなど、そのまま公開したいファイルを置く場所。
              ここに置いたファイルは URL から直接アクセスできます。
            </p>
          </div>
        </div>
      </Section>

      <Section id="run-app" title="アプリを動かそう" icon={<Play className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          プロジェクトが作成できたら、実際にアプリを動かしてみましょう!
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3">Step 1: プロジェクトフォルダに移動</p>
          <CodeBlock title="ターミナルで実行">
{`cd my-app`}
          </CodeBlock>
          <p className="text-sm text-muted-foreground">
            <code className="px-1 py-0.5 bg-muted rounded">my-app</code> はプロジェクト名に置き換えてください。
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3">Step 2: 開発サーバーを起動</p>
          <CodeBlock title="ターミナルで実行">
{`npm run dev`}
          </CodeBlock>
          <p className="text-sm text-muted-foreground">
            コマンドが成功すると、以下のような表示が出ます:
          </p>
          <div className="mt-3 text-sm font-mono bg-terminal-bg text-terminal-text p-3 rounded-lg">
            <div className="text-green-400">▲ Next.js 14.x.x</div>
            <div className="text-muted-foreground">- Local: http://localhost:3000</div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3">Step 3: ブラウザで確認</p>
          <p className="text-muted-foreground mb-3">
            ブラウザを開いて、以下の URL にアクセスします:
          </p>
          <div className="p-4 bg-background rounded-lg border border-border/50 text-center">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-lg font-mono inline-flex items-center gap-2"
            >
              http://localhost:3000
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-4">
          <p className="font-medium mb-2">🎉 成功!</p>
          <p className="text-sm text-muted-foreground">
            Next.js のウェルカムページが表示されれば、セットアップ完了です!
          </p>
        </div>

        <TermBox term="ホットリロード（Hot Reload）">
          ファイルを保存すると、ブラウザが自動で更新される機能。
          開発中はこの機能のおかげで、変更がすぐに確認できます。
        </TermBox>

        <div className="border rounded-lg p-4">
          <p className="font-medium mb-2">🛑 サーバーを停止するには</p>
          <p className="text-sm text-muted-foreground mb-2">
            ターミナルで <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Ctrl + C</kbd> を押すと、
            サーバーが停止します。
          </p>
        </div>
      </Section>

      <Section id="next-steps" title="次のステップ" icon={<FileCode className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          おめでとうございます! Next.js アプリが動くようになりました。
          ここからは、実際にコードを書いて機能を追加していきましょう。
        </p>

        <div className="space-y-4 mb-6">
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-2">1. page.tsx を編集してみよう</p>
            <p className="text-sm text-muted-foreground mb-3">
              <code className="px-1 py-0.5 bg-muted rounded">src/app/page.tsx</code> を開いて、
              中身を変更してみましょう。保存すると、ブラウザに即座に反映されます。
            </p>
            <div className="p-3 bg-background rounded border border-border/50">
              <code className="text-sm text-primary">「page.tsx の内容を『Hello World』に変えて」</code>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <p className="font-medium mb-2">2. 新しいページを追加してみよう</p>
            <p className="text-sm text-muted-foreground mb-3">
              <code className="px-1 py-0.5 bg-muted rounded">src/app/about/page.tsx</code> を作ると、
              <code className="px-1 py-0.5 bg-muted rounded">/about</code> でアクセスできるページが追加されます。
            </p>
            <div className="p-3 bg-background rounded border border-border/50">
              <code className="text-sm text-primary">「/about ページを作って、自己紹介を表示して」</code>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <p className="font-medium mb-2">3. コンポーネントを作ってみよう</p>
            <p className="text-sm text-muted-foreground mb-3">
              ボタンやカードなど、再利用できるパーツ（コンポーネント）を作ってみましょう。
            </p>
            <div className="p-3 bg-background rounded border border-border/50">
              <code className="text-sm text-primary">「青いボタンコンポーネントを作って」</code>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">💡 Claude Code を活用しよう</p>
          <p className="text-sm text-muted-foreground">
            やりたいことを日本語で Claude Code に伝えれば、コードを書いてくれます。
            「〇〇な機能を追加して」「△△のエラーを直して」など、気軽に相談してみましょう。
          </p>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="font-medium mb-3">📚 さらに学びたい方へ</p>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-primary" />
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Next.js 公式ドキュメント
              </a>
              <span className="text-xs text-muted-foreground">（英語）</span>
            </li>
            <li className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-primary" />
              <a
                href="https://nextjs.org/learn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Next.js チュートリアル
              </a>
              <span className="text-xs text-muted-foreground">（英語・インタラクティブ）</span>
            </li>
          </ul>
        </div>
      </Section>
    </GuideLayout>
  );
}
