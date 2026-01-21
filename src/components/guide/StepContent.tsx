'use client';

import { Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { StepGuide, StepId } from '@/types/tutorial';

interface StepContentProps {
  guide: StepGuide;
  stepId: StepId;
}

export function StepContent({ guide, stepId }: StepContentProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Copy the command if available, otherwise copy the description
    const textToCopy = guide.mission.command || guide.mission.description;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isActiveStep = stepId > 0 && stepId <= 10;

  return (
    <div className="space-y-6">
      {/* Step indicator badge */}
      {isActiveStep && (
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-warm">
              <span className="text-lg font-bold">{stepId}</span>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-primary/30 blur-lg -z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              ステップ {stepId} / 10
            </span>
            <div className="mt-0.5 h-1 w-20 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${(stepId / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight">
        {guide.title}
      </h1>

      {/* Introduction */}
      <p className="text-muted-foreground leading-relaxed text-[15px]">
        {guide.introduction}
      </p>

      {/* Mission Card */}
      {isActiveStep && (
        <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 shadow-warm card-hover">
          {/* Decorative corner */}
          <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-primary/10 blur-2xl" />

          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              ミッション
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Mission description */}
            <p className="text-sm leading-relaxed text-foreground/90">
              {guide.mission.description}
            </p>

            {/* Copyable command (if available) */}
            {guide.mission.copyable && (guide.mission.command || guide.mission.description) && (
              <div className="rounded-lg bg-terminal-bg border border-terminal-text/10 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-terminal-success shrink-0">
                      {stepId <= 3 ? '$' : '>'}
                    </span>
                    <code className="font-mono text-sm text-terminal-text truncate">
                      {guide.mission.command || guide.mission.description}
                    </code>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 hover:bg-terminal-text/10 hover:text-terminal-text transition-colors"
                    onClick={handleCopy}
                    aria-label={copied ? 'コピーしました' : 'クリップボードにコピー'}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-terminal-success" />
                    ) : (
                      <Copy className="h-4 w-4 text-terminal-text/70" />
                    )}
                  </Button>
                </div>
                {copied && (
                  <p className="mt-2 text-xs text-terminal-success animate-fade-in">
                    コピーしました！ターミナルに貼り付けてEnter
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      {guide.tips && guide.tips.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <span className="text-lg">💡</span>
            ヒント
          </h3>
          <ul className="space-y-2">
            {guide.tips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-muted-foreground animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Knowledge Box */}
      {guide.knowledgeBox && (
        <Card className="bg-muted/30 border-muted-foreground/10">
          <CardContent className="pt-4">
            <h3 className="mb-2 text-sm font-semibold flex items-center gap-2">
              <span className="text-base">{guide.knowledgeBox.title.split(' ')[0]}</span>
              <span>{guide.knowledgeBox.title.split(' ').slice(1).join(' ')}</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {guide.knowledgeBox.content}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Technical Details */}
      {guide.technicalDetails && (
        <details className="group">
          <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <span className="text-base">📖</span>
            <span>{guide.technicalDetails.title}</span>
            <span className="ml-auto text-xs opacity-50 group-open:rotate-90 transition-transform">
              ▶
            </span>
          </summary>
          <div className="mt-3 rounded-lg bg-terminal-bg p-4 border border-terminal-text/10">
            <code className="font-mono text-sm text-terminal-text whitespace-pre-wrap">
              {guide.technicalDetails.content}
            </code>
          </div>
          {guide.technicalDetails.note && (
            <p className="mt-2 text-xs text-muted-foreground italic">
              {guide.technicalDetails.note}
            </p>
          )}
        </details>
      )}
    </div>
  );
}
