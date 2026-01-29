import { GuideLayout } from '@/components/layout/GuideLayout';
import { Key, Shield, FileCode, Lightbulb, AlertTriangle, BookOpen, FolderOpen, CheckCircle, Lock, Eye, EyeOff, Server, Monitor, HelpCircle } from 'lucide-react';

const sections = [
  { id: 'what-is-env', title: '環境変数とは' },
  { id: 'env-in-nextjs', title: 'Next.js での使い方' },
  { id: 'public-vs-private', title: '公開・非公開の違い' },
  { id: 'security', title: 'セキュリティ' },
  { id: 'env-files', title: '環境ごとのファイル' },
  { id: 'claude-code-tips', title: 'Claude Code での扱い方' },
  { id: 'common-patterns', title: 'よくある例' },
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

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 my-4">
      <p className="font-bold text-red-600 dark:text-red-400 mb-1 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <span>注意</span>
      </p>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

export default function EnvVariablesGuidePage() {
  return (
    <GuideLayout
      title="環境変数を理解しよう"
      description="API キーやパスワードを安全に管理する方法"
      sections={sections}
      breadcrumb={[
        { label: 'ガイド', href: '/guides' },
        { label: '環境変数を理解しよう' },
      ]}
    >
      <Section id="what-is-env" title="環境変数とは" icon={<Key className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4 text-lg">
          環境変数は、<strong>アプリに渡す設定情報</strong>のことです。
          特にパスワードや API キーなど、<strong>コードに直接書きたくない情報</strong>を安全に管理できます。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" /> わかりやすく言うと...</p>
          <p className="text-muted-foreground mb-4">
            銀行の例で考えてみましょう。
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>暗証番号</strong>を紙に書いてキャッシュカードに貼る人はいませんよね</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>暗証番号は<strong>自分の頭の中</strong>（環境変数）に入れておきます</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>必要なときだけ<strong>ATM に入力</strong>（アプリに渡す）します</span>
            </li>
          </ul>
        </div>

        <TermBox term="環境変数（Environment Variable）">
          アプリケーションの外部から渡す設定値。コードを変更せずに、
          環境（開発・本番など）ごとに異なる値を使えます。
        </TermBox>

        <TermBox term="API キー（API Key）">
          外部サービス（OpenAI、Stripe など）を使うための「パスワード」のようなもの。
          サービスごとに発行され、誰がアクセスしているかを識別するために使われます。
          漏洩すると不正利用される可能性があるため、環境変数で安全に管理します。
        </TermBox>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="font-medium mb-2">環境変数を使うメリット</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> 秘密情報をコードに書かなくて済む</li>
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> 開発用と本番用で異なる設定を使える</li>
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> 設定変更時にコードを変えなくて済む</li>
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> チームメンバーごとに異なる設定を使える</li>
          </ul>
        </div>
      </Section>

      <Section id="env-in-nextjs" title="Next.js での使い方" icon={<FileCode className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Next.js では <code className="px-1 py-0.5 bg-muted rounded">.env.local</code> ファイルに環境変数を書きます。
        </p>

        <h3 className="text-lg font-semibold mb-3">Step 1: .env.local ファイルを作成</h3>
        <p className="text-sm text-muted-foreground mb-3">
          プロジェクトのルート（一番上のフォルダ）に <code className="px-1 py-0.5 bg-muted rounded">.env.local</code> ファイルを作ります。
        </p>
        <CodeBlock title=".env.local">
{`# データベースの接続情報
DATABASE_URL="postgresql://user:password@host/db"

# 外部サービスの API キー
OPENAI_API_KEY="sk-xxxxxxxxxxxxx"

# アプリの設定
APP_SECRET="my-super-secret-key"`}
        </CodeBlock>

        <TipBox>
          <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>ヒント:</strong></span>
          ファイル名が <code className="px-1 py-0.5 bg-muted rounded">.</code> で始まるのは「隠しファイル」という意味です。
          Finder や Explorer では表示されないことがあります。VS Code では見えます。
        </TipBox>

        <h3 className="text-lg font-semibold mb-3 mt-6">Step 2: コードから読み込む</h3>
        <p className="text-sm text-muted-foreground mb-3">
          環境変数は <code className="px-1 py-0.5 bg-muted rounded">process.env.変数名</code> で読み込めます。
        </p>
        <CodeBlock title="app/api/example/route.ts">
{`// サーバー側のコード（API Route など）
const apiKey = process.env.OPENAI_API_KEY;
const dbUrl = process.env.DATABASE_URL;

// これで API キーやデータベース接続情報を使える
console.log('API Key exists:', !!apiKey);`}
        </CodeBlock>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
          <p className="text-sm">
            <strong>ポイント:</strong> <code className="px-1 py-0.5 bg-muted rounded">process.env</code> から読んだ値は
            常に<strong>文字列</strong>です。数値として使いたい場合は <code className="px-1 py-0.5 bg-muted rounded">Number()</code> で変換します。
          </p>
        </div>
      </Section>

      <Section id="public-vs-private" title="公開・非公開の違い" icon={<Eye className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Next.js では環境変数に<strong>2種類</strong>あります。
          この違いを理解することは<strong>セキュリティ上とても重要</strong>です。
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <p className="font-medium mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-green-500" />
              非公開（サーバーのみ）
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              <code className="px-1 py-0.5 bg-muted rounded">NEXT_PUBLIC_</code> が<strong>ついていない</strong>変数
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• サーバー側のコードでのみ使える</li>
              <li>• ブラウザには送られない（安全）</li>
              <li>• API キー、DB 接続情報など</li>
            </ul>
          </div>
          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
            <p className="font-medium mb-2 flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-amber-500" />
              公開（ブラウザでも使える）
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              <code className="px-1 py-0.5 bg-muted rounded">NEXT_PUBLIC_</code> が<strong>ついている</strong>変数
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• ブラウザ（クライアント）でも使える</li>
              <li>• ユーザーが見ることができる</li>
              <li>• サイト URL、GA ID など</li>
            </ul>
          </div>
        </div>

        <CodeBlock title=".env.local の例">
{`# 非公開（サーバーのみ）- 秘密の情報
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
STRIPE_SECRET_KEY="sk_live_..."

# 公開（ブラウザでも使える）- 見られても OK な情報
NEXT_PUBLIC_SITE_URL="https://example.com"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"`}
        </CodeBlock>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2 flex items-center gap-2">
              <Server className="h-4 w-4" />
              サーバー側のコード
            </p>
            <p className="text-xs text-muted-foreground mb-2">API Routes、Server Components など</p>
            <CodeBlock>
{`// すべての環境変数を使える
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.OPENAI_API_KEY;`}
            </CodeBlock>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2 flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              クライアント側のコード
            </p>
            <p className="text-xs text-muted-foreground mb-2">ブラウザで動く Client Components</p>
            <CodeBlock>
{`// NEXT_PUBLIC_ のみ使える
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// これは undefined になる
const apiKey = process.env.OPENAI_API_KEY;`}
            </CodeBlock>
          </div>
        </div>

        <WarningBox>
          <code className="px-1 py-0.5 bg-muted rounded">NEXT_PUBLIC_</code> をつけた環境変数は
          <strong>ユーザーに見られる可能性があります</strong>。
          API キーやパスワードには<strong>絶対につけないで</strong>ください。
        </WarningBox>
      </Section>

      <Section id="security" title="セキュリティ" icon={<Shield className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          環境変数を安全に管理するためのルールを覚えましょう。
        </p>

        <h3 className="text-lg font-semibold mb-3">.gitignore に追加する</h3>
        <p className="text-sm text-muted-foreground mb-3">
          <code className="px-1 py-0.5 bg-muted rounded">.env.local</code> は<strong>絶対に Git にコミットしない</strong>でください。
          GitHub に公開すると、世界中の人に秘密情報が見えてしまいます。
        </p>
        <CodeBlock title=".gitignore">
{`# 環境変数ファイル（これは必須!）
.env
.env.local
.env.*.local`}
        </CodeBlock>

        <TipBox>
          <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>ヒント:</strong></span>
          Next.js でプロジェクトを作ると、<code className="px-1 py-0.5 bg-muted rounded">.gitignore</code> に
          最初から <code className="px-1 py-0.5 bg-muted rounded">.env*.local</code> が書いてあります。
          自分で追加したファイル名が含まれているか確認しましょう。
        </TipBox>

        <h3 className="text-lg font-semibold mb-3 mt-6">漏洩してしまった場合</h3>
        <p className="text-sm text-muted-foreground mb-3">
          もし API キーなどをうっかり GitHub にプッシュしてしまったら、<strong>すぐに対処</strong>が必要です。
        </p>
        <div className="space-y-3 mb-6">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <p className="text-sm"><strong>1.</strong> すぐにそのサービスの設定画面で<strong>キーを無効化</strong>（削除）する</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>2.</strong> 新しいキーを発行して <code className="px-1 py-0.5 bg-muted rounded">.env.local</code> を更新</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>3.</strong> Git の履歴を削除（<code className="px-1 py-0.5 bg-muted rounded">git filter-branch</code> など、難しければ Claude に相談）</p>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="font-medium mb-2">よくある間違い</p>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>コードに API キーを直接書く</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span><code className="px-1 py-0.5 bg-muted rounded">.env.local</code> を Git にコミット</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>秘密キーに <code className="px-1 py-0.5 bg-muted rounded">NEXT_PUBLIC_</code> をつける</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Slack やメールで API キーを共有する</span>
            </li>
          </ul>
        </div>
      </Section>

      <Section id="env-files" title="環境ごとのファイル" icon={<FolderOpen className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Next.js では複数の環境変数ファイルを使い分けられます。
        </p>

        <div className="space-y-3 mb-6">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="font-medium mb-1">.env.local</p>
            <p className="text-sm text-muted-foreground">
              <strong>ローカル開発用</strong>。Git にコミットしない。
              自分のパソコンでだけ使う設定を書く。
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-1">.env</p>
            <p className="text-sm text-muted-foreground">
              <strong>全環境共通</strong>のデフォルト値。
              秘密でない設定のみ。Git にコミットしてもよい。
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-1">.env.development</p>
            <p className="text-sm text-muted-foreground">
              <code className="px-1 py-0.5 bg-muted rounded">npm run dev</code> 時に読み込まれる。
              開発環境用の設定。
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-1">.env.production</p>
            <p className="text-sm text-muted-foreground">
              <code className="px-1 py-0.5 bg-muted rounded">npm run build</code> 時に読み込まれる。
              本番環境用の設定。
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3">読み込み優先順位</h3>
        <p className="text-sm text-muted-foreground mb-3">
          同じ変数名がある場合、上のファイルが優先されます。
        </p>
        <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm">
          <ol className="space-y-1">
            <li>1. <span className="text-primary">.env.local</span> （最優先、Git 管理外）</li>
            <li>2. <span className="text-muted-foreground">.env.development.local</span> / <span className="text-muted-foreground">.env.production.local</span></li>
            <li>3. <span className="text-muted-foreground">.env.development</span> / <span className="text-muted-foreground">.env.production</span></li>
            <li>4. <span className="text-muted-foreground">.env</span> （最低優先）</li>
          </ol>
        </div>

        <TipBox>
          <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>ヒント:</strong></span>
          初心者のうちは <code className="px-1 py-0.5 bg-muted rounded">.env.local</code> だけ覚えておけば大丈夫です。
          本番デプロイ時は Vercel などの管理画面で環境変数を設定します。
        </TipBox>
      </Section>

      <Section id="claude-code-tips" title="Claude Code での扱い方" icon={<HelpCircle className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Claude Code と環境変数を一緒に使うときのコツを紹介します。
        </p>

        <h3 className="text-lg font-semibold mb-3">環境変数を設定してもらう</h3>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">Claude への依頼例</p>
          <div className="space-y-2">
            {[
              '.env.local ファイルを作って、DATABASE_URL を設定して。値は postgresql://... です',
              'OpenAI API を使う準備をして。API キーは sk-... です',
              '.env.example ファイルを作って、必要な環境変数をコメント付きで書いて',
            ].map((item, i) => (
              <div key={i} className="p-2 bg-background rounded text-sm">
                <code className="text-primary">{item}</code>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3">環境変数のサンプルファイル</h3>
        <p className="text-sm text-muted-foreground mb-3">
          チームで開発するときは <code className="px-1 py-0.5 bg-muted rounded">.env.example</code> を作っておくと便利です。
        </p>
        <CodeBlock title=".env.example（Git にコミットして共有）">
{`# データベース接続（Neon の管理画面から取得）
DATABASE_URL="postgresql://..."

# OpenAI API キー（https://platform.openai.com で取得）
OPENAI_API_KEY="sk-..."

# Stripe（https://dashboard.stripe.com で取得）
STRIPE_SECRET_KEY="sk_test_..."`}
        </CodeBlock>

        <WarningBox>
          <strong>Claude に API キーを渡すときの注意:</strong> Claude との会話は Anthropic のサーバーを経由します。
          本番環境の API キーは渡さず、<strong>開発用・テスト用のキー</strong>を使いましょう。
        </WarningBox>

        <h3 className="text-lg font-semibold mb-3 mt-6">CLAUDE.md に書いておくと便利</h3>
        <CodeBlock title="CLAUDE.md">
{`# 環境変数
- .env.local に設定が必要
- 必要な変数は .env.example を参照
- 本番の API キーはコードに書かない`}
        </CodeBlock>
      </Section>

      <Section id="common-patterns" title="よくある例" icon={<Lightbulb className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          実際のプロジェクトでよく使う環境変数のパターンを紹介します。
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">データベース接続</p>
            <CodeBlock>
{`# PostgreSQL（Neon, Supabase など）
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# MongoDB
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/dbname"`}
            </CodeBlock>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">AI / LLM サービス</p>
            <CodeBlock>
{`# OpenAI
OPENAI_API_KEY="sk-..."

# Anthropic Claude API
ANTHROPIC_API_KEY="sk-ant-..."`}
            </CodeBlock>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">認証（NextAuth.js）</p>
            <CodeBlock>
{`# NextAuth 設定
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth プロバイダ
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."`}
            </CodeBlock>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">決済（Stripe）</p>
            <CodeBlock>
{`# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."`}
            </CodeBlock>
            <p className="text-xs text-muted-foreground mt-2">
              ※ Publishable Key は公開しても大丈夫なので <code className="px-1 py-0.5 bg-muted rounded">NEXT_PUBLIC_</code> をつけます
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">アナリティクス</p>
            <CodeBlock>
{`# Google Analytics（公開 OK）
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Sentry（公開 OK）
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."`}
            </CodeBlock>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">メール送信（Resend）</p>
            <CodeBlock>
{`# Resend
RESEND_API_KEY="re_..."`}
            </CodeBlock>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
          <p className="font-medium mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            次のステップ
          </p>
          <p className="text-sm text-muted-foreground">
            環境変数を理解したら、<strong>外部サービス連携ガイド</strong>で
            実際に API を使った開発を学びましょう。
          </p>
        </div>
      </Section>
    </GuideLayout>
  );
}
