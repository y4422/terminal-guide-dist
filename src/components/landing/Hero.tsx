import Link from 'next/link';
import { ArrowRight, Sparkles, Monitor, Bot, BookOpen } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export function Hero({ title, subtitle, ctaText, ctaHref }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8 animate-fade-in-up">
            <Sparkles className="h-4 w-4" />
            初心者向けインタラクティブ学習
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up stagger-1">
            <span className="text-gradient">{title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 animate-fade-in-up stagger-2">
            {subtitle}
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up stagger-3">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-warm hover:shadow-warm-lg hover:scale-105 active:scale-95 transition-all btn-shine"
            >
              {ctaText}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Features list */}
          <div className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground animate-fade-in-up stagger-4">
            {[
              { icon: <Monitor className="h-5 w-5" />, text: 'ターミナル基本操作' },
              { icon: <Bot className="h-5 w-5" />, text: 'Claude Code 活用' },
              { icon: <BookOpen className="h-5 w-5" />, text: 'Git & スキル解説' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
