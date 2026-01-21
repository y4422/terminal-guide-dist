'use client';

import { SiteHeader } from '@/components/layout/SiteHeader';
import { TutorialLayout } from '@/components/layout/TutorialLayout';
import { GuidePanel } from '@/components/guide/GuidePanel';
import { Terminal } from '@/components/terminal/Terminal';

export default function TutorialPage() {
  return (
    <div className="flex h-screen flex-col">
      <SiteHeader />
      <TutorialLayout
        guidePanel={<GuidePanel />}
        terminalPanel={<Terminal />}
      />
    </div>
  );
}
