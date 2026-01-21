'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useTutorialStore } from '@/store/tutorial';
import { validateInput } from '@/lib/validation';
import { FileTree } from './FileTree';
import { CompletionScreen } from './CompletionScreen';
import type { StepId, CommandResponse } from '@/types/tutorial';

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [claudeStarted, setClaudeStarted] = useState(false);
  const [currentPath, setCurrentPath] = useState('~');
  const [outputs, setOutputs] = useState<Array<{
    type: 'user' | 'claude' | 'system' | 'success' | 'error' | 'prompt';
    content: string;
  }>>([]);
  const [initializedStep, setInitializedStep] = useState<StepId | null>(null);

  const {
    currentStep,
    addCommand,
    completeStep,
    createDirectory,
    createFile,
    unlockAchievement,
    fileSystem,
  } = useTutorialStore();

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputs, inputValue]);

  // Focus input on mount and step change
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentStep]);

  // Initialize terminal state based on current step
  useEffect(() => {
    // Skip if already initialized for this step
    if (initializedStep === currentStep) return;

    // Step 2-3: Terminal mode (before Claude is started)
    // Step 4+: Claude Code mode
    if (currentStep === 2) {
      // Step 2: Fresh terminal, user needs to cd
      setClaudeStarted(false);
      setCurrentPath('~');
      setOutputs([]);
    } else if (currentStep === 3) {
      // Step 3: User already did cd, now needs to run claude
      setClaudeStarted(false);
      setCurrentPath('~/Desktop');
      setOutputs([
        { type: 'prompt', content: '~ $ cd Desktop' },
      ]);
    } else if (currentStep >= 4) {
      // Claude Code mode for step 4 and beyond
      setClaudeStarted(true);
      setCurrentPath('~/Desktop');
      // Show Claude startup context
      setOutputs([
        { type: 'system', content: `╭─────────────────────────────────────╮
│                                     │
│   🤖 ClaudeCode へようこそ!        │
│                                     │
│   日本語で話しかけてください        │
│   何でもお手伝いします!             │
│                                     │
╰─────────────────────────────────────╯` },
      ]);
    }

    setInitializedStep(currentStep);
  }, [currentStep, initializedStep]);

  const getPrompt = useCallback(() => {
    if (claudeStarted) {
      return '>';
    }
    return `${currentPath} $`;
  }, [claudeStarted, currentPath]);

  const simulateResponse = useCallback(async (
    input: string,
    stepId: StepId
  ): Promise<CommandResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const validation = validateInput(input, stepId);

    if (!validation.isValid) {
      return {
        type: 'clarification',
        message: validation.message || 'コマンドを確認してください',
        suggestions: validation.suggestions,
      };
    }

    switch (stepId) {
      case 2: // cd command
        const targetDir = input.replace('cd ', '').trim() || '~';
        let newPath = currentPath;
        if (targetDir === '..') {
          const parts = currentPath.split('/');
          parts.pop();
          newPath = parts.length > 0 ? parts.join('/') : '~';
        } else if (targetDir === '~') {
          newPath = '~';
        } else if (targetDir.startsWith('/')) {
          newPath = targetDir;
        } else {
          newPath = currentPath === '~' ? `~/${targetDir}` : `${currentPath}/${targetDir}`;
        }
        setCurrentPath(newPath);
        unlockAchievement('navigator');
        return {
          type: 'success',
          output: `${newPath}`,
          message: '🎉 フォルダを移動できました!',
        };

      case 3: // claude command
        setClaudeStarted(true);
        unlockAchievement('claude-starter');
        return {
          type: 'success',
          output: `╭─────────────────────────────────────╮
│                                     │
│   🤖 ClaudeCode へようこそ!        │
│                                     │
│   日本語で話しかけてください        │
│   何でもお手伝いします!             │
│                                     │
╰─────────────────────────────────────╯`,
          message: '🎉 ClaudeCodeが起動しました!',
        };

      case 4: // Folder creation with Claude
        createDirectory('~', 'my-project');
        unlockAchievement('first-command');
        return {
          type: 'success',
          claudeMessage: '了解しました! my-projectフォルダを作成しますね。',
          executedCommand: 'mkdir my-project',
          output: '✅ 完了しました!\n\n📁 現在のファイル構造:\n~/Desktop/\n└─ 📁 my-project (新規作成!)',
          message: '🎉 素晴らしい! プロジェクトフォルダが作成されました!',
        };

      case 5: // Competitive research (Plan Mode)
        const researchContent = `# Todoアプリ 競合調査レポート

## 調査対象
- Todoist
- TickTick
- Microsoft To Do

## UI/UX比較
| 機能 | Todoist | TickTick | MS To Do |
|------|---------|----------|----------|
| ダークモード | ✅ | ✅ | ✅ |
| サブタスク | ✅ | ✅ | ✅ |
| タグ機能 | ✅ | ✅ | ❌ |
| 繰り返しタスク | ✅ | ✅ | ✅ |

## オンボーディング分析
- **Todoist**: シンプルなチュートリアル、すぐに使い始められる
- **TickTick**: 機能紹介スライド、カスタマイズオプション豊富
- **MS To Do**: Microsoft連携を前面に、シンプルな初期設定

## 料金プラン
| サービス | 無料プラン | 有料プラン |
|---------|-----------|-----------|
| Todoist | 5プロジェクト | $4/月〜 |
| TickTick | 基本機能 | $2.79/月〜 |
| MS To Do | 全機能無料 | - |`;
        createFile('~/my-project', 'research.md', researchContent, 'markdown');
        unlockAchievement('researcher');
        return {
          type: 'success',
          claudeMessage: 'Plan Modeを開始します! Todoアプリの競合調査を実施しますね。',
          executedCommand: '🔍 Plan Mode → WebSearch → 分析 → ファイル作成',
          output: `🔍 Plan Mode を開始します...

## 調査計画
1. 主要Todoアプリの特定
2. 各サービスのUI/UX分析
3. 機能比較表の作成
4. オンボーディングフロー調査

[調査中...] Todoist, TickTick, Microsoft To Do を分析

✅ research.md を作成しました!

📝 research.md:
──────────────
${researchContent}
──────────────

💡 @research.md で内容を参照できます!`,
          message: '🎉 競合調査が完了しました!',
        };

      case 6: // Review research results
        const updatedResearchContent = `# Todoアプリ 競合調査レポート

## 調査対象
- Todoist
- TickTick
- Microsoft To Do

## UI/UX比較
| 機能 | Todoist | TickTick | MS To Do |
|------|---------|----------|----------|
| ダークモード | ✅ | ✅ | ✅ |
| サブタスク | ✅ | ✅ | ✅ |
| タグ機能 | ✅ | ✅ | ❌ |
| 繰り返しタスク | ✅ | ✅ | ✅ |

## オンボーディング分析
- **Todoist**: シンプルなチュートリアル、すぐに使い始められる
- **TickTick**: 機能紹介スライド、カスタマイズオプション豊富
- **MS To Do**: Microsoft連携を前面に、シンプルな初期設定

## 料金プラン
| サービス | 無料プラン | 有料プラン |
|---------|-----------|-----------|
| Todoist | 5プロジェクト | $4/月〜 |
| TickTick | 基本機能 | $2.79/月〜 |
| MS To Do | 全機能無料 | - |

## モバイルアプリ対応状況
| サービス | iOS | Android | Web |
|---------|-----|---------|-----|
| Todoist | ✅ | ✅ | ✅ |
| TickTick | ✅ | ✅ | ✅ |
| MS To Do | ✅ | ✅ | ✅ |

## API/連携機能
- **Todoist**: REST API、Zapier、IFTTT対応
- **TickTick**: API限定公開、カレンダー連携
- **MS To Do**: Microsoft Graph API、Outlook連携`;
        createFile('~/my-project', 'research.md', updatedResearchContent, 'markdown');
        unlockAchievement('reviewer');
        return {
          type: 'success',
          claudeMessage: '@research.md を確認しました。いくつか足りない情報を追加しますね!',
          executedCommand: 'ファイル読み込み → 分析 → 追記',
          output: `📝 research.md を確認しました。

## 追加した情報
- 📱 モバイルアプリ対応状況
- 🔗 API/連携機能

✅ ファイルを更新しました!`,
          message: '🎉 調査レポートが改善されました!',
        };

      case 7: // Create requirements
        const requirementsContent = `# Todoアプリ 要件定義書

## 概要
競合調査を踏まえた、差別化されたTodoアプリの要件

## 必須機能（MVP）
- [ ] タスク追加・編集・削除
- [ ] 完了/未完了の切り替え
- [ ] ローカルストレージ保存
- [ ] レスポンシブデザイン

## 差別化機能
- [ ] AIによるタスク優先度提案
- [ ] 自然言語でのタスク入力
- [ ] ダークモード対応

## 非機能要件
- レスポンス: 100ms以内
- アクセシビリティ: WCAG 2.1 AA準拠
- オフライン対応: PWA化

## 技術スタック
- フロントエンド: HTML/CSS/JavaScript
- ストレージ: LocalStorage
- 将来的な拡張: IndexedDB, Service Worker`;
        createFile('~/my-project', 'requirements.md', requirementsContent, 'markdown');
        unlockAchievement('architect');
        return {
          type: 'success',
          claudeMessage: '調査結果を踏まえて、requirements.mdに要件をまとめますね!',
          executedCommand: '@research.md 参照 → 要件整理 → ファイル作成',
          output: `📋 要件定義を作成しています...

調査結果を参照:
- 競合の強み/弱みを分析
- 差別化ポイントを特定
- 技術的な実現可能性を検討

✅ requirements.md を作成しました!

📝 requirements.md:
──────────────
${requirementsContent}
──────────────`,
          message: '🎉 要件定義が作成されました!',
        };

      case 8: // Multi-model review
        unlockAchievement('multi-perspective');
        return {
          type: 'success',
          claudeMessage: '@requirements.md を複数の観点からレビューしますね!',
          executedCommand: 'セキュリティ分析 → パフォーマンス分析 → UX分析',
          output: `🤖 複数の観点からレビューを実施します...

## セキュリティ観点
⚠️ ローカルストレージのXSS対策を追加推奨
💡 入力値のサニタイズ処理が必要

## パフォーマンス観点
✅ 100ms目標は適切
💡 大量タスク時の仮想スクロール検討

## ユーザビリティ観点
✅ 基本機能は網羅
💡 キーボードショートカット対応を推奨
💡 オフライン対応の優先度を上げることを推奨

## 改善提案
1. 📌 データのサニタイズ処理を追加
2. 📌 PWA化でオフライン対応
3. 📌 キーボードショートカット対応
4. 📌 エラーハンドリングの明記

✅ レビュー完了!`,
          message: '🎉 マルチ視点レビューが完了しました!',
        };

      case 9: // Start development
        const indexHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>📝 Todo App</h1>
    <div class="input-group">
      <input type="text" id="taskInput" placeholder="タスクを入力...">
      <button id="addBtn">追加</button>
    </div>
    <ul id="taskList"></ul>
  </div>
  <script src="app.js"></script>
</body>
</html>`;
        const stylesCss = `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f5f5f5; padding: 20px; }
.container { max-width: 500px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
h1 { text-align: center; margin-bottom: 20px; }
.input-group { display: flex; gap: 10px; margin-bottom: 20px; }
input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
button { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
ul { list-style: none; }
li { padding: 10px; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 10px; }
li.completed span { text-decoration: line-through; color: #888; }`;
        const appJs = `const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function render() {
  taskList.innerHTML = tasks.map((task, i) => \`
    <li class="\${task.done ? 'completed' : ''}">
      <input type="checkbox" \${task.done ? 'checked' : ''} onchange="toggle(\${i})">
      <span>\${task.text}</span>
      <button onclick="remove(\${i})">削除</button>
    </li>
  \`).join('');
}

function add() {
  if (taskInput.value.trim()) {
    tasks.push({ text: taskInput.value, done: false });
    taskInput.value = '';
    save();
  }
}

function toggle(i) { tasks[i].done = !tasks[i].done; save(); }
function remove(i) { tasks.splice(i, 1); save(); }
function save() { localStorage.setItem('tasks', JSON.stringify(tasks)); render(); }

addBtn.onclick = add;
taskInput.onkeypress = e => e.key === 'Enter' && add();
render();`;
        createFile('~/my-project', 'index.html', indexHtml, 'html');
        createFile('~/my-project', 'styles.css', stylesCss, 'css');
        createFile('~/my-project', 'app.js', appJs, 'javascript');
        unlockAchievement('developer');
        return {
          type: 'success',
          claudeMessage: '要件に沿ってTodoアプリの基本構造を作成しますね!',
          executedCommand: '@requirements.md 参照 → コード生成 → ファイル作成',
          output: `🚀 開発を開始します!

## 作成するファイル
- index.html (画面構造)
- styles.css (デザイン)
- app.js (動作ロジック)

[作成中...]

✅ 基本構造が完成しました!

📁 my-project/
├── index.html
├── styles.css
├── app.js
├── research.md
└── requirements.md

🎉 おめでとうございます!
調査から要件定義、実装まで一連の開発フローを体験しました!`,
          message: '🎉 Todoアプリの開発が完了しました!',
        };

      default:
        return {
          type: 'info',
          message: 'このステップでは入力は不要です',
        };
    }
  }, [currentPath, createDirectory, createFile, unlockAchievement]);

  const handleSubmit = useCallback(async () => {
    if (!inputValue.trim() || isProcessing) return;

    const input = inputValue.trim();
    setInputValue('');
    setIsProcessing(true);

    // Add user input to output with appropriate prompt
    if (claudeStarted) {
      setOutputs((prev) => [...prev, { type: 'user', content: `> ${input}` }]);
    } else {
      setOutputs((prev) => [...prev, { type: 'prompt', content: `${currentPath} $ ${input}` }]);
    }

    // Add command to history
    const command = {
      id: `cmd_${Date.now()}`,
      stepId: currentStep,
      input,
      timestamp: new Date(),
    };

    // Get response
    const response = await simulateResponse(input, currentStep);

    // Add response to output
    if (response.claudeMessage) {
      setOutputs((prev) => [...prev, { type: 'claude', content: `🤖 Claude: ${response.claudeMessage}` }]);
    }

    if (response.executedCommand) {
      setOutputs((prev) => [...prev, { type: 'system', content: `$ ${response.executedCommand}` }]);
    }

    if (response.output) {
      const outputContent = response.output;
      setOutputs((prev) => [...prev, { type: 'system', content: outputContent }]);
    }

    if (response.type === 'success') {
      setOutputs((prev) => [...prev, { type: 'success', content: response.message }]);
      setTimeout(() => {
        completeStep(currentStep);
      }, 1500);
    } else if (response.type === 'error') {
      setOutputs((prev) => [...prev, { type: 'error', content: response.message }]);
    } else if (response.type === 'clarification') {
      const suggestionOutputs = (response.suggestions || []).map((s: string) => ({
        type: 'system' as const,
        content: `  💡 ${s}`,
      }));
      setOutputs((prev) => [
        ...prev,
        { type: 'error', content: `❌ ${response.message}` },
        ...suggestionOutputs,
      ]);
    }

    addCommand({ ...command, response });
    setIsProcessing(false);
  }, [inputValue, isProcessing, currentStep, claudeStarted, currentPath, simulateResponse, addCommand, completeStep]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Intro screen
  if (currentStep === 0) {
    return <IntroScreen />;
  }

  // Completion screen
  if (currentStep === 10) {
    return <CompletionScreen />;
  }

  // Step 1: Terminal opening instructions (no input needed)
  if (currentStep === 1) {
    return <TerminalOpeningScreen />;
  }

  return (
    <div
      ref={terminalRef}
      className="flex h-full flex-col font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* File Tree - only show when Claude is running */}
      {claudeStarted && (
        <div className="border-b border-terminal-text/10 p-3">
          <FileTree fileSystem={fileSystem} />
        </div>
      )}

      {/* Terminal Output & Input - unified scrollable area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 scrollbar-thin"
      >
        {/* Initial terminal welcome message */}
        {outputs.length === 0 && !claudeStarted && (
          <div className="text-terminal-text/60 mb-2">
            {currentStep === 2 && (
              <div className="mb-4">Last login: {new Date().toLocaleString('ja-JP')}</div>
            )}
          </div>
        )}

        {/* Output history */}
        <div className="space-y-1">
          {outputs.map((output, index) => (
            <div
              key={index}
              className={`whitespace-pre-wrap ${
                output.type === 'user' ? 'text-terminal-text' :
                output.type === 'claude' ? 'text-primary' :
                output.type === 'success' ? 'text-terminal-success font-medium' :
                output.type === 'error' ? 'text-terminal-error' :
                output.type === 'prompt' ? 'text-terminal-text' :
                'text-terminal-text/80'
              }`}
            >
              {output.content}
            </div>
          ))}
        </div>

        {/* Processing indicator */}
        {isProcessing && (
          <div className="text-terminal-warning mt-2">
            {claudeStarted ? '🤖 考え中...' : '処理中...'}
          </div>
        )}

        {/* Current input line - terminal style */}
        {!isProcessing && (
          <div className="flex items-center mt-2 text-terminal-text">
            {/* Prompt */}
            <span className={claudeStarted ? 'text-terminal-success mr-1' : 'text-terminal-text/70 mr-2'}>
              {getPrompt()}
            </span>

            {/* Input area - inline with prompt */}
            <div className="flex-1 flex items-center min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isProcessing}
                className="flex-1 bg-transparent text-terminal-text outline-none border-none caret-transparent min-w-0"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              {/* Blinking cursor after text */}
              <span
                className="text-terminal-cursor animate-cursor-blink ml-0 -translate-x-full pointer-events-none"
                style={{ marginLeft: `-${inputValue.length > 0 ? 0 : 0}ch` }}
              >
                █
              </span>
            </div>
          </div>
        )}

        {/* Subtle hint for beginners - only show when no input yet */}
        {!isProcessing && outputs.length === 0 && inputValue === '' && (
          <div className="text-terminal-text/30 text-xs mt-4">
            {claudeStarted
              ? '日本語で話しかけてください'
              : 'コマンドを入力して Enter'
            }
          </div>
        )}
      </div>
    </div>
  );
}

// Intro Screen Component
function IntroScreen() {
  const { startTutorial, goToStep } = useTutorialStore();

  const handleStart = () => {
    startTutorial();
    goToStep(1);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-terminal-text">
      <div className="max-w-md text-center space-y-8">
        <h1 className="text-3xl font-bold">👋 ClaudeCodeの世界へようこそ!</h1>

        <div className="space-y-4 text-left">
          <p className="text-terminal-text/80">
            このチュートリアルでは、以下のことを体験できます:
          </p>
          <ul className="space-y-2">
            {[
              { icon: '🖥️', text: 'ターミナルの基本を知る' },
              { icon: '🧭', text: 'cdコマンドでフォルダを移動' },
              { icon: '🤖', text: 'ClaudeCodeを起動する' },
              { icon: '💬', text: 'Claudeに日本語で話しかける' },
              { icon: '📄', text: 'ファイルやプログラムを作る' },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-terminal-text/60">⏱️ 所要時間: 約10分</p>
          <p className="text-terminal-text/60">📊 難易度: ★☆☆☆☆ (初心者向け)</p>
        </div>

        <button
          onClick={handleStart}
          className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
        >
          チュートリアルを始める →
        </button>
      </div>
    </div>
  );
}

// Terminal Opening Screen (Step 1)
function TerminalOpeningScreen() {
  const { completeStep, unlockAchievement } = useTutorialStore();

  const handleConfirm = () => {
    unlockAchievement('terminal-opener');
    completeStep(1);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-terminal-text">
      <div className="max-w-lg space-y-8">
        <h2 className="text-2xl font-bold text-center">🖥️ ターミナルを開こう</h2>

        <div className="bg-terminal-text/5 rounded-lg p-6 space-y-4">
          <p className="text-terminal-text/80">
            お使いのOSに合わせて、ターミナルを開いてください:
          </p>

          <div className="space-y-4">
            <div className="border border-terminal-text/20 rounded p-4">
              <h3 className="font-bold flex items-center gap-2">
                <span>🍎</span> Mac
              </h3>
              <p className="text-sm text-terminal-text/70 mt-2">
                <kbd className="bg-terminal-text/10 px-2 py-0.5 rounded">⌘</kbd> + <kbd className="bg-terminal-text/10 px-2 py-0.5 rounded">Space</kbd> で Spotlight を開き、<br />
                「ターミナル」と入力して Enter
              </p>
            </div>

            <div className="border border-terminal-text/20 rounded p-4">
              <h3 className="font-bold flex items-center gap-2">
                <span>🪟</span> Windows
              </h3>
              <p className="text-sm text-terminal-text/70 mt-2">
                スタートメニューで「PowerShell」と検索してクリック
              </p>
            </div>

            <div className="border border-terminal-text/20 rounded p-4">
              <h3 className="font-bold flex items-center gap-2">
                <span>💻</span> VS Code
              </h3>
              <p className="text-sm text-terminal-text/70 mt-2">
                メニューの「表示」→「ターミナル」<br />
                または <kbd className="bg-terminal-text/10 px-2 py-0.5 rounded">Ctrl</kbd> + <kbd className="bg-terminal-text/10 px-2 py-0.5 rounded">`</kbd>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleConfirm}
            className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            ターミナルを開きました! →
          </button>
        </div>
      </div>
    </div>
  );
}

// CompletionScreen is now imported from ./CompletionScreen
