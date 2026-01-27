import { GuideLayout } from '@/components/layout/GuideLayout';
import { Plug, Lightbulb, AlertTriangle, BookOpen, Key, Server, CheckCircle, Code, CreditCard, Shield, Zap, RefreshCw, HelpCircle, ExternalLink } from 'lucide-react';

const sections = [
  { id: 'what-is-api', title: 'API とは' },
  { id: 'api-key-basics', title: 'API キーの基本' },
  { id: 'common-services', title: 'よくある外部サービス' },
  { id: 'openai-example', title: '実装例: OpenAI API' },
  { id: 'stripe-example', title: '実装例: Stripe 決済' },
  { id: 'nextjs-api-routes', title: 'Next.js API Routes' },
  { id: 'auth-patterns', title: '認証の種類' },
  { id: 'rate-limiting', title: 'レート制限と課金' },
  { id: 'error-handling', title: 'エラー対処法' },
  { id: 'claude-code-workflow', title: 'Claude Code での開発' },
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

export default function ExternalServicesGuidePage() {
  return (
    <GuideLayout
      title="外部サービスと連携しよう"
      description="API を使って他のサービスと連携する方法"
      sections={sections}
      breadcrumb={[
        { label: 'ガイド', href: '/guides' },
        { label: '外部サービスと連携しよう' },
      ]}
    >
      <Section id="what-is-api" title="API とは" icon={<Plug className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4 text-lg">
          API は、<strong>アプリ同士が会話するための窓口</strong>です。
          外部サービスの機能を自分のアプリから利用できます。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <p className="font-medium mb-3 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" /> わかりやすく言うと...</p>
          <p className="text-muted-foreground mb-4">
            レストランで例えると...
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>あなた（アプリ）が<strong>メニューを見て注文</strong>する → リクエスト</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>店員（API）が<strong>注文を厨房に伝える</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>厨房（外部サービス）が<strong>料理を作って</strong>提供 → レスポンス</span>
            </li>
          </ul>
        </div>

        <TermBox term="API（Application Programming Interface）">
          アプリケーション同士がデータをやり取りするための決まったルール。
          「このURLにこのデータを送ると、こういう結果が返ってくる」という約束事です。
        </TermBox>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="font-medium mb-2">API でできること</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> AI に文章を生成してもらう（OpenAI、Claude）</li>
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> 決済処理を行う（Stripe）</li>
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> メールを送信する（Resend、SendGrid）</li>
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> 天気情報を取得する（OpenWeather）</li>
            <li className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-green-500 shrink-0" /> SNS に投稿する（Twitter/X、Discord）</li>
          </ul>
        </div>
      </Section>

      <Section id="api-key-basics" title="API キーの基本" icon={<Key className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          多くの API は「API キー」で利用者を識別します。
          これは<strong>サービスを使うためのパスワード</strong>のようなものです。
        </p>

        <h3 className="text-lg font-semibold mb-3">API キーの取得方法</h3>
        <div className="space-y-3 mb-6">
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>1.</strong> サービスの公式サイトでアカウント作成</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>2.</strong> 開発者向けのダッシュボードにアクセス</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>3.</strong> 「API Keys」や「Credentials」から新しいキーを作成</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>4.</strong> キーをコピーして <code className="px-1 py-0.5 bg-muted rounded">.env.local</code> に保存</p>
          </div>
        </div>

        <WarningBox>
          API キーは<strong>一度しか表示されない</strong>ことが多いです。
          作成したらすぐにコピーして安全な場所に保存しましょう。
        </WarningBox>

        <h3 className="text-lg font-semibold mb-3 mt-6">よくある API キーの種類</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <p className="font-medium mb-2">Secret Key（秘密キー）</p>
            <p className="text-sm text-muted-foreground">
              サーバー側でのみ使用。<strong>絶対に公開しない</strong>。
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              例: <code className="px-1 py-0.5 bg-muted rounded">sk-...</code>、<code className="px-1 py-0.5 bg-muted rounded">sk_live_...</code>
            </p>
          </div>
          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
            <p className="font-medium mb-2">Publishable Key（公開キー）</p>
            <p className="text-sm text-muted-foreground">
              ブラウザ側で使用可能。単独では課金できない。
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              例: <code className="px-1 py-0.5 bg-muted rounded">pk_...</code>、<code className="px-1 py-0.5 bg-muted rounded">pk_test_...</code>
            </p>
          </div>
        </div>

        <TipBox>
          <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>ヒント:</strong></span>
          本番用キー（live）とテスト用キー（test）が分かれていることが多いです。
          開発中は<strong>必ずテスト用キー</strong>を使いましょう。
        </TipBox>
      </Section>

      <Section id="common-services" title="よくある外部サービス" icon={<Server className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Claude Code と一緒に使える人気の外部サービスを紹介します。
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-green-500" />
              <p className="font-medium">AI / LLM</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>OpenAI</strong> - ChatGPT、DALL-E</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>Anthropic</strong> - Claude API</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>Google</strong> - Gemini API</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>Replicate</strong> - 各種AIモデル</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-5 w-5 text-blue-500" />
              <p className="font-medium">決済</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>Stripe</strong> - カード決済、サブスク</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>LemonSqueezy</strong> - デジタル販売</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-purple-500" />
              <p className="font-medium">認証</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>Clerk</strong> - ユーザー認証</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>Auth0</strong> - エンタープライズ向け</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>NextAuth.js</strong> - OSS認証ライブラリ</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="h-5 w-5 text-orange-500" />
              <p className="font-medium">その他</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>Resend</strong> - メール送信</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>Cloudinary</strong> - 画像管理</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>Vercel Blob</strong> - ファイルストレージ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span><strong>Upstash</strong> - Redis、Kafka</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="openai-example" title="実装例: OpenAI API" icon={<Zap className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          ChatGPT の機能を自分のアプリに組み込む方法を解説します。
        </p>

        <h3 className="text-lg font-semibold mb-3">Step 1: API キーの取得</h3>
        <div className="space-y-2 mb-6">
          <p className="text-sm text-muted-foreground">
            <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
              OpenAI Platform
              <ExternalLink className="h-3 w-3" />
            </a>
            でアカウント作成後、API Keys ページでキーを作成します。
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-3">Step 2: 環境変数の設定</h3>
        <CodeBlock title=".env.local">
{`OPENAI_API_KEY="sk-..."`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3">Step 3: SDK のインストール</h3>
        <CodeBlock title="ターミナル">
{`npm install openai`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3">Step 4: API Route の作成</h3>
        <CodeBlock title="app/api/chat/route.ts">
{`import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// OpenAI クライアントを作成
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // リクエストからメッセージを取得
    const { message } = await request.json();

    // OpenAI API を呼び出し
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',  // 使用するモデル
      messages: [
        { role: 'system', content: 'あなたは親切なアシスタントです。' },
        { role: 'user', content: message },
      ],
    });

    // レスポンスを返す
    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'AIからの応答に失敗しました' },
      { status: 500 }
    );
  }
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3">Step 5: フロントエンドから呼び出し</h3>
        <CodeBlock title="app/page.tsx（例）">
{`'use client';
import { useState } from 'react';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setReply(data.reply);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="メッセージを入力..."
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? '送信中...' : '送信'}
      </button>
      {reply && <p>AI: {reply}</p>}
    </div>
  );
}`}
        </CodeBlock>

        <TipBox>
          <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>ヒント:</strong></span>
          ストリーミング（文字が徐々に表示される）を実装したい場合は、
          Claude に「OpenAI API でストリーミングレスポンスを実装して」と依頼しましょう。
        </TipBox>
      </Section>

      <Section id="stripe-example" title="実装例: Stripe 決済" icon={<CreditCard className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Stripe を使ったクレジットカード決済の基本的な実装例です。
        </p>

        <h3 className="text-lg font-semibold mb-3">Step 1: API キーの取得</h3>
        <p className="text-sm text-muted-foreground mb-4">
          <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
            Stripe Dashboard
            <ExternalLink className="h-3 w-3" />
          </a>
          でアカウント作成後、「開発者」→「APIキー」で取得します。
        </p>

        <h3 className="text-lg font-semibold mb-3">Step 2: 環境変数の設定</h3>
        <CodeBlock title=".env.local">
{`# 秘密キー（サーバーのみ）
STRIPE_SECRET_KEY="sk_test_..."

# 公開キー（ブラウザで使用可）
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."`}
        </CodeBlock>

        <WarningBox>
          必ず <code className="px-1 py-0.5 bg-muted rounded">sk_test_</code> で始まる<strong>テストキー</strong>を使ってください。
          本番キー（<code className="px-1 py-0.5 bg-muted rounded">sk_live_</code>）は実際に課金されます。
        </WarningBox>

        <h3 className="text-lg font-semibold mb-3">Step 3: SDK のインストール</h3>
        <CodeBlock title="ターミナル">
{`npm install stripe @stripe/stripe-js`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3">Step 4: Checkout Session の作成</h3>
        <CodeBlock title="app/api/checkout/route.ts">
{`import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json();

    // Checkout Session を作成
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',  // 一回払い（サブスクは 'subscription'）
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,  // Stripe ダッシュボードで作った価格ID
          quantity: 1,
        },
      ],
      success_url: \`\${process.env.NEXT_PUBLIC_BASE_URL}/success\`,
      cancel_url: \`\${process.env.NEXT_PUBLIC_BASE_URL}/cancel\`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: '決済の準備に失敗しました' },
      { status: 500 }
    );
  }
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3">Step 5: 購入ボタン</h3>
        <CodeBlock title="components/BuyButton.tsx">
{`'use client';

export function BuyButton({ priceId }: { priceId: string }) {
  const handleClick = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    const { url } = await response.json();

    // Stripe の決済ページにリダイレクト
    window.location.href = url;
  };

  return (
    <button onClick={handleClick}>
      購入する
    </button>
  );
}`}
        </CodeBlock>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
          <p className="text-sm">
            <strong>テストカード番号:</strong>{' '}
            <code className="px-1 py-0.5 bg-muted rounded">4242 4242 4242 4242</code>（有効期限・CVC は適当でOK）
          </p>
        </div>
      </Section>

      <Section id="nextjs-api-routes" title="Next.js API Routes" icon={<Code className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          外部 API を呼び出すときは、<strong>サーバー側（API Route）を経由</strong>するのが基本です。
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
            <p className="font-medium mb-2 text-red-600 dark:text-red-400">NG: ブラウザから直接</p>
            <p className="text-sm text-muted-foreground">
              API キーがユーザーに見えてしまう
            </p>
            <div className="mt-2 text-xs font-mono bg-muted/30 p-2 rounded">
              ブラウザ → 外部API
            </div>
          </div>
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <p className="font-medium mb-2 text-green-600 dark:text-green-400">OK: API Route 経由</p>
            <p className="text-sm text-muted-foreground">
              API キーはサーバーにだけ存在
            </p>
            <div className="mt-2 text-xs font-mono bg-muted/30 p-2 rounded">
              ブラウザ → API Route → 外部API
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3">API Route の基本形</h3>
        <CodeBlock title="app/api/example/route.ts">
{`import { NextResponse } from 'next/server';

// GET リクエスト
export async function GET() {
  // 外部 API を呼び出し
  const response = await fetch('https://api.example.com/data', {
    headers: {
      'Authorization': \`Bearer \${process.env.API_KEY}\`,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}

// POST リクエスト
export async function POST(request: Request) {
  const body = await request.json();

  // 何か処理...

  return NextResponse.json({ success: true });
}`}
        </CodeBlock>

        <TipBox>
          <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>ヒント:</strong></span>
          <code className="px-1 py-0.5 bg-muted rounded">app/api/users/route.ts</code> を作ると{' '}
          <code className="px-1 py-0.5 bg-muted rounded">/api/users</code> でアクセスできます。
        </TipBox>
      </Section>

      <Section id="auth-patterns" title="認証の種類" icon={<Shield className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          外部サービスとの認証にはいくつかの方法があります。概要だけ理解しておきましょう。
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">API キー認証</p>
            <p className="text-sm text-muted-foreground mb-2">
              最もシンプル。ヘッダーやクエリパラメータでキーを送る。
            </p>
            <CodeBlock>
{`// ヘッダーで送る（よくあるパターン）
fetch(url, {
  headers: {
    'Authorization': 'Bearer sk-...',
    // または
    'X-API-Key': 'your-api-key',
  }
});`}
            </CodeBlock>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">OAuth 2.0</p>
            <p className="text-sm text-muted-foreground mb-2">
              「Google でログイン」のような機能。ユーザーが許可を与えると、
              そのユーザーに代わって操作できるトークンがもらえる。
            </p>
            <p className="text-xs text-muted-foreground">
              例: GitHub API でユーザーのリポジトリにアクセス、Google Calendar の予定を取得
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">JWT（JSON Web Token）</p>
            <p className="text-sm text-muted-foreground mb-2">
              ログイン成功後に発行されるトークン。有効期限があり、
              リクエストのたびにサーバーで検証される。
            </p>
            <p className="text-xs text-muted-foreground">
              例: 自分のアプリのユーザー認証
            </p>
          </div>
        </div>

        <TipBox>
          <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /><strong>ヒント:</strong></span>
          認証の実装は複雑なので、<strong>Clerk</strong> や <strong>NextAuth.js</strong> などの
          ライブラリを使うのがおすすめです。Claude に「Clerk でログイン機能を作って」と依頼できます。
        </TipBox>
      </Section>

      <Section id="rate-limiting" title="レート制限と課金" icon={<RefreshCw className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          API には利用制限があります。予期せぬ課金を防ぐために理解しておきましょう。
        </p>

        <h3 className="text-lg font-semibold mb-3">レート制限（Rate Limit）</h3>
        <p className="text-sm text-muted-foreground mb-3">
          一定時間内に送れるリクエスト数の上限。超えると一時的にブロックされます。
        </p>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="text-sm">例: OpenAI GPT-4o-mini</p>
          <ul className="text-xs text-muted-foreground mt-2 space-y-1">
            <li>• 1分あたり 500 リクエスト（Tier 1）</li>
            <li>• 超えると <code className="px-1 py-0.5 bg-muted rounded">429 Too Many Requests</code> エラー</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-3">無料枠と課金</h3>
        <div className="space-y-3 mb-6">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <p className="text-sm"><strong>無料枠があるサービス:</strong> Stripe（テスト環境）、Resend（月100通）、Clerk（月10,000MAU）</p>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-lg">
            <p className="text-sm"><strong>従量課金:</strong> OpenAI（トークン数）、AWS（リクエスト・データ転送量）</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>月額固定:</strong> 一部のプレミアムプラン</p>
          </div>
        </div>

        <WarningBox>
          開発中に<strong>無限ループで API を叩いてしまう</strong>と、
          大量のリクエストで課金が発生することがあります。
          必ず<strong>テスト環境・テストキー</strong>を使い、利用量を監視しましょう。
        </WarningBox>

        <h3 className="text-lg font-semibold mb-3 mt-6">課金を防ぐコツ</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>サービスのダッシュボードで<strong>利用量アラート</strong>を設定</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span><strong>月額上限</strong>を設定できる場合は設定する</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>開発中は<strong>キャッシュ</strong>を活用してリクエスト数を減らす</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>本番デプロイ前に<strong>テストモード</strong>で十分検証</span>
          </li>
        </ul>
      </Section>

      <Section id="error-handling" title="エラー対処法" icon={<AlertTriangle className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          API 連携でよくあるエラーとその対処法を紹介します。
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">401 Unauthorized</p>
            <p className="text-sm text-muted-foreground mb-2">
              API キーが間違っている、または期限切れ。
            </p>
            <p className="text-xs text-primary">
              → .env.local のキーを確認、新しいキーを発行
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">403 Forbidden</p>
            <p className="text-sm text-muted-foreground mb-2">
              権限がない。プランの制限、または該当機能が無効。
            </p>
            <p className="text-xs text-primary">
              → サービスのダッシュボードで権限・プランを確認
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">429 Too Many Requests</p>
            <p className="text-sm text-muted-foreground mb-2">
              レート制限に達した。
            </p>
            <p className="text-xs text-primary">
              → 少し待ってリトライ、リクエスト頻度を下げる
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">500 Internal Server Error</p>
            <p className="text-sm text-muted-foreground mb-2">
              外部サービス側の問題。
            </p>
            <p className="text-xs text-primary">
              → サービスのステータスページを確認、しばらく待つ
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">CORS エラー</p>
            <p className="text-sm text-muted-foreground mb-2">
              ブラウザから直接外部 API を呼んでいる。
            </p>
            <p className="text-xs text-primary">
              → API Route を経由するように修正
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3 mt-6">エラーハンドリングの基本</h3>
        <CodeBlock title="try-catch でエラーを捕捉">
{`try {
  const response = await fetch('/api/external');

  if (!response.ok) {
    // HTTP エラー（4xx, 5xx）
    throw new Error(\`API error: \${response.status}\`);
  }

  const data = await response.json();
  // 成功時の処理
} catch (error) {
  console.error('Error:', error);
  // ユーザーにエラーを表示
}`}
        </CodeBlock>
      </Section>

      <Section id="claude-code-workflow" title="Claude Code での開発" icon={<HelpCircle className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          外部サービス連携を Claude Code で効率的に進める方法を紹介します。
        </p>

        <h3 className="text-lg font-semibold mb-3">依頼の例</h3>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">基本的な連携</p>
          <div className="space-y-2">
            {[
              'OpenAI API を使って、ユーザーの質問に答えるチャット機能を作って',
              'Stripe で1回払いの決済機能を作って。商品は1つだけでOK',
              'Resend でお問い合わせフォームからメール送信する機能を作って',
            ].map((item, i) => (
              <div key={i} className="p-2 bg-background rounded text-sm">
                <code className="text-primary">{item}</code>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">トラブル対応</p>
          <div className="space-y-2">
            {[
              'OpenAI API で 429 エラーが出る。リトライ処理を追加して',
              'Stripe Webhook が動かない。デバッグして',
              'CORS エラーが出る。API Route 経由に変更して',
            ].map((item, i) => (
              <div key={i} className="p-2 bg-background rounded text-sm">
                <code className="text-primary">{item}</code>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3">CLAUDE.md に書いておくと便利</h3>
        <CodeBlock title="CLAUDE.md">
{`# 外部サービス
- OpenAI API: チャット機能に使用
- Stripe: 決済処理
- Resend: メール送信

# 環境変数
- .env.local に API キーを設定
- 必要な変数は .env.example を参照

# 注意
- API キーは絶対にコードに直接書かない
- 外部 API は API Route 経由で呼び出す
- テスト時は必ずテスト用キーを使う`}
        </CodeBlock>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
          <p className="font-medium mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            関連ガイド
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <span><strong>環境変数を理解しよう</strong> - API キーの安全な管理方法</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <span><strong>Neon DB + Prisma</strong> - データベース連携</span>
            </li>
          </ul>
        </div>
      </Section>
    </GuideLayout>
  );
}
