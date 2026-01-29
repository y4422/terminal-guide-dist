import { GuideLayout } from '@/components/layout/GuideLayout';
import { Cloud, FileCode, Play, Code, BookOpen, Rocket, HelpCircle } from 'lucide-react';

const sections = [
  { id: 'introduction', title: 'はじめに' },
  { id: 'glossary', title: '用語解説' },
  { id: 'neon-setup', title: 'Neon のセットアップ' },
  { id: 'claude-code-workflow', title: 'Claude Code で開発する' },
  { id: 'reference-schema', title: 'リファレンス: スキーマ' },
  { id: 'reference-commands', title: 'リファレンス: コマンド' },
  { id: 'reference-crud', title: 'リファレンス: CRUD 操作' },
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

export default function NeonPrismaGuidePage() {
  return (
    <GuideLayout
      title="Neon DB + Prisma 接続ガイド"
      description="Claude Code でサーバーレス Postgres を使ったアプリを作ろう"
      sections={sections}
      breadcrumb={[
        { label: 'ガイド', href: '/guides' },
        { label: 'Neon DB + Prisma' },
      ]}
    >
      <Section id="introduction" title="はじめに" icon={<BookOpen className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Web アプリでユーザー情報や投稿データを保存するには<strong>データベース</strong>が必要です。
          このガイドでは、Claude Code を使って簡単にデータベース連携ができる方法を学びます。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">データベースを使うと何ができる？</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• ユーザーのアカウント情報を保存（ログイン機能）</li>
            <li>• 投稿やコメントを保存（SNS、ブログ）</li>
            <li>• 商品や注文を管理（EC サイト）</li>
            <li>• タスクやメモを保存（Todo アプリ）</li>
          </ul>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="font-medium mb-2">Neon DB</p>
            <p className="text-sm text-muted-foreground mb-2">
              クラウド上で動くデータベースサービス。
              サーバーの管理が不要で、無料で始められます。
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• 無料枠あり（個人開発に十分）</li>
              <li>• Vercel / Cloudflare と相性抜群</li>
            </ul>
          </div>
          <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <p className="font-medium mb-2">Prisma</p>
            <p className="text-sm text-muted-foreground mb-2">
              データベース操作を簡単にするツール。
              JavaScript/TypeScript からデータを読み書きできます。
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• 型安全なデータベース操作</li>
              <li>• GUI でデータ確認も可能</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="glossary" title="用語解説" icon={<HelpCircle className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          このガイドで出てくる用語を説明します。
          わからない言葉が出てきたらここに戻って確認してください。
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium">データベース（DB）</p>
            <p className="text-sm text-muted-foreground mt-1">
              データを整理して保存する場所。Excel のような表形式でデータを管理します。
              アプリを閉じてもデータが消えずに残ります。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium">PostgreSQL（ポストグレス）</p>
            <p className="text-sm text-muted-foreground mt-1">
              データベースの種類の一つ。無料で高機能、多くの企業で使われています。
              Neon はこの PostgreSQL をクラウドで提供するサービスです。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium">サーバーレス</p>
            <p className="text-sm text-muted-foreground mt-1">
              サーバー（コンピュータ）の管理が不要という意味。
              Neon がサーバーを管理してくれるので、自分でセットアップや保守をする必要がありません。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium">ORM（オーアールエム）</p>
            <p className="text-sm text-muted-foreground mt-1">
              Object-Relational Mapping の略。データベースを JavaScript のオブジェクトのように扱えるツール。
              SQL という専門言語を知らなくても、<code className="px-1 py-0.5 bg-muted rounded text-xs">prisma.user.findMany()</code> のように書けます。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium">スキーマ</p>
            <p className="text-sm text-muted-foreground mt-1">
              データの構造を定義したもの。「ユーザーには名前とメールアドレスがある」といった設計図です。
              Prisma では <code className="px-1 py-0.5 bg-muted rounded text-xs">schema.prisma</code> ファイルに書きます。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium">モデル</p>
            <p className="text-sm text-muted-foreground mt-1">
              データの種類ごとの定義。「User（ユーザー）」「Post（投稿）」などがモデルです。
              Excel でいうと、1つのシートが1つのモデルに相当します。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium">マイグレーション</p>
            <p className="text-sm text-muted-foreground mt-1">
              スキーマの変更をデータベースに反映すること。
              「新しい列を追加」「テーブルを作成」などの変更履歴を管理できます。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium">CRUD（クラッド）</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create（作成）、Read（読み取り）、Update（更新）、Delete（削除）の頭文字。
              データ操作の基本4パターンを指します。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium">リレーション</p>
            <p className="text-sm text-muted-foreground mt-1">
              データ同士の関係。「ユーザーは複数の投稿を持つ」のような関連付けです。
              1対多（1人が複数投稿）、多対多（投稿と複数タグ）などがあります。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium">API（エーピーアイ）</p>
            <p className="text-sm text-muted-foreground mt-1">
              アプリケーションが外部と通信するための窓口。
              「ユーザー一覧を取得」「新規投稿を保存」などの機能を URL として提供します。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium">接続文字列</p>
            <p className="text-sm text-muted-foreground mt-1">
              データベースに接続するための情報（住所・パスワード）をまとめた文字列。
              <code className="px-1 py-0.5 bg-muted rounded text-xs">postgresql://user:pass@host/db</code> のような形式です。
            </p>
          </div>
        </div>
      </Section>

      <Section id="neon-setup" title="Neon のセットアップ" icon={<Cloud className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          まず Neon でデータベースを作成し、接続文字列を取得します。
          この手順だけは Web ブラウザで行う必要があります。
        </p>

        <div className="space-y-3 mb-6">
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm">
              <strong>1.</strong>{' '}
              <a href="https://neon.tech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">neon.tech</a>
              {' '}でアカウント作成（GitHub / Google で登録可）
            </p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>2.</strong> 「Create Project」でプロジェクト作成</p>
            <p className="text-xs text-muted-foreground mt-1">
              ※ Region は Asia Pacific (Singapore) が日本から近い
            </p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>3.</strong> ダッシュボードの「Connect」から接続文字列をコピー</p>
          </div>
        </div>

        <CodeBlock title="接続文字列の例">
{`postgresql://username:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`}
        </CodeBlock>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
          <p className="text-sm">
            <strong>重要:</strong> この接続文字列は後で Claude Code に渡します。
            パスワードが含まれているので、他の人に見せたり Git にコミットしないでください。
          </p>
        </div>
      </Section>

      <Section id="claude-code-workflow" title="Claude Code で開発する" icon={<Rocket className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Neon の接続文字列を取得したら、あとは Claude Code に任せましょう。
          以下のように日本語で依頼するだけで、セットアップからデータ操作まで全て行えます。
        </p>

        <h3 className="text-lg font-semibold mb-3">Step 1: Prisma のセットアップ</h3>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">Claude への依頼</p>
          <div className="p-3 bg-background rounded text-sm">
            <code className="text-primary">Prisma をセットアップして。Neon の接続文字列は postgresql://... です</code>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            → Claude が必要なパッケージのインストール、初期設定、接続情報の保存を自動で行います
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-3">Step 2: スキーマの作成</h3>
        <p className="text-sm text-muted-foreground mb-3">
          どんなデータを保存したいか、Claude に伝えましょう。
        </p>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">Claude への依頼例</p>
          <div className="space-y-2">
            {[
              'ユーザーと投稿のモデルを作って。ユーザーは複数の投稿を持てるようにして',
              'タスク管理用のスキーマを作って。タスクにはタイトル、完了フラグ、期限が必要',
              '商品と注文のモデルを作って。多対多のリレーションで',
            ].map((item, i) => (
              <div key={i} className="p-2 bg-background rounded text-sm">
                <code className="text-primary">{item}</code>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            → Claude が schema.prisma ファイルにデータ構造を定義します
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-3">Step 3: データベースに反映</h3>
        <p className="text-sm text-muted-foreground mb-3">
          作成したスキーマを実際のデータベースに反映します（マイグレーション）。
        </p>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">Claude への依頼</p>
          <div className="p-3 bg-background rounded text-sm">
            <code className="text-primary">マイグレーションを実行して</code>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            → Claude が Neon DB にテーブル（データの入れ物）を作成します
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-3">Step 4: API の作成</h3>
        <p className="text-sm text-muted-foreground mb-3">
          データを読み書きする機能（API）を作成します。
        </p>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">Claude への依頼例</p>
          <div className="space-y-2">
            {[
              'ユーザー一覧を取得する API を作って',
              '新規投稿を作成する API エンドポイントを追加して',
              'タスクの完了状態を切り替える API を作って',
            ].map((item, i) => (
              <div key={i} className="p-2 bg-background rounded text-sm">
                <code className="text-primary">{item}</code>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            → Claude が Prisma を使ったデータ操作コードを作成します
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-3">Step 5: データの確認</h3>
        <p className="text-sm text-muted-foreground mb-3">
          保存されたデータを GUI で確認できます。
        </p>
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">Claude への依頼</p>
          <div className="p-3 bg-background rounded text-sm">
            <code className="text-primary">Prisma Studio を開いて</code>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            → ブラウザでデータベースの内容を表のように確認・編集できます
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
          <p className="font-medium mb-2">CLAUDE.md に書いておくと便利</p>
          <p className="text-sm text-muted-foreground mb-2">
            プロジェクトの CLAUDE.md に以下を書いておくと、Claude がデータベース構成を理解しやすくなります。
          </p>
          <CodeBlock title="CLAUDE.md">
{`# データベース
- Neon (PostgreSQL) + Prisma ORM
- スキーマ: prisma/schema.prisma
- マイグレーション: npx prisma migrate dev
- GUI: npx prisma studio`}
          </CodeBlock>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-6">
          <p className="font-medium mb-2">本格的なアプリを作るなら</p>
          <p className="text-sm text-muted-foreground mb-2">
            上記の Step 1〜5 は学習やプロトタイプ作成に最適ですが、
            本格的なアプリ開発では<strong>要件定義書</strong>から始めると効率的です。
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 mb-3">
            <li>• どんなデータ構造が必要か事前に設計できる</li>
            <li>• Claude が一貫性のあるスキーマを作成しやすい</li>
            <li>• API 設計も含めて計画的に進められる</li>
          </ul>
          <p className="text-sm">
            <a href="/guides/requirements-driven" className="text-primary hover:underline font-medium">
              → 要件定義書から始める開発ガイド
            </a>
          </p>
        </div>
      </Section>

      <Section id="reference-schema" title="リファレンス: スキーマ" icon={<FileCode className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          スキーマファイル（prisma/schema.prisma）の書き方を理解しておくと、
          Claude への依頼もより的確にできます。詳しく知りたい方向けのセクションです。
        </p>

        <h3 className="text-lg font-semibold mb-3">基本構造</h3>
        <CodeBlock title="prisma/schema.prisma">
{`// データベース接続設定
datasource db {
  provider = "postgresql"   // PostgreSQL を使う
  url      = env("DATABASE_URL")  // 接続文字列は環境変数から
}

// Prisma Client 生成設定
generator client {
  provider = "prisma-client-js"
}

// User モデル（ユーザー情報を保存するテーブル）
model User {
  id        Int      @id @default(autoincrement())  // ID（自動で番号が振られる）
  email     String   @unique   // メールアドレス（重複不可）
  name      String?            // 名前（? は省略可能の意味）
  posts     Post[]             // このユーザーの投稿一覧
  createdAt DateTime @default(now())  // 作成日時（自動で記録）
}

// Post モデル（投稿を保存するテーブル）
model Post {
  id        Int      @id @default(autoincrement())
  title     String              // タイトル
  content   String?             // 本文（省略可）
  published Boolean  @default(false)  // 公開フラグ（初期値は false）
  author    User     @relation(fields: [authorId], references: [id])  // 投稿者
  authorId  Int                 // 投稿者の ID
  createdAt DateTime @default(now())
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3 mt-6">よく使う属性</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { attr: '@id', desc: '主キー（そのテーブルの ID）' },
            { attr: '@unique', desc: '重複禁止（メールアドレスなど）' },
            { attr: '@default()', desc: '初期値を設定' },
            { attr: '@relation', desc: '他のモデルとの関連付け' },
            { attr: 'String?', desc: '省略可能（? をつける）' },
            { attr: '@default(now())', desc: '現在日時を自動設定' },
            { attr: '@default(autoincrement())', desc: '1, 2, 3... と自動で番号を振る' },
            { attr: '@updatedAt', desc: '更新日時を自動記録' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-muted/30 rounded-lg">
              <code className="text-primary text-sm">{item.attr}</code>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3 mt-6">リレーションの種類</h3>
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">1対多（One-to-Many）</p>
            <p className="text-sm text-muted-foreground mb-2">
              例: 1人のユーザーが複数の投稿を持つ。最もよく使うパターンです。
            </p>
            <CodeBlock>
{`model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  posts Post[] // 複数の Post を持つ
}

model Post {
  id       Int  @id @default(autoincrement())
  title    String
  author   User @relation(fields: [authorId], references: [id])
  authorId Int  // どのユーザーの投稿か
}`}
            </CodeBlock>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">多対多（Many-to-Many）</p>
            <p className="text-sm text-muted-foreground mb-2">
              例: 投稿は複数のタグを持ち、タグも複数の投稿に付けられる。
            </p>
            <CodeBlock>
{`model Post {
  id    Int    @id @default(autoincrement())
  title String
  tags  Tag[]  // 複数のタグを持つ
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[] // 複数の投稿に付けられる
}`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section id="reference-commands" title="リファレンス: コマンド" icon={<Play className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Prisma でよく使うコマンドの一覧です。Claude に「マイグレーションして」と依頼すれば
          適切なコマンドを実行してくれますが、何が実行されているか知っておくと便利です。
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-1">npx prisma init</p>
            <p className="text-sm text-muted-foreground">
              Prisma を初期化。設定ファイル（schema.prisma）と環境変数ファイル（.env）を作成します。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-1">npx prisma migrate dev --name 名前</p>
            <p className="text-sm text-muted-foreground">
              スキーマの変更をデータベースに反映。変更履歴も記録されます。開発中はこれを使います。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-1">npx prisma generate</p>
            <p className="text-sm text-muted-foreground">
              スキーマから Prisma Client（データ操作用のコード）を再生成。
              スキーマを変更したら実行します。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-1">npx prisma studio</p>
            <p className="text-sm text-muted-foreground">
              ブラウザでデータベースの中身を見られる GUI を起動。
              Excel のような画面でデータを確認・編集できます。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-1">npx prisma db push</p>
            <p className="text-sm text-muted-foreground">
              変更履歴を残さずにスキーマを反映。試作段階で素早く試したいときに便利です。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-1">npx prisma migrate deploy</p>
            <p className="text-sm text-muted-foreground">
              本番環境にマイグレーションを適用するコマンド。
              デプロイ時に使います。
            </p>
          </div>
        </div>
      </Section>

      <Section id="reference-crud" title="リファレンス: CRUD 操作" icon={<Code className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Prisma Client を使ったデータ操作の例です。Claude に「ユーザーを作成する API を作って」と
          依頼すれば自動で書いてくれますが、コードを理解しておくとデバッグや調整がしやすくなります。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">CRUD とは？</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>C</strong>reate - データの作成（新規ユーザー登録など）</li>
            <li>• <strong>R</strong>ead - データの読み取り（ユーザー一覧の取得など）</li>
            <li>• <strong>U</strong>pdate - データの更新（プロフィール変更など）</li>
            <li>• <strong>D</strong>elete - データの削除（アカウント削除など）</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-3">Prisma Client のセットアップ</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Next.js で Prisma を使う場合の推奨パターンです。
        </p>
        <CodeBlock title="lib/prisma.ts">
{`import { PrismaClient } from '@prisma/client'

// Prisma Client のインスタンスを作成
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

// 開発時のホットリロードで接続が増えないようにする
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3 mt-6">Create - 作成</h3>
        <CodeBlock>
{`// 新しいユーザーを作成
const user = await prisma.user.create({
  data: {
    email: 'tanaka@example.com',
    name: '田中太郎',
  },
})

// ユーザーと投稿を同時に作成
const userWithPost = await prisma.user.create({
  data: {
    email: 'suzuki@example.com',
    name: '鈴木花子',
    posts: {
      create: { title: '初めての投稿' },  // 関連する投稿も一緒に作成
    },
  },
})`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3 mt-6">Read - 取得</h3>
        <CodeBlock>
{`// 全ユーザーを取得
const users = await prisma.user.findMany()

// メールアドレスでユーザーを1件取得
const user = await prisma.user.findUnique({
  where: { email: 'tanaka@example.com' },
})

// ユーザーと投稿を一緒に取得
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true },  // 投稿も含める
})

// 条件付きで取得（公開済みの投稿を新しい順に10件）
const posts = await prisma.post.findMany({
  where: { published: true },
  orderBy: { createdAt: 'desc' },
  take: 10,
})`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3 mt-6">Update - 更新</h3>
        <CodeBlock>
{`// ユーザー名を更新
const user = await prisma.user.update({
  where: { id: 1 },
  data: { name: '田中次郎' },
})

// 複数の投稿をまとめて公開
await prisma.post.updateMany({
  where: { authorId: 1 },
  data: { published: true },
})`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3 mt-6">Delete - 削除</h3>
        <CodeBlock>
{`// ユーザーを削除
await prisma.user.delete({
  where: { id: 1 },
})

// 非公開の投稿をまとめて削除
await prisma.post.deleteMany({
  where: { published: false },
})`}
        </CodeBlock>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-6">
          <p className="text-sm">
            <strong>注意:</strong> 投稿を持つユーザーを削除しようとするとエラーになります。
            先に投稿を削除するか、スキーマで「ユーザー削除時に投稿も削除」する設定（<code className="px-1 py-0.5 bg-muted rounded">onDelete: Cascade</code>）が必要です。
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
          <p className="font-medium mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            関連ガイド
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <a href="/guides/requirements-driven" className="hover:underline">
                <strong>要件定義書から始める開発</strong> - 本格的なアプリ開発のワークフロー
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <a href="/guides/external-services" className="hover:underline">
                <strong>外部サービス連携</strong> - API キーや認証の基礎知識
              </a>
            </li>
          </ul>
        </div>
      </Section>
    </GuideLayout>
  );
}
