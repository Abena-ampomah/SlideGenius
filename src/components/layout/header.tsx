import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Presentation } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="bg-primary rounded-md p-1.5 flex items-center justify-center">
            <Presentation className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold font-headline text-lg">SlideGenius</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <Link href="/dashboard" className="transition-colors hover:text-primary">Dashboard</Link>
          <Link href="/faq" className="transition-colors hover:text-primary">FAQ</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
