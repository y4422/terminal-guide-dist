'use client';

import { Header } from '@/components/layout/Header';
import { TutorialLayout } from '@/components/layout/TutorialLayout';
import { GuidePanel } from '@/components/guide/GuidePanel';
import { Terminal } from '@/components/terminal/Terminal';

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <TutorialLayout
        guidePanel={<GuidePanel />}
        terminalPanel={<Terminal />}
      />
    </div>
  );
}
