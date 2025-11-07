import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

export function Templates() {
  return (
    <section className="w-full py-20 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Designed for Every Need</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Browse our library of professionally designed templates tailored for any industry or purpose.
          </p>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {PlaceHolderImages.map((template) => (
                <CarouselItem key={template.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Link href="/dashboard">
                      <Card className="overflow-hidden group">
                        <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                          <Image
                            src={template.imageUrl}
                            alt={template.description}
                            width={600}
                            height={400}
                            data-ai-hint={template.imageHint}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white font-headline">{template.name}</h3>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
