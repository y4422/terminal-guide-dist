import { SiteHeader } from '@/components/layout/SiteHeader';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

const guides = [
  {
    icon: '📚',
    title: 'Git の使い方',
    description: 'バージョン管理の基本から、Claude Code を使った効率的な Git 操作まで解説します。',
    href: '/guides/git',
    badge: '初心者向け',
    badgeColor: 'success' as const,
  },
  {
    icon: '🚀',
    title: 'Next.js アプリを作ろう',
    description: 'Node.js のインストールから npm run dev まで、Claude Code で Web アプリ開発を始めましょう。',
    href: '/guides/nextjs-setup',
    badge: '初心者向け',
    badgeColor: 'success' as const,
  },
  {
    icon: '⚡',
    title: 'Claude Code スキル',
    description: 'スキル機能の活用方法と CLAUDE.md の書き方を学んで、開発効率をアップしましょう。',
    href: '/guides/claude-code-skills',
    badge: '実践',
    badgeColor: 'accent' as const,
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-radial">
      <SiteHeader />

      <div className="flex-1 container px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">ガイド</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gradient mb-2">
            ガイド
          </h1>
          <p className="text-lg text-muted-foreground">
            Claude Code を使った開発に役立つガイド集
          </p>
        </div>

        {/* Guide Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {guides.map((guide) => (
            <FeatureCard
              key={guide.href}
              icon={guide.icon}
              title={guide.title}
              description={guide.description}
              href={guide.href}
              badge={guide.badge}
              badgeColor={guide.badgeColor}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="container px-6 text-center text-sm text-muted-foreground">
          Made with Claude Code
        </div>
      </footer>
    </div>
  );
}
