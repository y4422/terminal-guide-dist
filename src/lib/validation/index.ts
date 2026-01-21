import type { StepId, ValidationResult } from '@/types/tutorial';

// Keywords for each step validation
const STEP_KEYWORDS: Record<StepId, {
  action: string[];
  target: string[];
}> = {
  0: { action: [], target: [] },
  1: { action: [], target: [] }, // Install - no validation needed
  2: { action: [], target: [] }, // Terminal opening - no validation needed
  3: {
    action: ['cd'],
    target: ['desktop', 'documents', 'downloads', 'projects', '..', '~'],
  },
  4: {
    action: ['claude'],
    target: [],
  },
  5: {
    action: ['作', '作成', '作って', 'create', 'make', '作る'],
    target: ['フォルダ', 'ディレクトリ', 'folder', 'directory'],
  },
  6: {
    action: ['調査', '調べ', 'リサーチ', 'research', 'まとめ', '分析'],
    target: ['todo', 'Todo', 'TODO', 'タスク', 'アプリ', '競合', '.md', 'research'],
  },
  7: {
    action: ['確認', '追加', '足りない', 'check', 'review', 'add', '改善'],
    target: ['@', 'research', '.md'],
  },
  8: {
    action: ['要件', 'まとめ', 'requirements', '作', '作成', '決め'],
    target: ['要件', 'requirements', '.md', '調査', 'todo', 'Todo', 'TODO', 'アプリ'],
  },
  9: {
    action: ['レビュー', 'review', '視点', '確認', 'チェック'],
    target: ['@', 'requirements', '.md', '別の'],
  },
  10: {
    action: ['作', '作成', '開発', 'develop', 'create', '作って', '始め'],
    target: ['todo', 'Todo', 'TODO', 'アプリ', '基本', '構造', '要件'],
  },
  11: { action: [], target: [] }, // Completion - no validation
};

export function validateInput(input: string, stepId: StepId): ValidationResult {
  const lowerInput = input.toLowerCase().trim();
  const keywords = STEP_KEYWORDS[stepId];

  if (!keywords || (!keywords.action.length && !keywords.target.length)) {
    return { type: 'success', isValid: true };
  }

  const hasAction = keywords.action.some((kw) =>
    lowerInput.includes(kw.toLowerCase()) || input.includes(kw)
  );
  const hasTarget = keywords.target.length === 0 || keywords.target.some((kw) =>
    lowerInput.includes(kw.toLowerCase()) || input.includes(kw)
  );

  // Step-specific validation
  switch (stepId) {
    case 3: // cd command
      if (lowerInput.startsWith('cd ') || lowerInput === 'cd') {
        return { type: 'success', isValid: true };
      }
      return {
        type: 'hint',
        isValid: false,
        message: '「cd」コマンドを入力してください（例: cd Desktop）',
        hintLevel: 1,
        suggestions: ['cd Desktop', 'cd Documents', 'cd ..'],
      };

    case 4: // claude command
      if (lowerInput === 'claude' || lowerInput.startsWith('claude ')) {
        return { type: 'success', isValid: true };
      }
      return {
        type: 'hint',
        isValid: false,
        message: '「claude」と入力してください',
        hintLevel: 1,
        suggestions: ['claude'],
      };

    case 5: // Folder creation
      if (!hasAction && input.length > 3) {
        return {
          type: 'hint',
          isValid: false,
          message: '「作って」「作成して」などの言葉を使うと良いですよ',
          hintLevel: 1,
        };
      }
      if (hasAction && !hasTarget && input.length > 5) {
        return {
          type: 'hint',
          isValid: false,
          message: '「フォルダ」という言葉を入れてみましょう',
          hintLevel: 2,
        };
      }
      if (hasAction && hasTarget) {
        return { type: 'success', isValid: true };
      }
      break;

    case 6: // Competitive research (Plan Mode)
      if (!hasAction && input.length > 3) {
        return {
          type: 'hint',
          isValid: false,
          message: '「調査して」「まとめて」などの言葉を使うと良いですよ',
          hintLevel: 1,
        };
      }
      if (!hasTarget && input.length > 5) {
        return {
          type: 'hint',
          isValid: false,
          message: '「Todoアプリ」と出力ファイル「research.md」を指定してみましょう',
          hintLevel: 2,
        };
      }
      if (hasAction && hasTarget) {
        return { type: 'success', isValid: true };
      }
      break;

    case 7: // Review research results
      if (!hasTarget) {
        return {
          type: 'hint',
          isValid: false,
          message: '@research.md でファイルを指定してみましょう',
          hintLevel: 1,
        };
      }
      if (hasAction && hasTarget) {
        return { type: 'success', isValid: true };
      }
      break;

    case 8: // Create requirements
      if (!hasAction && input.length > 3) {
        return {
          type: 'hint',
          isValid: false,
          message: '上のミッションをそのままコピーして入力してみましょう!',
          hintLevel: 1,
        };
      }
      if (!hasTarget && input.length > 5) {
        return {
          type: 'hint',
          isValid: false,
          message: '「Todoアプリ」と「requirements.md」を含めてみましょう',
          hintLevel: 2,
        };
      }
      if (hasAction && hasTarget) {
        return { type: 'success', isValid: true };
      }
      break;

    case 9: // Multi-model review
      if (!hasTarget) {
        return {
          type: 'hint',
          isValid: false,
          message: '@requirements.md でファイルを指定してみましょう',
          hintLevel: 1,
        };
      }
      if (!hasAction && input.length > 3) {
        return {
          type: 'hint',
          isValid: false,
          message: '「レビューして」「確認して」などの言葉を追加してみましょう',
          hintLevel: 2,
        };
      }
      if (hasAction && hasTarget) {
        return { type: 'success', isValid: true };
      }
      break;

    case 10: // Start development
      if (!hasAction && input.length > 3) {
        return {
          type: 'hint',
          isValid: false,
          message: '「作って」「開発して」などの言葉を使うと良いですよ',
          hintLevel: 1,
        };
      }
      if (!hasTarget && input.length > 5) {
        return {
          type: 'hint',
          isValid: false,
          message: '「Todoアプリ」や「基本構造」などのキーワードを追加してみましょう',
          hintLevel: 2,
        };
      }
      if (hasAction && hasTarget) {
        return { type: 'success', isValid: true };
      }
      break;
  }

  // Default validation
  if (input.length < 3) {
    return {
      type: 'hint',
      isValid: false,
      message: 'もう少し詳しく入力してください',
      hintLevel: 1,
    };
  }

  // Fallback - accept if reasonable length
  if (input.length >= 10 && (hasAction || hasTarget)) {
    return { type: 'success', isValid: true };
  }

  return {
    type: 'hint',
    isValid: false,
    message: 'もう少し詳しく教えてください',
    hintLevel: 1,
    suggestions: getSuggestions(stepId),
  };
}

function getSuggestions(stepId: StepId): string[] {
  switch (stepId) {
    case 3:
      return ['cd Desktop', 'cd Documents', 'cd projects'];
    case 4:
      return ['claude'];
    case 5:
      return ['my-projectフォルダを作って', 'projectという名前のフォルダを作って'];
    case 6:
      return ['Todoアプリの競合サービスを調査して、research.mdにまとめて'];
    case 7:
      return ['@research.md の内容を確認して、足りない情報があれば追加して'];
    case 8:
      return ['調査結果をもとに、Todoアプリの要件をrequirements.mdにまとめて'];
    case 9:
      return ['@requirements.md を別の視点からレビューして'];
    case 10:
      return ['要件に沿ってTodoアプリの基本構造を作って'];
    default:
      return [];
  }
}
