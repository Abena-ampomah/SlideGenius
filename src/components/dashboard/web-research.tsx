'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { researchAction } from '@/app/actions';
import { Search, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  topic: z.string().min(5, 'Topic must be at least 5 characters long.'),
});

export function WebResearch() {
  const [researchData, setResearchData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResearchData(null);
    const result = await researchAction(values);
    setIsLoading(false);

    if (result.researchData) {
      setResearchData(result.researchData);
    } else {
      toast({
        variant: 'destructive',
        title: 'Research Failed',
        description: result.error || 'An unknown error occurred.',
      });
    }
  };

  const handleCopy = () => {
    if (researchData) {
      navigator.clipboard.writeText(researchData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">AI Web Research</CardTitle>
              <CardDescription>Enter a topic, and our AI will gather relevant data and statistics for your presentation.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Research Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The future of renewable energy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                <Search className="mr-2 h-4 w-4" />
                {isLoading ? 'Researching...' : 'Start Research'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      { (isLoading || researchData) &&
        <Card className="mt-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline">Research Results</CardTitle>
                    <CardDescription>Here's what the AI found on your topic.</CardDescription>
                </div>
                {researchData && (
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                )}
                {researchData && (
                    <div className="prose prose-sm max-w-none text-foreground bg-secondary p-4 rounded-md">
                        <pre className="whitespace-pre-wrap font-body text-sm bg-transparent p-0">{researchData}</pre>
                    </div>
                )}
            </CardContent>
        </Card>
      }
    </div>
  );
}
