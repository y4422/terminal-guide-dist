'use client';

import { useState, useEffect, useMemo } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTutorialStore } from '@/store/tutorial';
import type { StepId } from '@/types/tutorial';

interface HintBoxProps {
  stepId: StepId;
}

const HINT_MESSAGES: Record<StepId, string[]> = {
  0: [], // Intro
  1: [], // ターミナルを知ろう - instructions only
  2: [
    '「cd」の後にスペースを入れて、フォルダ名を指定します',
    '「cd Desktop」「cd Documents」のように入力してみて',
    '上の「cd Desktop」をコピーして入力してください',
  ],
  3: [
    '小文字で「claude」と入力してEnterを押します',
    'クォート（"）は不要です、そのまま「claude」と入力',
    '「claude」をコピーして入力してください',
  ],
  4: [
    '「〇〇して」という形で伝えてみましょう',
    '「my-projectフォルダを作って」のように具体的に',
    '「my-projectフォルダを作って」をコピーして入力してください',
  ],
  5: [
    'そのまま入力すればOK、Claudeが自動でWeb検索します',
    '調査対象のURL（例: https://todoist.com）があればより詳細に分析できます',
    '「Todoアプリの競合サービスを調査して、research.mdにまとめて」をコピーして入力',
  ],
  6: [
    '@ファイル名 でファイルをClaudeに渡せます',
    '「確認して」「追加して」などで編集を依頼できます',
    '「@research.md の内容を確認して、足りない情報があれば追加して」をコピーして入力',
  ],
  7: [
    '上のミッションをそのままコピーして入力すればOKです!',
    'Claudeが調査結果を読んで、自動で「作るものリスト」を作ってくれます',
    '「調査結果をもとに、Todoアプリの要件をrequirements.mdにまとめて」をコピーして入力',
  ],
  8: [
    '@ファイル名 でファイルをClaudeに渡せます',
    '「レビューして」「別の視点から」などで多角的な確認を依頼できます',
    '「@requirements.md を別の視点からレビューして」をコピーして入力',
  ],
  9: [
    '「作って」「開発して」などの言葉を使ってみましょう',
    '「Todoアプリ」「基本構造」などのキーワードを含めましょう',
    '「要件に沿ってTodoアプリの基本構造を作って」をコピーして入力',
  ],
  10: [], // インストール - instructions only
  11: [], // Completion
};

export function HintBox({ stepId }: HintBoxProps) {
  const { hintsShown, showHint, stepStates } = useTutorialStore();
  const [currentHintLevel, setCurrentHintLevel] = useState(0);
  const shownHints = useMemo(() => hintsShown[stepId] || [], [hintsShown, stepId]);
  const hints = HINT_MESSAGES[stepId];

  // Auto-show hints based on time elapsed
  useEffect(() => {
    const stepState = stepStates[stepId];
    if (!stepState.startTime) return;

    const timers: NodeJS.Timeout[] = [];

    // Level 1 hint after 30 seconds
    if (!shownHints.includes(1)) {
      const timer1 = setTimeout(() => {
        showHint(stepId, 1);
        setCurrentHintLevel(1);
      }, 30000);
      timers.push(timer1);
    }

    // Level 2 hint after 60 seconds
    if (!shownHints.includes(2)) {
      const timer2 = setTimeout(() => {
        showHint(stepId, 2);
        setCurrentHintLevel(2);
      }, 60000);
      timers.push(timer2);
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [stepId, stepStates, showHint, shownHints]);

  const handleShowHint = () => {
    const nextLevel = Math.min(currentHintLevel + 1, 3);
    showHint(stepId, nextLevel);
    setCurrentHintLevel(nextLevel);
  };

  if (hints.length === 0) return null;

  const displayedHints = hints.slice(0, Math.max(currentHintLevel, shownHints.length));

  return (
    <div className="space-y-3">
      {displayedHints.length > 0 && (
        <Card className="border-accent/40 bg-gradient-to-br from-accent/10 to-accent/5 animate-fade-in-up">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20">
                <Lightbulb className="h-3.5 w-3.5 text-accent" />
              </div>
              <div className="space-y-2 flex-1">
                {displayedHints.map((hint, index) => (
                  <p
                    key={index}
                    className="text-sm text-foreground/80 leading-relaxed animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {hint}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentHintLevel < 3 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShowHint}
          className="gap-2 text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          {currentHintLevel === 0 ? 'ヒントを見る' : 'もっとヒントを見る'}
        </Button>
      )}
    </div>
  );
}
