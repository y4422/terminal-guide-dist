# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language

ユーザーへの回答は日本語を基本言語とする。

## Project Overview

ClaudeCode Interactive Tutorial - A browser-based interactive tutorial application that teaches beginners how to use ClaudeCode through a simulated terminal UI. Users learn terminal operations and ClaudeCode basics in approximately 10 minutes without requiring actual terminal experience.

### Target Users
- Programming beginners unfamiliar with terminal operations
- No-code/low-code users transitioning to CLI tools
- Designers and planners interested in development

## Development Commands

```bash
# Development
npm run dev          # Start Next.js dev server
pnpm dev

# Build
npm run build
pnpm build

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run lint
npm run typecheck

# Code quality before commits
npm run lint && npm run typecheck
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14, React 18, TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Terminal UI**: xterm.js 5.3
- **Code Editor**: Monaco Editor 0.45
- **Animation**: Framer Motion 11
- **State Management**: Zustand 4.4
- **Code Execution**: WebContainers (Node.js) / Pyodide (Python) in browser

### Core Components

```
app/
├── components/
│   ├── terminal/          # xterm.js terminal simulation
│   ├── guide/             # Tutorial guide panel (left side)
│   ├── editor/            # Monaco editor for code display
│   └── progress/          # Progress bar and step tracking
├── hooks/
│   └── useTutorial.ts     # Tutorial state and progression
├── lib/
│   ├── validation/        # Input validation for each step
│   ├── filesystem/        # Virtual file system simulation
│   └── execution/         # WebContainers/Pyodide integration
└── store/
    └── tutorial.ts        # Zustand store for tutorial state
```

### Tutorial Flow (5 Steps)
1. **Step 0**: Introduction - Overview and learning goals
2. **Step 1**: Folder creation - First natural language command to Claude
3. **Step 2**: File creation - Create files with content
4. **Step 3**: Code generation - Generate and execute Python program
5. **Step 4**: GitHub integration - OAuth and push to repository
6. **Step 5**: Code improvement - Modify existing code
7. **Completion**: Certificate and next steps

### Data Models

```typescript
// Key interfaces (see spec.md for full definitions)
interface UserProgress {
  sessionId: string;
  currentStep: number;        // 0-5
  completedSteps: number[];
  stepTimes: Record<number, { start: Date; end?: Date }>;
}

interface StepState {
  stepId: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'skipped';
  attempts: number;
  hintsUsed: number;
}

interface FileSystem {
  root: Directory;
  currentPath: string;
}
```

### Input Validation Pattern
Each step has keyword-based validation that provides progressive hints:
- Level 1 (30s): Gentle guidance
- Level 2 (60s): Specific suggestions
- Level 3 (120s): Show answer (user-triggered)

## Key Implementation Notes

### Execution Environment
- Use WebContainers for Node.js execution in browser
- Use Pyodide for Python execution in browser
- Both run entirely client-side with no backend required for basic functionality
- Backend sandbox API optional for advanced execution scenarios

### Accessibility Requirements
- WCAG 2.1 Level AA compliance required
- Full keyboard navigation support
- Screen reader compatible with proper ARIA labels
- Minimum 4.5:1 color contrast ratio

### Analytics Events
Track these key events for KPI monitoring:
- `tutorial_start`, `tutorial_complete`
- `step_start`, `step_complete`, `step_skip`
- `hint_requested`, `error_occurred`
- `github_auth_complete`, `github_push`

### Performance Targets
- Initial load: < 3 seconds
- Interaction response: < 100ms
- Bundle size: < 500KB (gzip)

## Reference
- Full specification with UI mockups, data models, and implementation details: `spec.md`
- Lecture notes for workshop guidance: `docs/lecture-notes.md`
