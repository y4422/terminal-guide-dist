import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  StepId,
  StepState,
  FileSystem,
  VirtualDirectory,
  Command,
  Achievement,
} from '@/types/tutorial';

interface TutorialState {
  // Progress
  sessionId: string;
  currentStep: StepId;
  completedSteps: StepId[];
  stepStates: Record<StepId, StepState>;
  startTime: Date | null;

  // File System
  fileSystem: FileSystem;

  // Commands
  commandHistory: Command[];

  // Achievements
  achievements: Achievement[];

  // Hints
  hintsShown: Record<StepId, number[]>;

  // Actions
  startTutorial: () => void;
  goToStep: (step: StepId) => void;
  completeStep: (step: StepId) => void;
  skipStep: (step: StepId) => void;
  addCommand: (command: Command) => void;
  createDirectory: (path: string, name: string) => void;
  createFile: (path: string, name: string, content: string, language?: string) => void;
  updateFile: (path: string, name: string, content: string) => void;
  showHint: (step: StepId, level: number) => void;
  unlockAchievement: (achievementId: string) => void;
  resetTutorial: () => void;
}

const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

const createInitialFileSystem = (): FileSystem => ({
  root: {
    name: '~',
    type: 'directory',
    children: [],
    createdAt: new Date(),
  },
  currentPath: '~',
});

