'use client';

import { Folder, FileCode, FileText, File } from 'lucide-react';
import type { FileSystem, VirtualDirectory, VirtualFile } from '@/types/tutorial';

interface FileTreeProps {
  fileSystem: FileSystem;
}

export function FileTree({ fileSystem }: FileTreeProps) {
  // Don't show if there are no files/folders created yet
  if (fileSystem.root.children.length === 0) {
    return null;
  }

  return (
    <div className="text-terminal-text text-xs">
      <div className="text-terminal-text/50 mb-1">📁 ファイル構造:</div>
      <DirectoryNode node={fileSystem.root} depth={0} currentPath={fileSystem.currentPath} />
    </div>
  );
}

interface DirectoryNodeProps {
  node: VirtualDirectory;
  depth: number;
  currentPath: string;
}

function DirectoryNode({ node, depth, currentPath }: DirectoryNodeProps) {
  const indent = '  '.repeat(depth);
  const isCurrentDir = currentPath.endsWith(node.name) || (node.name === '~' && currentPath === '~');

  return (
    <div>
      <div className={`flex items-center gap-1 ${isCurrentDir ? 'text-terminal-success' : ''}`}>
        <span className="text-terminal-text/30">{indent}</span>
        {depth > 0 && <span className="text-terminal-text/30">└─</span>}
        <Folder className="h-3 w-3" />
        <span>{node.name}</span>
        {isCurrentDir && <span className="text-terminal-success text-[10px]">(現在)</span>}
      </div>
      {node.children.map((child, index) => (
        <div key={`${child.name}-${index}`}>
          {child.type === 'directory' ? (
            <DirectoryNode node={child} depth={depth + 1} currentPath={currentPath} />
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
