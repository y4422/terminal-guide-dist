// Tutorial Step Types
export type StepId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // 0=intro, 1-9=steps, 10=completion

export type StepStatus = 'not-started' | 'in-progress' | 'completed' | 'skipped';

export interface StepState {
  stepId: StepId;
  status: StepStatus;
  attempts: number;
  hintsUsed: number;
  startTime?: Date;
  endTime?: Date;
}

// File System Types
export interface VirtualFile {
  name: string;
  type: 'file';
  content: string;
  language?: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface VirtualDirectory {
  name: string;
  type: 'directory';
  children: (VirtualFile | VirtualDirectory)[];
  createdAt: Date;
}

export type FileSystemNode = VirtualFile | VirtualDirectory;

export interface FileSystem {
  root: VirtualDirectory;
  currentPath: string;
}

// Command Types
export interface Command {
  id: string;
  stepId: StepId;
  input: string;
  timestamp: Date;
  response?: CommandResponse;
}

export interface CommandResponse {
  type: 'success' | 'error' | 'clarification' | 'info';
  message: string;
  claudeMessage?: string;
  executedCommand?: string;
  output?: string;
  suggestions?: string[];
}

// Validation Types
export type ValidationResultType = 'success' | 'hint' | 'error' | 'neutral';

export interface ValidationResult {
  type: ValidationResultType;
  isValid: boolean;
  message?: string;
  hintLevel?: 1 | 2 | 3;
  suggestions?: string[];
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

// User Progress Types
export interface UserProgress {
  sessionId: string;
  currentStep: StepId;
  completedSteps: StepId[];
  stepStates: Record<StepId, StepState>;
  startTime: Date;
  achievements: Achievement[];
  lastSavedAt?: Date;
}

// Step Content Types
export interface StepGuide {
  title: string;
  introduction: string;
  mission: {
    description: string;  // What you're trying to achieve
    command?: string;     // What to actually type (if different from description)
    copyable?: boolean;
  };
  tips?: string[];
  knowledgeBox?: {
    title: string;
    content: string;
  };
  technicalDetails?: {
    title: string;
    content: string;
    note?: string;
  };
}

export const STEP_GUIDES: Record<StepId, StepGuide> = {
  0: {
    title: 'ClaudeCodeの世界へようこそ!',
    introduction: 'このチュートリアルでは、ターミナルの基本操作からClaudeCodeの使い方まで、一歩ずつ学んでいきます。',
    mission: {
      description: 'チュートリアルを始める',
    },
    tips: [
      '約10分で完了します',
      'プログラミング経験は不要です',
      'ターミナルを触ったことがなくても大丈夫!',
    ],
  },
  1: {
    title: 'ステップ1: ターミナルを知ろう',
    introduction: 'ターミナル（黒い画面）は、文字を打ってパソコンを操作するツールです。最初は怖く見えますが、実はとてもシンプル!',
    mission: {
      description: 'ターミナルを開いてみましょう。Macなら「ターミナル」アプリ、Windowsなら「PowerShell」を起動します。',
      copyable: false,
    },
    tips: [
      'Mac: Spotlight (⌘+Space) で「ターミナル」と検索',
      'Windows: スタートメニューで「PowerShell」と検索',
      'VS Codeを使っている場合は、表示メニューから「ターミナル」を選択',
    ],
    knowledgeBox: {
      title: '💡 ターミナルとは?',
      content: 'GUI（マウスでクリック）の代わりに、キーボードで文字を打ってパソコンを操作する方法です。慣れると実はとても効率的!',
    },
  },
  2: {
    title: 'ステップ2: フォルダを移動しよう',
    introduction: 'ターミナルでは「cd」コマンドでフォルダ間を移動します。これはターミナルの最も基本的な操作の1つです。',
    mission: {
      description: 'デスクトップフォルダに移動しましょう',
      command: 'cd Desktop',
      copyable: true,
    },
    tips: [
      'cd = Change Directory（ディレクトリを変える）の略',
      'cd .. で1つ上のフォルダに戻れます',
      'cd ~ でホームフォルダに戻れます',
    ],
    knowledgeBox: {
      title: '📂 パスとは?',
      content: 'ファイルやフォルダの住所のようなもの。例: /Users/あなたの名前/Desktop',
    },
    technicalDetails: {
      title: 'よく使うcdコマンド',
      content: 'cd フォルダ名  # 移動\ncd ..         # 1つ上へ\ncd ~          # ホームへ\npwd           # 今いる場所を確認',
      note: 'pwdで今どこにいるか確認できます',
    },
  },
  3: {
    title: 'ステップ3: ClaudeCodeを起動しよう',
    introduction: '準備ができました! いよいよClaudeCodeを起動します。「claude」と入力するだけです。',
    mission: {
      description: 'ClaudeCodeを起動しましょう',
      command: 'claude',
      copyable: true,
    },
    tips: [
      '小文字で「claude」と入力',
      'Enterキーで実行',
      '起動には数秒かかることがあります',
    ],
    knowledgeBox: {
      title: '🤖 ClaudeCodeとは?',
      content: 'AIアシスタントのClaudeをターミナルから使えるツール。日本語で話しかけるだけで、プログラミングやファイル操作を手伝ってくれます。',
    },
  },
  4: {
    title: 'ステップ4: プロジェクトフォルダを作ろう',
    introduction: 'ClaudeCodeが起動しました! まずはプロジェクト用のフォルダを作りましょう。日本語で話しかけるだけでOKです。',
    mission: {
      description: 'プロジェクト用のフォルダを作成しましょう',
      command: 'my-projectフォルダを作って',
      copyable: true,
    },
    tips: [
      '敬語じゃなくてもOK、日本語で自然に話しかけてください',
      'シンプルな指示でOK、Claudeが理解してくれます',
    ],
    knowledgeBox: {
      title: '📂 なぜプロジェクトフォルダが重要?',
      content: 'ClaudeCodeはフォルダ単位でプロジェクトを管理します。専用フォルダを作ることで、関連ファイルを整理しやすくなります。',
    },
    technicalDetails: {
      title: 'Claudeを使わない場合',
      content: 'mkdir my-project',
      note: 'というコマンドですが、Claudeなら覚えなくてOK!',
    },
  },
  5: {
    title: 'ステップ5: 競合調査をしよう（Plan Mode）',
    introduction: 'ClaudeCodeの「Plan Mode」を使って、競合サービスを調査しましょう。Plan Modeに切り替えるには、Shift+Tab を押すか、/plan と入力します。',
    mission: {
      description: 'Todoアプリの競合サービスを調査し、レポートを作成しましょう',
      command: 'Todoアプリの競合サービスを調査して、research.mdにまとめて',
      copyable: true,
    },
    tips: [
      'Plan Modeへの切り替え: Shift+Tab または /plan と入力',
      '調査対象のサービスURLがあれば、より詳細な分析ができます',
      '具体的なアプリ名（Todoist, TickTickなど）を指定してもOK',
    ],
    knowledgeBox: {
      title: '🔍 Plan Modeとは?',
      content: 'Claudeが「まず計画を立ててから実行する」モード。複雑なタスクを自動で分解し、ステップごとに進めてくれます。調査・分析系のタスクに最適!',
    },
    technicalDetails: {
      title: 'Plan Modeの切り替え方法',
      content: '・Shift+Tab: Plan Modeに切り替え\n・/plan: コマンドで切り替え\n・通常モードに戻る: もう一度 Shift+Tab',
      note: 'Plan Modeでは、実行前に計画を確認できます',
    },
  },
  6: {
    title: 'ステップ6: 調査結果を確認・追加しよう',
    introduction: '作成された調査レポートを確認し、足りない情報があれば追加してもらいましょう。',
    mission: {
      description: '調査レポートの内容を確認し、不足情報を追加しましょう',
      command: '@research.md の内容を確認して、足りない情報があれば追加して',
      copyable: true,
    },
    tips: [
      '@ファイル名 でファイルをClaudeに渡せます',
      '「もっと詳しく」「〇〇を追加して」など細かい調整も可能',
      'Claudeが自動で不足情報を判断して追加してくれます',
    ],
    knowledgeBox: {
      title: '💡 @メンションの使い方',
      content: '@ファイル名 でファイルをClaudeに渡せます。ファイルをドラッグ&ドロップしても同じことができます!',
    },
  },
  7: {
    title: 'ステップ7: 作るものを決めよう',
    introduction: '調査結果をもとに、「どんなTodoアプリを作るか」をClaudeにまとめてもらいましょう。これが設計図になります!',
    mission: {
      description: '調査結果をもとに、アプリの要件定義（作るものリスト）を作成しましょう',
      command: '調査結果をもとに、Todoアプリの要件をrequirements.mdにまとめて',
      copyable: true,
    },
    tips: [
      'Claudeが調査結果を自動で参照して、要件を整理してくれます',
      '「要件」= 作るものリスト、と考えればOK!',
      'この一文をそのままコピペすれば大丈夫です',
    ],
    knowledgeBox: {
      title: '📋 要件定義とは?',
      content: '「何を作るか」のチェックリストのようなもの。例: タスクを追加できる、完了にできる、保存される...など。Claudeが自動で整理してくれます!',
    },
    technicalDetails: {
      title: 'Claudeが作ってくれる内容',
      content: '・必須機能（最低限必要なもの）\n・あったら嬉しい機能\n・性能の目標',
      note: '難しく考えなくてOK、Claudeにお任せ!',
    },
  },
  8: {
    title: 'ステップ8: 別の視点からレビューしよう',
    introduction: '要件定義を別の視点からレビューしてもらい、見落としがないか確認しましょう。',
    mission: {
      description: 'セキュリティ・パフォーマンス・UXなど複数の視点から要件をチェックしましょう',
      command: '@requirements.md を別の視点からレビューして',
      copyable: true,
    },
    tips: [
      'セキュリティ、パフォーマンス、ユーザビリティなど複数の観点から確認',
      '問題点だけでなく改善提案もしてくれます',
      'レビュー結果を要件に反映することもできます',
    ],
    knowledgeBox: {
      title: '🔮 マルチ視点レビューとは?',
      content: '一つの成果物を複数の観点（セキュリティ、パフォーマンス、UXなど）からチェックすること。見落としを防ぎ、品質を高められます。',
    },
  },
  9: {
    title: 'ステップ9: 開発を始めよう',
    introduction: '要件定義が完成しました! いよいよTodoアプリの開発を始めましょう。Claudeがコードを自動生成してくれます。',
    mission: {
      description: '要件に基づいて、実際に動くTodoアプリのコードを生成しましょう',
      command: '要件に沿ってTodoアプリの基本構造を作って',
      copyable: true,
    },
    tips: [
      'Claudeが要件定義を参照して適切なコードを生成します',
      '一度に全部作らなくても、段階的に機能を追加できます',
      '生成されたコードは自由に編集・カスタマイズできます',
    ],
    knowledgeBox: {
      title: '🛠️ AIによるコード生成',
      content: 'ClaudeCodeは要件を理解し、適切なファイル構造とコードを自動生成します。HTML、CSS、JavaScriptなど複数ファイルも一度に作成できます。',
    },
    technicalDetails: {
      title: '生成されるファイル',
      content: '・index.html - 画面構造\n・styles.css - デザイン\n・app.js - 動作ロジック',
      note: '全てブラウザで動作するシンプルな構成です',
    },
  },
  10: {
    title: 'おめでとうございます!',
    introduction: 'ClaudeCode体験ツアーを完走しました! 調査から開発まで、一連の開発ワークフローを体験しました。',
    mission: {
      description: 'チュートリアル完了',
    },
  },
};

// Default achievements
export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'terminal-opener',
    name: 'ターミナルデビュー',
    description: 'ターミナルを開くことができた!',
    icon: '🖥️',
  },
  {
    id: 'navigator',
    name: 'ナビゲーター',
    description: 'cdコマンドでフォルダを移動できた!',
    icon: '🧭',
  },
  {
    id: 'claude-starter',
    name: 'Claude起動',
    description: 'ClaudeCodeを起動できた!',
    icon: '🤖',
  },
  {
    id: 'first-command',
    name: '初めてのお願い',
    description: 'Claudeへの最初の依頼に成功!',
    icon: '🎯',
  },
  {
    id: 'researcher',
    name: 'リサーチャー',
    description: '競合調査を完了!',
    icon: '🔍',
  },
  {
    id: 'reviewer',
    name: 'レビュアー',
    description: 'ドキュメントをレビュー!',
    icon: '📋',
  },
  {
    id: 'architect',
    name: 'アーキテクト',
    description: '要件定義を作成!',
    icon: '📐',
  },
  {
    id: 'multi-perspective',
    name: '多角的視点',
    description: 'マルチモデルレビュー実施!',
    icon: '🔮',
  },
  {
    id: 'developer',
    name: 'デベロッパー',
    description: '開発を開始!',
    icon: '🛠️',
  },
  {
    id: 'graduate',
    name: '卒業生',
    description: 'チュートリアルを完走!',
    icon: '🎓',
  },
];
