import { LeadCapture } from '@/components/landing/lead-capture';
import { Presentation } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-secondary">
      <div className="container py-12">
        <LeadCapture />
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-md p-1.5 flex items-center justify-center">
                <Presentation className="h-5 w-5 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground font-semibold">SlideGenius</p>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SlideGenius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
