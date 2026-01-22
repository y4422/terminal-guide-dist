'use client';

import { Folder, FileCode, FileText, File } from 'lucide-react';
import type { FileSystem, VirtualDirectory, VirtualFile, StepId } from '@/types/tutorial';

interface FileTreeProps {
  fileSystem: FileSystem;
  currentStep: StepId;
}

// Filter children to only show files/directories created at or before currentStep
function filterChildren(children: (VirtualFile | VirtualDirectory)[], currentStep: StepId): (VirtualFile | VirtualDirectory)[] {
  return children.filter(child => {
    // If no createdAtStep, assume it should be visible (backwards compatibility)
    if (child.createdAtStep === undefined) return true;
    return child.createdAtStep <= currentStep;
  });
}

export function FileTree({ fileSystem, currentStep }: FileTreeProps) {
  // Filter children based on currentStep
  const visibleChildren = filterChildren(fileSystem.root.children, currentStep);

  // Don't show if there are no visible files/folders
  if (visibleChildren.length === 0) {
    return null;
  }

  return (
    <div className="text-terminal-text text-xs">
      <div className="text-terminal-text/50 mb-1">📁 ファイル構造:</div>
      <DirectoryNode node={{ ...fileSystem.root, children: visibleChildren }} depth={0} currentPath={fileSystem.currentPath} currentStep={currentStep} />
    </div>
  );
}

interface DirectoryNodeProps {
  node: VirtualDirectory;
  depth: number;
  currentPath: string;
  currentStep: StepId;
}

function DirectoryNode({ node, depth, currentPath, currentStep }: DirectoryNodeProps) {
  const indent = '  '.repeat(depth);
  const isCurrentDir = currentPath.endsWith(node.name) || (node.name === '~' && currentPath === '~');

  // Filter children based on currentStep
  const visibleChildren = filterChildren(node.children, currentStep);

  return (
    <div>
      <div className={`flex items-center gap-1 ${isCurrentDir ? 'text-terminal-success' : ''}`}>
        <span className="text-terminal-text/30">{indent}</span>
        {depth > 0 && <span className="text-terminal-text/30">└─</span>}
        <Folder className="h-3 w-3" />
        <span>{node.name}</span>
        {isCurrentDir && <span className="text-terminal-success text-[10px]">(現在)</span>}
      </div>
      {visibleChildren.map((child, index) => (
        <div key={`${child.name}-${index}`}>
          {child.type === 'directory' ? (
            <DirectoryNode node={child} depth={depth + 1} currentPath={currentPath} currentStep={currentStep} />
          ) : (
            <FileNode node={child} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  );
}

interface FileNodeProps {
  node: VirtualFile;
  depth: number;
}

function FileNode({ node, depth }: FileNodeProps) {
  const indent = '  '.repeat(depth);

  const getFileIcon = (name: string) => {
    if (name.endsWith('.py') || name.endsWith('.js') || name.endsWith('.ts')) {
      return <FileCode className="h-4 w-4 inline" />;
    }
    if (name.endsWith('.md')) {
      return <FileText className="h-4 w-4 inline" />;
    }
    return <File className="h-4 w-4 inline" />;
  };

  return (
    <div className="flex items-center gap-1 text-terminal-text/80">
      <span className="text-terminal-text/30">{indent}</span>
      <span className="text-terminal-text/30">└─</span>
      <span>{getFileIcon(node.name)}</span>
      <span>{node.name}</span>
    </div>
  );
}
