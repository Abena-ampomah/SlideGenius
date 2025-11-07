
'use client';

import { useState } from 'react';
import { DocumentConverter } from '@/components/dashboard/document-converter';
import { PresentationViewer, type Slide } from '@/components/dashboard/presentation-viewer';

export default function DashboardPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-8">
      <DocumentConverter 
        setSlides={setSlides}
        setIsLoading={setIsLoading}
      />
      <PresentationViewer slides={slides} isLoading={isLoading} />
    </div>
  );
}
