// Tutorial Step Types
export type StepId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11; // 0=intro, 1-10=steps, 11=completion

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
  createdAtStep?: StepId;
}

export interface VirtualDirectory {
  name: string;
  type: 'directory';
  children: (VirtualFile | VirtualDirectory)[];
  createdAt: Date;
  createdAtStep?: StepId;
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
    title: 'Claude Code の世界へようこそ!',
    introduction: 'このチュートリアルでは、シミュレーターを使ってターミナルの基本操作から Claude Code の使い方まで、安心して学べます。',
    mission: {
      description: 'チュートリアルを始める',
    },
    tips: [
      '約20分で完了します',
      'ターミナルを触ったことがなくても大丈夫!',
      'シミュレーターなので失敗しても安心',
    ],
  },
  1: {
    title: 'ステップ1: ターミナルを知ろう',
    introduction: 'ターミナル（黒い画面）は、文字を打ってパソコンを操作するツールです。最初は怖く見えますが、実はとてもシンプル! まずはシミュレーターで練習しましょう。',
    mission: {
      description: 'シミュレーターでターミナルの雰囲気を体験しましょう',
      copyable: false,
    },
    tips: [
      'この画面はシミュレーターです。安心して試せます!',
      '本物のターミナルも同じような見た目です',
    ],
    knowledgeBox: {
      title: '💡 ターミナルとは?',
      content: 'GUI（マウスでクリック）の代わりに、キーボードで文字を打ってパソコンを操作する方法です。慣れると実はとても効率的!',
    },
  },
  2: {
    title: 'ステップ2: フォルダを移動しよう',
    introduction: 'ターミナルでは「cd」コマンドでフォルダ間を移動します。これはターミナルの最も基本的な操作の1つです。シミュレーターで練習してみましょう!',
    mission: {
      description: 'デスクトップフォルダに移動しましょう',
      command: 'cd Desktop',
      copyable: true,
    },
    tips: [
      'cd = Change Directory（ディレクトリを変える）の略',
      'シミュレーターなので何度でも試せます',
    ],
    knowledgeBox: {
      title: '📂 パスとは?',
      content: 'ファイルやフォルダの住所のようなもの。~ はホームフォルダを意味します。',
    },
    technicalDetails: {
      title: 'よく使うcdコマンド',
      content: 'cd フォルダ名  # 移動\ncd ..         # 1つ上へ\ncd ~          # ホームへ\npwd           # 今いる場所を確認',
      note: 'pwdで今どこにいるか確認できます',
    },
  },
  3: {
    title: 'ステップ3: Claude Code を起動しよう',
    introduction: 'いよいよ Claude Code を起動します! シミュレーターで「claude」と入力するだけです。',
    mission: {
      description: 'Claude Code を起動しましょう',
      command: 'claude',
      copyable: true,
    },
    tips: [
      '小文字で「claude」と入力してEnter',
      'シミュレーターなので、本物と同じ体験ができます',
    ],
    knowledgeBox: {
      title: '🤖 Claude Code とは?',
      content: 'AIアシスタントClaudeをターミナルから使えるツール。日本語で話しかけるだけで、プログラミングやファイル操作を手伝ってくれます。',
    },
  },
  4: {
    title: 'ステップ4: プロジェクトフォルダを作ろう',
    introduction: 'Claude Code が起動しました! まずはプロジェクト用のフォルダを作りましょう。日本語で話しかけるだけでOKです。',
    mission: {
      description: 'プロジェクト用のフォルダを作成しましょう',
      command: 'my-projectフォルダを作って',
      copyable: true,
    },
    tips: [
      '敬語じゃなくてもOK、日本語で自然に話しかけてください',
      'シンプルな指示でOK、Claude が理解してくれます',
    ],
    knowledgeBox: {
      title: '📂 なぜプロジェクトフォルダが重要?',
      content: 'Claude Code はフォルダ単位でプロジェクトを管理します。専用フォルダを作ることで、関連ファイルを整理しやすくなります。',
    },
    technicalDetails: {
      title: 'Claude を使わない場合',
      content: 'mkdir my-project',
      note: 'というコマンドですが、Claude なら覚えなくてOK!',
    },
  },
  5: {
    title: 'ステップ5: 競合調査をしよう',
    introduction: 'Claude Code に競合サービスを調査してもらいましょう。第1回で作成した要件定義を補強するための情報収集です。',
    mission: {
      description: 'Todoアプリの競合サービスを調査し、レポートを作成しましょう',
      command: 'Todoアプリの競合サービスを調査して、research.mdにまとめて',
      copyable: true,
    },
    tips: [
      'そのまま入力するだけでOK',
      '具体的なアプリ名（Todoist, TickTickなど）を指定してもOK',
      'Claude が自動でWeb検索して分析してくれます',
    ],
    knowledgeBox: {
      title: '🔍 Claude Code の調査機能',
      content: 'Claude Code はWeb検索機能を持っており、競合サービスの情報を自動で収集・分析してくれます。結果はMarkdownファイルにまとめられます。',
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
      '@ファイル名 でファイルを Claude に渡せます',
      '「もっと詳しく」「〇〇を追加して」など細かい調整も可能',
      'Claude が自動で不足情報を判断して追加してくれます',
    ],
    knowledgeBox: {
      title: '💡 @メンションの使い方',
      content: '@ファイル名 でファイルを Claude に渡せます。Tab キーでファイル名を補完することもできます。',
    },
  },
  7: {
    title: 'ステップ7: 要件定義を作成しよう',
    introduction: '調査結果をもとに、「どんなTodoアプリを作るか」を Claude にまとめてもらいましょう。第1回で学んだ要件定義を実践します!',
    mission: {
      description: '調査結果をもとに、アプリの要件定義を作成しましょう',
      command: '調査結果をもとに、Todoアプリの要件をrequirements.mdにまとめて',
      copyable: true,
    },
    tips: [
      'Claude が調査結果を自動で参照して、要件を整理してくれます',
      '第1回で学んだ要件定義のフォーマットを思い出してください',
      'この一文をそのままコピペすれば大丈夫です',
    ],
    knowledgeBox: {
      title: '📋 AIによる要件定義',
      content: 'Claude は競合調査の結果を踏まえて、機能要件・非機能要件を自動で整理してくれます。人間が見落としがちな観点も補ってくれます。',
    },
    technicalDetails: {
      title: 'Claude が作ってくれる内容',
      content: '・必須機能（MVP）\n・あったら嬉しい機能\n・非機能要件（性能・セキュリティなど）',
      note: '生成された内容は自由に編集できます',
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
    introduction: '要件定義が完成しました! いよいよTodoアプリの開発を始めましょう。Claude がコードを自動生成してくれます。',
    mission: {
      description: '要件に基づいて、実際に動くTodoアプリのコードを生成しましょう',
      command: '要件に沿ってTodoアプリの基本構造を作って',
      copyable: true,
    },
    tips: [
      'Claude が要件定義を参照して適切なコードを生成します',
      '一度に全部作らなくても、段階的に機能を追加できます',
      '生成されたコードは自由に編集・カスタマイズできます',
    ],
    knowledgeBox: {
      title: '🛠️ AIによるコード生成',
      content: 'Claude Code は要件を理解し、適切なファイル構造とコードを自動生成します。HTML、CSS、JavaScriptなど複数ファイルも一度に作成できます。',
    },
    technicalDetails: {
      title: '生成されるファイル',
      content: '・index.html - 画面構造\n・styles.css - デザイン\n・app.js - 動作ロジック',
      note: '全てブラウザで動作するシンプルな構成です',
    },
  },
  10: {
    title: 'ステップ10: 本番環境にインストールしよう!',
    introduction: 'シミュレーターでの練習お疲れ様でした! ターミナルも Claude Code も怖くないことがわかりましたね。いよいよ本物の Claude Code をインストールして、実際に使ってみましょう!',
    mission: {
      description: 'あなたのパソコンに Claude Code をインストールしましょう',
      copyable: false,
    },
    tips: [
      'インストールは1分程度で完了します',
      'すでにインストール済みの方はスキップできます',
      'シミュレーターで練習した通りに操作できます!',
    ],
    knowledgeBox: {
      title: '🎉 いよいよ本番!',
      content: 'シミュレーターで学んだことを、実際の環境で試してみましょう。同じコマンド、同じ操作で動きます!',
    },
  },
  11: {
    title: 'おめでとうございます!',
    introduction: 'Claude Code 体験ツアーを完走しました! 調査から開発まで、一連の開発ワークフローを体験しました。',
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
    description: 'シミュレーターでターミナルを体験!',
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
    description: 'Claude Code を起動できた!',
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
    id: 'installer',
    name: 'インストーラー',
    description: '本番環境にClaude Codeをインストール!',
    icon: '📦',
  },
  {
    id: 'graduate',
    name: '卒業生',
    description: 'チュートリアルを完走!',
    icon: '🎓',
  },
];
