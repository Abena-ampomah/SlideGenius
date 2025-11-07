'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generateImageAction } from '@/app/actions';
import { Sparkles, Image as ImageIcon, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters long.'),
});

export function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setImageUrl(null);
    const result = await generateImageAction(values);
    setIsLoading(false);

    if (result.imageDataUri) {
      setImageUrl(result.imageDataUri);
    } else {
      toast({
        variant: 'destructive',
        title: 'Image Generation Failed',
        description: result.error || 'An unknown error occurred.',
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card className="shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">AI Image Generator</CardTitle>
              <CardDescription>Describe the image you want to create for your slide. Be as descriptive as possible!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Prompt</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., A futuristic city skyline at sunset, digital art" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                <Sparkles className="mr-2 h-4 w-4" />
                {isLoading ? 'Generating...' : 'Generate Image'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Generated Image</CardTitle>
          <CardDescription>Your generated image will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center p-2 bg-secondary rounded-b-lg">
          {isLoading && <Skeleton className="w-full h-full" />}
          {!isLoading && imageUrl && (
            <div className="relative w-full aspect-video group">
              <Image src={imageUrl} alt="Generated image" layout="fill" objectFit="contain" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="icon" asChild>
                  <a href={imageUrl} download="slidegenius-image.png">
                    <Download />
                  </a>
                </Button>
              </div>
            </div>
          )}
          {!isLoading && !imageUrl && (
            <div className="flex flex-col items-center justify-center text-muted-foreground h-full w-full">
              <ImageIcon className="h-16 w-16 mb-4" />
              <p>Your image awaits</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
