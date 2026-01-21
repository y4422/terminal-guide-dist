import { SiteHeader } from '@/components/layout/SiteHeader';
import { Hero } from '@/components/landing/Hero';
import { FeatureCard } from '@/components/landing/FeatureCard';

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
                icon="🎮"
                title="インタラクティブチュートリアル"
                description="実際に操作しながら Claude Code の基本を学びます。ターミナル操作からファイル作成まで体験できます。"
                href="/tutorial"
                badge="約20分"
                badgeColor="primary"
              />
              <FeatureCard
                icon="📚"
                title="Git の使い方"
                description="バージョン管理の基本から、Claude Code を使った効率的な Git 操作まで解説します。"
                href="/guides/git"
                badge="初心者向け"
                badgeColor="success"
              />
              <FeatureCard
                icon="⚡"
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
                  <span>💬</span>
                  <span>日本語で操作</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                  <span>🔧</span>
                  <span>ファイル編集</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                  <span>🌐</span>
                  <span>Web 検索</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                  <span>📦</span>
                  <span>Git 連携</span>
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
