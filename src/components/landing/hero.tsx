import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl text-primary">
            From Document to Deck in Seconds
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            SlideGenius transforms your raw documents and data into stunning, professional presentations with the power of AI. Say goodbye to manual slide creation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start Generating <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
