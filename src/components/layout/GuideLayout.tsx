'use client';

import { SiteHeader } from './SiteHeader';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface Section {
  id: string;
  title: string;
}

interface GuideLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  sections?: Section[];
  breadcrumb?: { label: string; href?: string }[];
}

export function GuideLayout({
  children,
  title,
  description,
  sections,
  breadcrumb,
}: GuideLayoutProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-radial">
      <SiteHeader />

      <div className="flex-1 container px-6 py-8">
        {/* Breadcrumb */}
        {breadcrumb && (
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            {breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                {item.href ? (
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="flex gap-8">
          {/* Sidebar - Table of Contents (Desktop) */}
          {sections && sections.length > 0 && (
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-24">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  目次
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0 max-w-3xl">
            {/* Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-gradient mb-2">
                {title}
              </h1>
              {description && (
                <p className="text-lg text-muted-foreground">
                  {description}
                </p>
              )}
            </div>

            {/* Content */}
            <div className="guide-content prose prose-slate dark:prose-invert max-w-none">
              {children}
            </div>
          </main>
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
