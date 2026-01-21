'use client';

import { Progress } from '@/components/ui/progress';
import { useTutorialStore } from '@/store/tutorial';

export function Header() {
  const { completedSteps, currentStep } = useTutorialStore();

  // Calculate progress: only count steps 1-10 (actual tutorial steps)
  // Step 0 is intro, step 11 is completion screen
  const totalSteps = 10;
  const actualCompletedSteps = completedSteps.filter(step => step >= 1 && step <= 10);
  const progress = (actualCompletedSteps.length / totalSteps) * 100;

  return (
    <header className="relative border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-accent/[0.02] pointer-events-none" />

      <div className="container relative flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Logo icon */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-warm">
            <span className="text-lg font-bold text-primary-foreground">C</span>
            {/* Subtle glow */}
            <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md -z-10" />
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">
              <span className="text-gradient">Claude Code</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Tutorial
            </span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="flex items-center gap-6">
          {/* Step indicators */}
          <div className="hidden sm:flex items-center gap-1.5">
            {Array.from({ length: totalSteps + 1 }, (_, i) => {
              const isCompleted = completedSteps.includes(i as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10);
              const isCurrent = currentStep === i;

              return (
                <div
                  key={i}
                  className={`
                    relative h-2 w-2 rounded-full transition-all duration-300
                    ${isCompleted
                      ? 'bg-primary shadow-glow-sm'
                      : isCurrent
                        ? 'bg-primary/50 animate-pulse-glow'
                        : 'bg-muted-foreground/20'
                    }
                  `}
                >
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">進捗</span>
              <span className="font-semibold tabular-nums">
                {actualCompletedSteps.length}
                <span className="text-muted-foreground/60">/{totalSteps}</span>
              </span>
            </div>

            <div className="w-28 sm:w-36">
              <div className="relative">
                <Progress
                  value={progress}
                  className="h-2 bg-muted/50"
                />
                {progress > 0 && (
                  <div
                    className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-primary to-accent progress-glow"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </div>
            </div>

            <span className="text-sm font-bold tabular-nums text-primary">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </header>
  );
}
