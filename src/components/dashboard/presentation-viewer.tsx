
'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '../ui/skeleton';
import { Presentation } from 'lucide-react';

export type Slide = {
  title: string;
  content: string[];
  speakerNotes: string;
};

interface PresentationViewerProps {
  slides: Slide[];
  isLoading: boolean;
}

export function PresentationViewer({ slides, isLoading }: PresentationViewerProps) {
  if (isLoading) {
    return (
      <div className="mt-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/4 mt-2" />
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6 aspect-[16/9]">
            <div className="w-full h-full space-y-4">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-5/6" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
            <Presentation className="mx-auto h-10 w-10 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl mt-4">Your Presentation is Ready!</h2>
            <p className="mt-4 text-lg text-foreground/70">
                Browse through your generated slides below. You can export the full presentation when you're done.
            </p>
        </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="overflow-hidden shadow-lg">
                  <CardHeader className='bg-muted/30'>
                    <CardTitle className="font-headline text-primary">
                      {index + 1}. {slide.title}
                    </CardTitle>
                  </CardHeader>
                  <Separator />
                  <CardContent className="flex flex-col md:flex-row gap-6 p-6">
                    <div className='flex-1 aspect-video bg-secondary rounded-lg p-6'>
                        <h3 className="font-bold text-xl mb-4">{slide.title}</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {slide.content.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='md:w-1/3'>
                        <h4 className="font-semibold mb-2 text-primary">Speaker Notes</h4>
                        <p className="text-sm text-muted-foreground">{slide.speakerNotes}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-12" />
        <CarouselNext className="hidden sm:flex -right-12" />
      </Carousel>
    </div>
  );
}
