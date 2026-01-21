'use client';

import { ReactNode, useState, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import { useResizablePanel } from '@/hooks/useResizablePanel';

interface TutorialLayoutProps {
  guidePanel: ReactNode;
  terminalPanel: ReactNode;
}

export function TutorialLayout({ guidePanel, terminalPanel }: TutorialLayoutProps) {
  const {
    width,
    isResizing,
    isHovering,
    setIsHovering,
    handleMouseDown,
  } = useResizablePanel({
    defaultWidth: 380,
    minWidth: 280,
    maxWidth: 600,
    storageKey: 'tutorial-sidebar-width',
  });

  // Show tooltip hint on first visit
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const hasSeenHint = localStorage.getItem('resize-hint-seen');
    if (!hasSeenHint) {
      const timer = setTimeout(() => {
        setShowHint(true);
        // Auto-hide after 4 seconds
        setTimeout(() => {
          setShowHint(false);
          localStorage.setItem('resize-hint-seen', 'true');
        }, 4000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInteraction = () => {
    setShowHint(false);
    localStorage.setItem('resize-hint-seen', 'true');
  };

  return (
    <div className="relative flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Guide Panel - Left side */}
      <aside
        style={{ width: `${width}px` }}
        className="relative shrink-0 bg-warm-radial overflow-hidden transition-shadow duration-300"
      >
        {/* Content */}
        <div className="h-full overflow-y-auto scrollbar-thin">
          {guidePanel}
        </div>
      </aside>

      {/* Resize Handle - More prominent design */}
      <div
        className={`
          group relative z-10 flex items-center justify-center
          w-3 cursor-col-resize select-none
          transition-all duration-200 ease-out
          ${isResizing ? 'w-4 bg-primary/10' : 'hover:w-4 hover:bg-muted/50'}
        `}
        onMouseDown={(e) => {
          handleMouseDown(e);
          handleInteraction();
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        role="separator"
        aria-orientation="vertical"
        aria-label="ドラッグしてパネルサイズを調整"
        aria-valuenow={width}
        aria-valuemin={280}
        aria-valuemax={600}
        tabIndex={0}
        onKeyDown={(e) => {
          handleInteraction();
          if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
          }
        }}
      >
        {/* Background bar - always visible */}
        <div
          className={`
            absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] rounded-full
            transition-all duration-200
            ${isResizing
              ? 'bg-primary shadow-glow w-1'
              : isHovering
                ? 'bg-primary/70 shadow-glow-sm'
                : 'bg-border/80'
            }
          `}
        />

        {/* Grip handle - always visible */}
        <div
          className={`
            relative z-10 flex flex-col items-center justify-center
            h-16 w-5 rounded-md
            transition-all duration-200
            ${isResizing
              ? 'bg-primary text-primary-foreground shadow-glow scale-105'
              : isHovering
                ? 'bg-primary/90 text-primary-foreground shadow-warm'
                : 'bg-muted/80 text-muted-foreground border border-border/50'
            }
          `}
        >
          <GripVertical className="h-4 w-4" />
        </div>

        {/* Tooltip hint for first-time users */}
        {showHint && (
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-4 z-50 animate-fade-in">
            <div className="relative">
              {/* Arrow */}
              <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2">
                <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-foreground/90" />
              </div>
              {/* Tooltip content */}
              <div className="bg-foreground/90 text-background text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                ← ドラッグでサイズ変更
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Panel - Right side */}
      <main className="relative flex-1 overflow-hidden">
        {/* Terminal background with subtle gradient */}
        <div className="absolute inset-0 bg-terminal-bg terminal-glow" />

        {/* Subtle top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terminal-text/10 to-transparent" />

        {/* Content */}
        <div className="relative h-full">
          {terminalPanel}
        </div>
      </main>

      {/* Resize overlay to prevent iframe/content interference */}
      {isResizing && (
        <div className="fixed inset-0 z-50 cursor-col-resize" />
      )}
    </div>
  );
}