const createInitialStepStates = (): Record<StepId, StepState> => {
  const states: Record<StepId, StepState> = {} as Record<StepId, StepState>;
  for (let i = 0; i <= 11; i++) {
    states[i as StepId] = {
      stepId: i as StepId,
      status: 'not-started',
      attempts: 0,
      hintsUsed: 0,
    };
  }
  return states;
};

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set, get) => ({
      // Initial State
      sessionId: generateSessionId(),
      currentStep: 0,
      completedSteps: [],
      stepStates: createInitialStepStates(),
      startTime: null,
      fileSystem: createInitialFileSystem(),
      commandHistory: [],
      achievements: [],
      hintsShown: {} as Record<StepId, number[]>,

      // Actions
      startTutorial: () => {
        set({
          startTime: new Date(),
          stepStates: {
            ...get().stepStates,
            0: {
              ...get().stepStates[0],
              status: 'in-progress',
              startTime: new Date(),
            },
          },
        });
      },

      goToStep: (step: StepId) => {
        const stepStates = get().stepStates;

        set({
          currentStep: step,
          stepStates: {
            ...stepStates,
            [step]: {
              ...stepStates[step],
              status: 'in-progress',
              startTime: stepStates[step].startTime || new Date(),
            },
          },
        });
      },

      completeStep: (step: StepId) => {
        const stepStates = get().stepStates;
        const completedSteps = get().completedSteps;
        const currentStep = get().currentStep;

        // If already completed but still on this step, just advance
        if (completedSteps.includes(step)) {
          if (currentStep === step && step < 11) {
            const nextStep = (step + 1) as StepId;
            set({
              currentStep: nextStep,
              stepStates: {
                ...stepStates,
                [nextStep]: {
                  ...stepStates[nextStep],
                  status: 'in-progress',
                  startTime: stepStates[nextStep].startTime || new Date(),
                },
              },
            });
          }
          return;
        }

        set({
          completedSteps: [...completedSteps, step],
          stepStates: {
            ...stepStates,
            [step]: {
              ...stepStates[step],
              status: 'completed',
              endTime: new Date(),
            },
          },
        });

        // Auto-advance to next step
        if (step < 11) {
          const nextStep = (step + 1) as StepId;
          set({
            currentStep: nextStep,
            stepStates: {
              ...get().stepStates,
              [nextStep]: {
                ...get().stepStates[nextStep],
                status: 'in-progress',
                startTime: new Date(),
              },
            },
          });
        }
      },

      skipStep: (step: StepId) => {
        const stepStates = get().stepStates;

        set({
          stepStates: {
            ...stepStates,
            [step]: {
              ...stepStates[step],
              status: 'skipped',
              endTime: new Date(),
            },
          },
        });

        // Auto-advance to next step
        if (step < 11) {
          const nextStep = (step + 1) as StepId;
          set({
            currentStep: nextStep,
            stepStates: {
              ...get().stepStates,
              [nextStep]: {
                ...get().stepStates[nextStep],
                status: 'in-progress',
                startTime: new Date(),
              },
            },
          });
        }
      },

      addCommand: (command: Command) => {
        const stepStates = get().stepStates;
        const step = command.stepId;

        set({
          commandHistory: [...get().commandHistory, command],
          stepStates: {
            ...stepStates,
            [step]: {
              ...stepStates[step],
              attempts: stepStates[step].attempts + 1,
            },
          },
        });
      },

      createDirectory: (path: string, name: string) => {
        const fileSystem = get().fileSystem;
        const newDir: VirtualDirectory = {
          name,
          type: 'directory',
          children: [],
          createdAt: new Date(),
        };

        // Find parent directory and add new directory
        const addToParent = (node: VirtualDirectory, targetPath: string): VirtualDirectory => {
          if (targetPath === '~' || targetPath === '') {
            return {
              ...node,
              children: [...node.children, newDir],
            };
          }

          const parts = targetPath.split('/').filter(Boolean);
          if (parts[0] === '~') parts.shift();

          if (parts.length === 0) {
            return {
              ...node,
              children: [...node.children, newDir],
            };
          }

          return {
            ...node,
            children: node.children.map((child) => {
              if (child.type === 'directory' && child.name === parts[0]) {
                return addToParent(child, parts.slice(1).join('/'));
              }
              return child;
            }),
          };
        };

        set({
          fileSystem: {
            ...fileSystem,
            root: addToParent(fileSystem.root, path),
            currentPath: path === '~' ? `~/${name}` : `${path}/${name}`,
          },
        });
      },

      createFile: (path: string, name: string, content: string, language?: string) => {
        const fileSystem = get().fileSystem;
        const newFile = {
          name,
          type: 'file' as const,
          content,
          language,
          createdAt: new Date(),
          modifiedAt: new Date(),
        };

        // Parse path into parts (remove ~ and empty strings)
        let pathParts = path.split('/').filter(Boolean);
        if (pathParts[0] === '~') pathParts = pathParts.slice(1);

        const addFileToPath = (node: VirtualDirectory, parts: string[]): VirtualDirectory => {
          // If we've reached the target directory, add the file
          if (parts.length === 0) {
            // Check if file already exists (avoid duplicates)
            const existingIndex = node.children.findIndex(
              (child) => child.type === 'file' && child.name === name
            );
            if (existingIndex >= 0) {
              // Update existing file instead of adding duplicate
              const newChildren = [...node.children];
              newChildren[existingIndex] = newFile;
              return { ...node, children: newChildren };
            }
            return {
              ...node,
              children: [...node.children, newFile],
            };
          }

          // Look for the next directory in the path
          const targetDirName = parts[0];
          const remainingPath = parts.slice(1);

          // Find and traverse into the target directory
          const newChildren = node.children.map((child) => {
            if (child.type === 'directory' && child.name === targetDirName) {
              return addFileToPath(child, remainingPath);
            }
            return child;
          });

          return {
            ...node,
            children: newChildren,
          };
        };

        set({
          fileSystem: {
            ...fileSystem,
            root: addFileToPath(fileSystem.root, pathParts),
          },
        });
      },

      updateFile: (path: string, name: string, content: string) => {
        const fileSystem = get().fileSystem;

        // Parse path into parts (remove ~ and empty strings)
        let pathParts = path.split('/').filter(Boolean);
        if (pathParts[0] === '~') pathParts = pathParts.slice(1);

        const updateFileInPath = (node: VirtualDirectory, parts: string[]): VirtualDirectory => {
          // If we've reached the target directory, update the file
          if (parts.length === 0) {
            return {
              ...node,
              children: node.children.map((child) => {
                if (child.type === 'file' && child.name === name) {
                  return {
                    ...child,
                    content,
                    modifiedAt: new Date(),
                  };
                }
                return child;
              }),
            };
          }

          // Look for the next directory in the path
          const targetDirName = parts[0];
          const remainingPath = parts.slice(1);

          return {
            ...node,
            children: node.children.map((child) => {
              if (child.type === 'directory' && child.name === targetDirName) {
                return updateFileInPath(child, remainingPath);
              }
              return child;
            }),
          };
        };

        set({
          fileSystem: {
            ...fileSystem,
            root: updateFileInPath(fileSystem.root, pathParts),
          },
        });
      },

      showHint: (step: StepId, level: number) => {
        const hintsShown = get().hintsShown;
        const stepStates = get().stepStates;
        const stepHints = hintsShown[step] || [];

        if (!stepHints.includes(level)) {
          set({
            hintsShown: {
              ...hintsShown,
              [step]: [...stepHints, level],
            },
            stepStates: {
              ...stepStates,
              [step]: {
                ...stepStates[step],
                hintsUsed: stepStates[step].hintsUsed + 1,
              },
            },
          });
        }
      },

      unlockAchievement: (achievementId: string) => {
        const achievements = get().achievements;
        if (achievements.find((a) => a.id === achievementId)) return;

        const achievementTemplate = {
          'installer': { name: 'インストーラー', description: 'Claude Codeをインストール!', icon: '📦' },
          'terminal-opener': { name: 'ターミナルデビュー', description: 'ターミナルを開くことができた!', icon: '🖥️' },
          'navigator': { name: 'ナビゲーター', description: 'cdコマンドでフォルダを移動できた!', icon: '🧭' },
          'claude-starter': { name: 'Claude起動', description: 'Claude Code を起動できた!', icon: '🤖' },
          'first-command': { name: '初めてのお願い', description: 'Claudeへの最初の依頼に成功!', icon: '🎯' },
          'researcher': { name: 'リサーチャー', description: '競合調査を完了!', icon: '🔍' },
          'reviewer': { name: 'レビュアー', description: 'ドキュメントをレビュー!', icon: '📋' },
          'architect': { name: 'アーキテクト', description: '要件定義を作成!', icon: '📐' },
          'multi-perspective': { name: '多角的視点', description: 'マルチモデルレビュー実施!', icon: '🔮' },
          'developer': { name: 'デベロッパー', description: '開発を開始!', icon: '🛠️' },
          'graduate': { name: '卒業生', description: 'チュートリアルを完走!', icon: '🎓' },
        }[achievementId];

        if (achievementTemplate) {
          set({
            achievements: [
              ...achievements,
              {
                id: achievementId,
                ...achievementTemplate,
                unlockedAt: new Date(),
              },
            ],
          });
        }
      },

      resetTutorial: () => {
        set({
          sessionId: generateSessionId(),
          currentStep: 0,
          completedSteps: [],
          stepStates: createInitialStepStates(),
          startTime: null,
          fileSystem: createInitialFileSystem(),
          commandHistory: [],
          achievements: [],
          hintsShown: {} as Record<StepId, number[]>,
        });
      },
    }),
    {
      name: 'claudecode-tutorial',
      // Note: fileSystem is intentionally NOT persisted
      // It should start fresh each session to avoid stale file state
      partialize: (state) => ({
        sessionId: state.sessionId,
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        stepStates: state.stepStates,
        startTime: state.startTime,
        achievements: state.achievements,
      }),
    }
  )
);
