'use client';

import { ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTutorialStore } from '@/store/tutorial';
import type { StepId } from '@/types/tutorial';

export function NavigationButtons() {
  const { currentStep, completedSteps, goToStep, skipStep } = useTutorialStore();

  const canGoBack = currentStep > 0;
  // Step 11 is completion screen, so we can go forward until step 10
  const canGoForward = completedSteps.includes(currentStep) && currentStep < 11;
  const canSkip = currentStep > 0 && currentStep < 11 && !completedSteps.includes(currentStep);

  const handleBack = () => {
    if (canGoBack) {
      goToStep((currentStep - 1) as StepId);
    }
  };

  const handleNext = () => {
    if (canGoForward) {
      goToStep((currentStep + 1) as StepId);
    }
  };

  const handleSkip = () => {
    if (canSkip) {
      skipStep(currentStep);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={handleBack}
        disabled={!canGoBack}
        className="gap-1.5 border-border/60 hover:bg-muted/50 hover:border-border transition-all"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">前へ</span>
      </Button>

      <div className="flex items-center gap-2">
        {canSkip && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <SkipForward className="h-4 w-4" />
            <span className="hidden sm:inline">スキップ</span>
          </Button>
        )}

        <Button
          variant="default"
          size="sm"
          onClick={handleNext}
          disabled={!canGoForward}
          className="gap-1.5 btn-shine bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-warm transition-all"
        >
          <span className="hidden sm:inline">次へ</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
