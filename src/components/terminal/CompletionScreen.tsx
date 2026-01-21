'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTutorialStore } from '@/store/tutorial';
import { Trophy, Sparkles, ExternalLink, RotateCcw, Clock, Star, Zap, ChevronRight, Home } from 'lucide-react';

// Confetti particle component
function ConfettiParticle({ delay, left }: { delay: number; left: number }) {
  const colors = ['#F97316', '#FB923C', '#FBBF24', '#FCD34D', '#F472B6', '#A78BFA'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 8 + 4;
  const duration = Math.random() * 2 + 3;

  return (
    <div
      className="absolute top-0 animate-confetti pointer-events-none"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <div
        className="rounded-sm"
        style={{
          width: size,
          height: size * 1.5,
          backgroundColor: color,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    </div>
  );
}

// Achievement badge component with staggered animation
function AchievementBadge({
  icon,
  name,
  description,
  index,
}: {
  icon: string;
  name: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="group relative flex items-center gap-3 p-3 rounded-xl bg-white/[0.08] border border-white/[0.12] backdrop-blur-sm hover:bg-white/[0.12] hover:border-primary/40 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${0.8 + index * 0.1}s`, animationFillMode: 'backwards' }}
    >
      {/* Icon container */}
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 border border-white/10">
        <span className="text-2xl">{icon}</span>
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="font-bold text-[15px] text-white truncate">{name}</p>
        <p className="text-sm text-white/70 truncate">{description}</p>
      </div>

      {/* Checkmark */}
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-400">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
}

export function CompletionScreen() {
  const { achievements, startTime, resetTutorial, unlockAchievement } = useTutorialStore();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    unlockAchievement('graduate');
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [unlockAchievement]);

  const totalTime = startTime
    ? Math.round((Date.now() - new Date(startTime).getTime()) / 1000 / 60)
    : 0;

  // Generate confetti particles
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    left: Math.random() * 100,
  }));

  return (
    <div className="relative flex h-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden bg-gradient-to-b from-terminal-bg via-terminal-bg to-primary/5">
      {/* Confetti layer */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {confettiParticles.map((p) => (
            <ConfettiParticle key={p.id} delay={p.delay} left={p.left} />
          ))}
        </div>
      )}

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Trophy header */}
        <div className="text-center space-y-4 animate-fade-in-up" style={{ animationDelay: '0s' }}>
          {/* Trophy icon with glow */}
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-2xl opacity-50 animate-pulse-glow" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-primary shadow-warm-lg">
              <Trophy className="h-10 w-10 text-white drop-shadow-lg" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              おめでとうございます!
            </h1>
            <p className="text-white/70 text-lg">
              Claude Code体験ツアーを完走しました
            </p>
          </div>

          {/* Time badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 animate-fade-in-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
          >
            <Clock className="h-4 w-4 text-white/60" />
            <span className="text-sm font-medium text-white/80">
              完了時間: <span className="text-white font-bold">{totalTime || '< 1'}分</span>
            </span>
          </div>
        </div>

        {/* Achievements section */}
        <div
          className="space-y-3 animate-fade-in-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <h2 className="font-bold text-sm uppercase tracking-wider text-white/90">
              獲得した実績
            </h2>
          </div>

          <div className="grid gap-2">
            {achievements.map((achievement, index) => (
              <AchievementBadge
                key={achievement.id}
                icon={achievement.icon}
                name={achievement.name}
                description={achievement.description}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Business tip card */}
        <div
          className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent p-4 animate-fade-in-up"
          style={{ animationDelay: '1.2s', animationFillMode: 'backwards' }}
        >
          {/* Decorative corner */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-500/30 rounded-full blur-xl" />

          <div className="relative space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/30">
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
              <h3 className="font-bold text-white">ビジネス活用のヒント</h3>
            </div>
            <p className="text-sm text-white/80 leading-relaxed pl-9">
              CSV（Excel）で複数の企業URLリストを用意すれば、一社ずつ繰り返し分析することも可能。
              営業リサーチや競合分析の効率化に!
            </p>
          </div>
        </div>

        {/* Next steps */}
        <div
          className="space-y-3 animate-fade-in-up"
          style={{ animationDelay: '1.4s', animationFillMode: 'backwards' }}
        >
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-400" />
            <h2 className="font-bold text-sm uppercase tracking-wider text-white/90">
              次のステップ
            </h2>
          </div>

          <div className="space-y-3">
            {/* Primary CTA */}
            <a
              href="https://claude.ai/code"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full px-5 py-4 rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">💻</span>
                <span className="text-lg">実際のClaude Codeを使う</span>
              </span>
              <ExternalLink className="h-5 w-5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* Secondary CTA */}
            <button
              onClick={resetTutorial}
              className="group flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white/90 font-medium hover:bg-white/15 hover:border-white/30 hover:text-white transition-all duration-200"
            >
              <span className="flex items-center gap-3">
                <RotateCcw className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
                もう一度チュートリアルをする
              </span>
              <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Back to top */}
            <Link
              href="/"
              className="group flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 font-medium hover:bg-white/10 hover:border-white/20 hover:text-white/90 transition-all duration-200"
            >
              <span className="flex items-center gap-3">
                <Home className="h-4 w-4 text-white/50 group-hover:text-white/80 transition-colors" />
                トップページに戻る
              </span>
              <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div
          className="text-center pt-4 animate-fade-in-up"
          style={{ animationDelay: '1.6s', animationFillMode: 'backwards' }}
        >
          <p className="text-xs text-white/40">
            Made with ❤️ for Claude Code beginners
          </p>
        </div>
      </div>
    </div>
  );
}
