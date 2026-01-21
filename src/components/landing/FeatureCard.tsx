import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
  badgeColor?: 'primary' | 'accent' | 'success';
}

export function FeatureCard({
  icon,
  title,
  description,
  href,
  badge,
  badgeColor = 'primary',
}: FeatureCardProps) {
  const badgeColors = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent-foreground border-accent/20',
    success: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  };

  return (
    <Link
      href={href}
      className="group relative flex flex-col p-6 rounded-2xl bg-card border border-border/50 card-hover"
    >
      {/* Badge */}
      {badge && (
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${badgeColors[badgeColor]}`}>
          {badge}
        </div>
      )}

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/10 mb-4 group-hover:scale-110 transition-transform">
        <span className="text-3xl">{icon}</span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground flex-1 mb-4">
        {description}
      </p>

      {/* Arrow */}
      <div className="flex items-center text-primary font-medium text-sm">
        <span>詳しく見る</span>
        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
