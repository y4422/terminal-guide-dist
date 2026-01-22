import { SiteHeader } from '@/components/layout/SiteHeader';
import { Hero } from '@/components/landing/Hero';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { Gamepad2, GitBranch, Rocket, Zap, Code2, MessageCircle, Wrench, Globe, Package, Lightbulb, HelpCircle, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-radial">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          title="Claude Code を学ぼう"
          subtitle="ターミナル初心者でも安心。インタラクティブなチュートリアルと実践ガイドで、Claude Code の使い方をマスターしましょう。"
          ctaText="チュートリアルを始める"
          ctaHref="/tutorial"
        />

        {/* Features Section */}
        <section className="py-16 sm:py-24">
          <div className="container px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                学習コンテンツ
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                目的に合わせてコンテンツを選択してください
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <FeatureCard
                icon={<Gamepad2 className="h-7 w-7 text-primary" />}
                title="インタラクティブチュートリアル"
                description="実際に操作しながら Claude Code の基本を学びます。ターミナル操作からファイル作成まで体験できます。"
                href="/tutorial"
                badge="約20分"
                badgeColor="primary"
              />
              <FeatureCard
                icon={<Code2 className="h-7 w-7 text-primary" />}
                title="VS Code の使い方"
                description="エディタのインストールから基本操作、ターミナルの使い方まで。Claude Code との相性抜群です。"
                href="/guides/vscode-setup"
                badge="初心者向け"
                badgeColor="success"
              />
              <FeatureCard
                icon={<GitBranch className="h-7 w-7 text-primary" />}
                title="Git の使い方"
                description="バージョン管理の基本から、Claude Code を使った効率的な Git 操作まで解説します。"
                href="/guides/git"
                badge="初心者向け"
                badgeColor="success"
              />
              <FeatureCard
                icon={<Rocket className="h-7 w-7 text-primary" />}
                title="Next.js アプリを作ろう"
                description="Node.js のインストールから npm run dev まで、Claude Code で Web アプリ開発を始めましょう。"
                href="/guides/nextjs-setup"
                badge="初心者向け"
                badgeColor="success"
              />
              <FeatureCard
                icon={<Zap className="h-7 w-7 text-primary" />}
                title="Claude Code スキル"
                description="スキル機能の活用方法と CLAUDE.md の書き方を学んで、開発効率をアップしましょう。"
                href="/guides/claude-code-skills"
                badge="実践"
                badgeColor="accent"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 border-t border-border/50">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Claude Code とは?</h2>
              <p className="text-muted-foreground mb-6">
                Claude Code は、Anthropic が提供する AI アシスタント Claude をターミナルから使えるツールです。
                日本語で話しかけるだけで、プログラミング、ファイル操作、Git 操作など、様々なタスクを手伝ってくれます。
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                  <MessageCircle className="h-4 w-4" />
                  <span>日本語で操作</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                  <Wrench className="h-4 w-4" />
                  <span>ファイル編集</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                  <Globe className="h-4 w-4" />
                  <span>Web 検索</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                  <Package className="h-4 w-4" />
                  <span>Git 連携</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 border-t border-border/50 bg-primary/[0.02]">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2"><Lightbulb className="h-6 w-6" /> 困ったら Claude Code に聞こう</h2>
              <p className="text-muted-foreground text-center mb-8">
                使い方がわからなくなったら、Claude Code に直接質問できます。
                日本語で気軽に聞いてみましょう。
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-background border border-border/50">
                  <p className="font-medium mb-2 flex items-center gap-2"><HelpCircle className="h-4 w-4" /> 操作方法を聞く</p>
                  <code className="text-sm text-primary bg-primary/10 px-2 py-1 rounded block">
                    「ファイルの作り方を教えて」
                  </code>
                </div>
                <div className="p-4 rounded-lg bg-background border border-border/50">
                  <p className="font-medium mb-2 flex items-center gap-2"><BookOpen className="h-4 w-4" /> コマンドを調べる</p>
                  <code className="text-sm text-primary bg-primary/10 px-2 py-1 rounded block">
                    「使えるコマンド一覧を見せて」
                  </code>
                </div>
                <div className="p-4 rounded-lg bg-background border border-border/50">
                  <p className="font-medium mb-2 flex items-center gap-2"><Wrench className="h-4 w-4" /> エラーを解決</p>
                  <code className="text-sm text-primary bg-primary/10 px-2 py-1 rounded block">
                    「このエラーの意味を教えて」
                  </code>
                </div>
                <div className="p-4 rounded-lg bg-background border border-border/50">
                  <p className="font-medium mb-2 flex items-center gap-2"><Zap className="h-4 w-4" /> ヘルプを表示</p>
                  <code className="text-sm text-primary bg-primary/10 px-2 py-1 rounded block">
                    /help
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="container px-6 text-center text-sm text-muted-foreground">
          Made with Claude Code
        </div>
      </footer>
    </div>
  );
}
