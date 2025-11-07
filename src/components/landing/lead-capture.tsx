import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function LeadCapture() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h3 className="text-2xl font-bold font-headline sm:text-3xl">Stay Ahead of the Curve</h3>
      <p className="mt-3 text-lg text-foreground/70">
        Sign up for our newsletter to get the latest on AI presentation tools, tips, and templates.
      </p>
      <form className="mt-6 flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                type="email"
                placeholder="Enter your email"
                className="pl-10 h-12 w-full"
                aria-label="Email for newsletter"
            />
        </div>
        <Button type="submit" size="lg" className="w-full sm:w-auto h-12">Subscribe</Button>
      </form>
    </div>
  );
}
