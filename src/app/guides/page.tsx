import { SiteHeader } from '@/components/layout/SiteHeader';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { ChevronRight, Home, GitBranch, Rocket, Zap, Code2, FileText, Database, Key, Plug, Github } from 'lucide-react';
import Link from 'next/link';

const guides = [
  {
    icon: <Code2 className="h-7 w-7 text-primary" />,
    title: 'VS Code の使い方',
    description: 'エディタのインストールから基本操作、ターミナルの使い方まで。Claude Code との相性抜群です。',
    href: '/guides/vscode-setup',
    badge: '初心者向け',
    badgeColor: 'success' as const,
  },
  {
    icon: <GitBranch className="h-7 w-7 text-primary" />,
    title: 'Git の使い方',
    description: 'ファイルの変更履歴を記録する「セーブポイント」機能。add と commit の基本を学びます。',
    href: '/guides/git',
    badge: '初心者向け',
    badgeColor: 'success' as const,
  },
  {
    icon: <Github className="h-7 w-7 text-primary" />,
    title: 'GitHub の使い方',
    description: 'コードをクラウドに保存・共有。バックアップやチーム開発に必須のサービスです。',
    href: '/guides/github',
    badge: '初心者向け',
    badgeColor: 'success' as const,
  },
  {
    icon: <Rocket className="h-7 w-7 text-primary" />,
    title: 'Next.js アプリを作ろう',
    description: 'Node.js のインストールから npm run dev まで、Claude Code で Web アプリ開発を始めましょう。',
    href: '/guides/nextjs-setup',
    badge: '初心者向け',
    badgeColor: 'success' as const,
  },
  {
    icon: <Zap className="h-7 w-7 text-primary" />,
    title: 'Claude Code スキル',
    description: 'スキル機能の活用方法と CLAUDE.md の書き方を学んで、開発効率をアップしましょう。',
    href: '/guides/claude-code-skills',
    badge: '初心者向け',
    badgeColor: 'success' as const,
  },
  {
    icon: <Key className="h-7 w-7 text-primary" />,
    title: '環境変数を理解しよう',
    description: 'API キーやパスワードを安全に管理する方法。.env ファイルの使い方を学びます。',
    href: '/guides/env-variables',
    badge: '初心者向け',
    badgeColor: 'success' as const,
  },
  {
    icon: <FileText className="h-7 w-7 text-primary" />,
    title: '要件定義書から始める開発',
    description: '要件定義書をベースに Claude Code でアプリを構築する実践的なワークフローを学びます。',
    href: '/guides/requirements-driven',
    badge: '実践',
    badgeColor: 'accent' as const,
  },
  {
    icon: <Plug className="h-7 w-7 text-primary" />,
    title: '外部サービスと連携しよう',
    description: 'API を使って他のサービスと連携する方法。認証から実装まで解説します。',
    href: '/guides/external-services',
    badge: '実践',
    badgeColor: 'accent' as const,
  },
  {
    icon: <Database className="h-7 w-7 text-primary" />,
    title: 'Neon DB + Prisma 接続ガイド',
    description: 'サーバーレス Postgres と Prisma ORM でデータベース開発を始めましょう。無料枠で始められます。',
    href: '/guides/neon-prisma',
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
        <div className="container px-6 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <span>Made by</span>
          <a href="https://timewell.jp/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <img src="/timewell-logo.avif" alt="TIMEWELL" className="h-5 object-contain" />
          </a>
          <a href="https://timewell.jp/company/members" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline">Yoshiki Ando</a>
        </div>
      </footer>
    </div>
  );
}
