'use client';

import { useTutorialStore } from '@/store/tutorial';
import { STEP_GUIDES } from '@/types/tutorial';
import { StepContent } from './StepContent';
import { NavigationButtons } from './NavigationButtons';
import { HintBox } from './HintBox';

export function GuidePanel() {
  const { currentStep } = useTutorialStore();
  const guide = STEP_GUIDES[currentStep];

  return (
    <div className="flex h-full flex-col">
      {/* Main content area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-6 lg:p-8 animate-fade-in-up">
          <StepContent guide={guide} stepId={currentStep} />

          {/* Hint box for active steps */}
          {currentStep > 0 && currentStep < 7 && (
            <div className="mt-6">
              <HintBox stepId={currentStep} />
            </div>
          )}
        </div>
      </div>

      {/* Navigation footer */}
      <div className="shrink-0 border-t border-border/50 bg-background/50 backdrop-blur-sm p-4 lg:p-6">
        <NavigationButtons />
      </div>
    </div>
  );
}
