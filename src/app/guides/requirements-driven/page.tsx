import { GuideLayout } from '@/components/layout/GuideLayout';
import { FileText, FolderOpen, AtSign, ListTodo, Code, CheckCircle, Lightbulb, BookOpen } from 'lucide-react';

const sections = [
  { id: 'introduction', title: 'はじめに' },
  { id: 'prepare-requirements', title: '要件定義書の準備' },
  { id: 'project-setup', title: 'プロジェクトのセットアップ' },
  { id: 'load-requirements', title: '要件を Claude に読み込ませる' },
  { id: 'task-breakdown', title: 'タスク分解' },
  { id: 'iterative-development', title: '段階的な実装' },
  { id: 'feedback-cycle', title: '動作確認とフィードバック' },
  { id: 'tips', title: 'Tips' },
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

export default function RequirementsDrivenGuidePage() {
  return (
    <GuideLayout
      title="要件定義書から始める開発"
      description="要件定義書をベースに Claude Code でアプリを構築する実践ガイド"
      sections={sections}
      breadcrumb={[
        { label: 'ガイド', href: '/guides' },
        { label: '要件定義書から始める開発' },
      ]}
    >
      <Section id="introduction" title="はじめに" icon={<BookOpen className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          要件定義書がある状態で開発を始めると、Claude Code との協業がよりスムーズになります。
          このガイドでは、要件定義書を活用した効率的な開発フローを学びます。
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="font-medium mb-3">要件定義書があると良い理由</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span><strong>Claude の精度が上がる</strong> - 「何を作るか」が明確だと AI も迷わない</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span><strong>一貫性が保たれる</strong> - 開発中に方向性がブレにくい</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span><strong>タスク分解が容易</strong> - 機能一覧から作業を計画しやすい</span>
            </li>
          </ul>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">このガイドで学べること</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 要件定義書の書き方</li>
              <li>• Claude への効果的な渡し方</li>
              <li>• 段階的な開発アプローチ</li>
              <li>• フィードバックサイクルの回し方</li>
            </ul>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">対象ユーザー</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 要件が決まっている状態で開発したい人</li>
              <li>• AI 駆動開発を効率化したい人</li>
              <li>• チームで要件を共有しながら開発する人</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="prepare-requirements" title="要件定義書の準備" icon={<FileText className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          Claude が理解しやすい形式で要件定義書を作成しましょう。
          Markdown 形式が推奨されます。
        </p>

        <h3 className="text-lg font-semibold mb-3">含めるべき内容</h3>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {[
            { title: '概要・目的', desc: 'アプリが何をするのか、なぜ作るのか' },
            { title: '機能一覧', desc: '必須機能と任意機能を分けて記載' },
            { title: '技術スタック', desc: '使用する言語、フレームワーク、ライブラリ' },
            { title: '非機能要件', desc: 'パフォーマンス、セキュリティ、UI/UX など' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3">要件定義書の例</h3>
        <CodeBlock title="requirements.md">
{`# タスク管理アプリ 要件定義書

## 概要
シンプルなタスク管理アプリを作成する。
ユーザーがタスクを追加・編集・削除・完了マークできる。

## 技術スタック
- フレームワーク: Next.js 14 (App Router)
- スタイリング: Tailwind CSS
- 状態管理: React の useState / useReducer
- データ保存: localStorage（MVP）

## 機能一覧
### 必須機能
- [ ] タスクの追加（タイトル入力）
- [ ] タスクの一覧表示
- [ ] タスクの完了/未完了の切り替え
- [ ] タスクの削除

### 任意機能
- [ ] タスクの編集
- [ ] 期限の設定
- [ ] フィルタリング（完了/未完了）

## 非機能要件
- レスポンシブデザイン（モバイル対応）
- キーボード操作対応
- ダークモード対応（任意）

## UI イメージ
- ヘッダー: アプリ名
- メイン: 入力欄 + タスクリスト
- 各タスク: チェックボックス + タイトル + 削除ボタン`}
        </CodeBlock>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
          <p className="text-sm">
            <strong>ポイント:</strong> 完璧な要件定義書でなくても大丈夫です。
            まずは「何を作りたいか」を箇条書きで書いてみましょう。
            開発を進めながら詳細化していくこともできます。
          </p>
        </div>
      </Section>

      <Section id="project-setup" title="プロジェクトのセットアップ" icon={<FolderOpen className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          プロジェクトの種類に応じて、セットアップ方法を選びましょう。
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="font-medium mb-2">方法 A: ゼロから作る</p>
            <p className="text-sm text-muted-foreground">
              シンプルなプロジェクトや、フレームワークを使わない場合。
              空フォルダから Claude に全部作ってもらう。
            </p>
          </div>
          <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <p className="font-medium mb-2">方法 B: フレームワークで初期化</p>
            <p className="text-sm text-muted-foreground">
              Next.js などのフレームワークを使う場合。
              先にプロジェクトを作成してから要件を追加。
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3">方法 A: ゼロから作る場合</h3>
        <CodeBlock title="フォルダ構成">
{`my-task-app/
├── CLAUDE.md           # Claude への指示書
├── requirements.md     # 要件定義書
└── (これから作るファイル)`}
        </CodeBlock>
        <div className="space-y-3 mt-4">
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>1.</strong> フォルダを作成: <code className="px-1 py-0.5 bg-muted rounded">mkdir my-task-app && cd my-task-app</code></p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>2.</strong> requirements.md を作成して要件を記載</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm"><strong>3.</strong> Claude Code で <code className="px-1 py-0.5 bg-muted rounded">/init</code> を実行して CLAUDE.md を作成</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3 mt-8">方法 B: Next.js などで初期化する場合</h3>
        <p className="text-muted-foreground mb-3">
          フレームワークの CLI でプロジェクトを作成してから、要件定義書を追加します。
          Claude に初期化コマンドを実行してもらうこともできます。
        </p>
        <CodeBlock title="Claude への依頼例">
{`# Claude に初期化を依頼（プロジェクト名を指定）
my-task-app という名前で Next.js のプロジェクトを作成して

# Claude が実行するコマンド例
npx create-next-app@latest my-task-app`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground mt-2 mb-4">
          ※ TypeScript や Tailwind CSS は最近のデフォルト設定で有効になっていることが多いです。
          特別な設定が必要な場合のみ指定しましょう。
        </p>
        <CodeBlock title="初期化後のフォルダ構成">
{`my-task-app/
├── CLAUDE.md           # 追加: Claude への指示書
├── requirements.md     # 追加: 要件定義書
├── src/
│   └── app/
│       └── page.tsx
├── package.json
├── tailwind.config.ts
└── ...`}
        </CodeBlock>
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
          <p className="text-sm">
            <strong>ポイント:</strong> フレームワークで初期化すると、ベストプラクティスに沿った設定が自動で行われます。
            Claude に「Next.js プロジェクトを作って」と依頼すれば、適切なコマンドを実行してくれます。
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-3 mt-8">CLAUDE.md の例</h3>
        <CodeBlock title="CLAUDE.md">
{`# CLAUDE.md

## プロジェクト概要
タスク管理アプリ。詳細は requirements.md を参照。

## 開発方針
- シンプルに保つ（MVP アプローチ）
- 段階的に機能を追加
- 各ステップで動作確認を行う

## コーディング規約
- TypeScript を使用
- コンポーネントは関数コンポーネント
- 日本語でコメント`}
        </CodeBlock>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
          <p className="font-medium mb-2">CLAUDE.md と requirements.md の使い分け</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-3">
            <div className="text-sm">
              <p className="font-medium">CLAUDE.md</p>
              <p className="text-muted-foreground">
                Claude への作業指示、コーディング規約、プロジェクトの構造説明
              </p>
            </div>
            <div className="text-sm">
              <p className="font-medium">requirements.md</p>
              <p className="text-muted-foreground">
                作りたい機能の詳細、ユーザーストーリー、技術要件
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="load-requirements" title="要件を Claude に読み込ませる" icon={<AtSign className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          <code className="px-1 py-0.5 bg-muted rounded">@</code> メンションを使って、
          要件定義書を Claude に読み込ませます。
        </p>

        <h3 className="text-lg font-semibold mb-3">@ メンションの使い方</h3>
        <CodeBlock title="要件を読み込ませる">
{`# @ に続けてファイル名を入力
@requirements.md この要件を確認して

# Claude が要件を読み込み、内容を理解したか確認してくれます`}
        </CodeBlock>

        <div className="bg-muted/30 rounded-lg p-4 my-4">
          <p className="font-medium mb-2">Claude への依頼例</p>
          <div className="space-y-2">
            {[
              '@requirements.md この要件を確認して、不明点があれば質問して',
              '@requirements.md の必須機能を確認して',
              '@requirements.md を読んで、技術スタックに問題がないか教えて',
            ].map((item, i) => (
              <div key={i} className="p-2 bg-background rounded text-sm">
                <code className="text-primary">{item}</code>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3 mt-6">理解の確認</h3>
        <p className="text-muted-foreground mb-3">
          Claude が要件を正しく理解しているか確認しましょう。
        </p>
        <CodeBlock title="確認の依頼">
{`# 要件の理解を確認
この要件をまとめて、作る機能の一覧を箇条書きで教えて

# 技術的な懸念の確認
この要件を実現するにあたって、技術的な課題はある?

# 不足している情報の確認
要件で曖昧な部分や、追加で決めるべきことはある?`}
        </CodeBlock>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
          <p className="text-sm">
            <strong>ヒント:</strong> Claude から質問が返ってきたら、要件定義書に追記しておきましょう。
            次回以降の開発でも活用できます。
          </p>
        </div>
      </Section>

      <Section id="task-breakdown" title="タスク分解" icon={<ListTodo className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          大きな要件を小さなタスクに分解します。
          Plan モードを使うと、Claude が体系的に計画を立ててくれます。
        </p>

        <h3 className="text-lg font-semibold mb-3">Plan モードを使う</h3>
        <CodeBlock title="Plan モードで計画を立てる">
{`# Plan モードを有効化
/plan

# または Shift+Tab で切り替え

# 計画を依頼
@requirements.md を読んで、
この要件を実装するための計画を立てて。
タスクを小さく分けて、優先順位も教えて。`}
        </CodeBlock>

        <div className="bg-muted/30 rounded-lg p-4 my-4">
          <p className="font-medium mb-2">Claude が提案する計画の例</p>
          <CodeBlock>
{`## 実装計画

### Phase 1: 基盤構築
1. Next.js プロジェクトの初期化
2. Tailwind CSS のセットアップ
3. 基本的なレイアウト作成

### Phase 2: コア機能
4. タスクのデータ構造を定義
5. タスク追加機能
6. タスク一覧表示
7. 完了/未完了の切り替え
8. タスク削除機能

### Phase 3: データ永続化
9. localStorage への保存
10. ページ読み込み時のデータ復元

### Phase 4: 仕上げ
11. レスポンシブ対応
12. UI の改善`}
          </CodeBlock>
        </div>

        <h3 className="text-lg font-semibold mb-3 mt-6">タスク分解のコツ</h3>
        <div className="space-y-3">
          {[
            {
              title: '1 タスク = 1 確認ポイント',
              description: '各タスクで動作確認できるサイズに分ける',
            },
            {
              title: '依存関係を考慮',
              description: 'A を作らないと B が作れない、という順序を意識',
            },
            {
              title: 'MVP を優先',
              description: '必須機能を先に、任意機能は後から追加',
            },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="iterative-development" title="段階的な実装" icon={<Code className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          計画に沿って、1 タスクずつ Claude に依頼していきます。
          いきなり全部作るのではなく、動くものを少しずつ作るのがコツです。
        </p>

        <h3 className="text-lg font-semibold mb-3">実装フロー</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              1
            </div>
            <div>
              <p className="font-medium">タスクを 1 つ依頼</p>
              <p className="text-sm text-muted-foreground mt-1">
                「計画の Step 1: Next.js プロジェクトを初期化して」
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              2
            </div>
            <div>
              <p className="font-medium">動作確認</p>
              <p className="text-sm text-muted-foreground mt-1">
                npm run dev でサーバーを起動し、ブラウザで確認
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              3
            </div>
            <div>
              <p className="font-medium">問題があれば修正</p>
              <p className="text-sm text-muted-foreground mt-1">
                エラーや期待と違う動作があれば Claude に報告
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              4
            </div>
            <div>
              <p className="font-medium">コミット</p>
              <p className="text-sm text-muted-foreground mt-1">
                動いたら <code className="px-1 py-0.5 bg-muted rounded">/commit</code> で保存
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              5
            </div>
            <div>
              <p className="font-medium">次のタスクへ</p>
              <p className="text-sm text-muted-foreground mt-1">
                「次は Step 2: タスク追加機能を作って」
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3 mt-6">依頼のコツ</h3>
        <CodeBlock title="良い依頼の例">
{`# 具体的に依頼
タスク追加機能を実装して。
入力欄とボタンを作成し、
ボタンを押すとタスクが一覧に追加されるようにして。

# 範囲を限定
今は見た目は気にしないで、
機能が動くことを優先して。

# 既存コードを参照
さっき作った TaskList コンポーネントに、
削除ボタンを追加して。`}
        </CodeBlock>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
          <p className="font-medium mb-2">MVP アプローチ</p>
          <p className="text-sm text-muted-foreground">
            最初は最小限の機能で動くものを作り、徐々に改善していきます。
            「完璧を目指す」より「動くものを作る」を優先しましょう。
          </p>
        </div>
      </Section>

      <Section id="feedback-cycle" title="動作確認とフィードバック" icon={<CheckCircle className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          実装したら必ず動作確認を行い、問題があれば Claude にフィードバックします。
          このサイクルを回すことで、品質を高めていきます。
        </p>

        <h3 className="text-lg font-semibold mb-3">確認ポイント</h3>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {[
            { title: '機能', desc: '要件通りに動作するか' },
            { title: 'UI', desc: '見た目や操作性に問題はないか' },
            { title: 'エラー', desc: 'コンソールにエラーが出ていないか' },
            { title: 'エッジケース', desc: '空文字や長い文字列での動作' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3">問題の報告方法</h3>
        <CodeBlock title="効果的なフィードバック">
{`# 問題を具体的に伝える
タスク追加ボタンを押しても、一覧に反映されない。
コンソールに "Cannot read property 'push' of undefined" と出ている。

# スクリーンショットを共有
（VS Code でスクリーンショットをドラッグ&ドロップ）

# 期待する動作を説明
ボタンを押したら、入力欄の内容がタスク一覧に追加されてほしい。`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-3 mt-6">要件との照合</h3>
        <CodeBlock title="要件との差分チェック">
{`# 実装した機能を要件と照合
@requirements.md と現在の実装を比較して、
未実装の機能と完了した機能を教えて。

# 要件の充足度を確認
必須機能はすべて実装できた?
もし漏れがあれば教えて。`}
        </CodeBlock>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
          <p className="text-sm">
            <strong>ヒント:</strong> 問題が発生しても焦らず、Claude に状況を詳しく伝えましょう。
            エラーメッセージや再現手順を共有すると、的確な修正提案が得られます。
          </p>
        </div>
      </Section>

      <Section id="tips" title="Tips" icon={<Lightbulb className="h-6 w-6 text-primary" />}>
        <p className="text-muted-foreground mb-4">
          要件駆動開発でよくある問題と対処法をまとめました。
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">要件が曖昧な時</p>
            <p className="text-sm text-muted-foreground mb-2">
              まずは Claude に質問して、要件を具体化しましょう。
            </p>
            <CodeBlock>
{`「タスクの編集」機能について、
どんな UI がいいと思う? 選択肢を出して。`}
            </CodeBlock>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">Claude が間違った方向に進んだ時</p>
            <p className="text-sm text-muted-foreground mb-2">
              早めに軌道修正を依頼しましょう。
            </p>
            <CodeBlock>
{`待って、それは意図と違う。
○○ではなく、△△ にしたい。
さっきの変更を取り消して、やり直して。`}
            </CodeBlock>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">大規模プロジェクトでの工夫</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 要件を複数ファイルに分割（機能ごと、画面ごと）</li>
              <li>• マイルストーンを設定し、定期的に進捗確認</li>
              <li>• CLAUDE.md にアーキテクチャ図や用語集を記載</li>
            </ul>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">Resume を活用した継続作業</p>
            <p className="text-sm text-muted-foreground mb-2">
              長期プロジェクトでは、前回の会話を引き継ぐと効率的です。
            </p>
            <CodeBlock>
{`# 前回の作業を再開
claude --continue

# または
claude -c`}
            </CodeBlock>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">要件定義書を育てる</p>
            <p className="text-sm text-muted-foreground">
              開発中に気づいた仕様や決定事項は、要件定義書に追記していきましょう。
              次回の開発やメンテナンスで役立ちます。
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">UI を改善したい時は /frontend-design</p>
            <p className="text-sm text-muted-foreground mb-2">
              機能が動くようになったら、UI の改善は専用スキルに任せましょう。
              モダンで洗練されたデザインを提案してくれます。
            </p>
            <CodeBlock>
{`# UI の改善を依頼
/frontend-design このページをもっと見やすくして

# 特定のコンポーネントを改善
/frontend-design タスクリストのデザインを改善して`}
            </CodeBlock>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">セキュリティレビューは /security-review</p>
            <p className="text-sm text-muted-foreground mb-2">
              Claude Code はコードを書く際にセキュリティを考慮しますが、
              明示的にセキュリティレビューを依頼することもできます。
            </p>
            <CodeBlock>
{`# 変更内容のセキュリティレビューを依頼
/security-review

# XSS、SQL インジェクション、コマンドインジェクションなど
# 一般的な脆弱性をチェックしてくれます`}
            </CodeBlock>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
          <p className="font-medium mb-2">まとめ: 要件駆動開発のサイクル</p>
          <ol className="text-sm text-muted-foreground space-y-1">
            <li>1. 要件定義書を準備</li>
            <li>2. Claude に読み込ませて理解を確認</li>
            <li>3. タスクを分解して計画を立てる</li>
            <li>4. 1 タスクずつ実装・確認・コミット</li>
            <li>5. 問題があればフィードバック</li>
            <li>6. 要件定義書を更新</li>
            <li>7. 繰り返し</li>
          </ol>
        </div>
      </Section>
    </GuideLayout>
  );
}
