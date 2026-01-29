'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Code2, GitBranch, Github, Rocket, Key, Plug, Zap, FileText, Database } from 'lucide-react';

const guideCategories = [
  {
    label: '初心者向け',
    items: [
      { href: '/guides/vscode-setup', label: 'VS Code の使い方', icon: Code2 },
      { href: '/guides/git', label: 'Git の使い方', icon: GitBranch },
      { href: '/guides/github', label: 'GitHub の使い方', icon: Github },
      { href: '/guides/nextjs-setup', label: 'Next.js アプリを作ろう', icon: Rocket },
      { href: '/guides/env-variables', label: '環境変数を理解しよう', icon: Key },
    ],
  },
  {
    label: '実践',
    items: [
      { href: '/guides/external-services', label: '外部サービス連携', icon: Plug },
      { href: '/guides/claude-code-skills', label: 'Claude Code スキル', icon: Zap },
      { href: '/guides/requirements-driven', label: '要件定義書から開発', icon: FileText },
      { href: '/guides/neon-prisma', label: 'Neon DB + Prisma', icon: Database },
    ],
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isGuidesActive = pathname.startsWith('/guides');

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setGuidesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setGuidesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setGuidesOpen(false);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-accent/[0.02] pointer-events-none" />

      <div className="container relative flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.avif"
            alt="WARP Logo"
            width={72}
            height={28}
            className="object-contain"
          />
          <div className="h-8 w-px bg-border/60" />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight leading-tight">
              <span className="text-gradient">Claude Code</span>
            </span>
            <span className="text-[10px] font-medium uppercase text-muted-foreground ml-0.5">
              Learning Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {/* ホーム */}
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            ホーム
          </Link>

          {/* チュートリアル */}
          <Link
            href="/tutorial"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/tutorial'
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            チュートリアル
          </Link>

          {/* ガイド (Dropdown) */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isGuidesActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              onClick={() => setGuidesOpen(!guidesOpen)}
            >
              ガイド
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${guidesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full right-0 mt-2 w-72 rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-xl transition-all duration-200 origin-top-right ${
                guidesOpen
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="p-2">
                {guideCategories.map((category, idx) => (
                  <div key={category.label}>
                    {idx > 0 && <div className="my-2 border-t border-border/50" />}
                    <div className="px-3 py-1.5">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${
                        category.label === '初心者向け' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {category.label}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      {category.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setGuidesOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* ガイド一覧へのリンク */}
                <div className="mt-2 pt-2 border-t border-border/50">
                  <Link
                    href="/guides"
                    onClick={() => setGuidesOpen(false)}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    すべてのガイドを見る →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="container px-6 py-4 space-y-1">
            {/* ホーム */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              ホーム
            </Link>

            {/* チュートリアル */}
            <Link
              href="/tutorial"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/tutorial'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              チュートリアル
            </Link>

            {/* ガイド (Accordion) */}
            <div>
              <button
                onClick={() => setMobileGuidesOpen(!mobileGuidesOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isGuidesActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span>ガイド</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileGuidesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileGuidesOpen && (
                <div className="mt-1 ml-4 pl-4 border-l-2 border-border/50 space-y-1">
                  {guideCategories.map((category) => (
                    <div key={category.label} className="py-2">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${
                        category.label === '初心者向け' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {category.label}
                      </span>
                      <div className="mt-1 space-y-0.5">
                        {category.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileGuidesOpen(false);
                              }}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                isActive
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                              }`}
                            >
                              <Icon className="h-4 w-4 shrink-0" />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* すべてのガイド */}
                  <Link
                    href="/guides"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileGuidesOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    すべてのガイドを見る →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </header>
  );
}
