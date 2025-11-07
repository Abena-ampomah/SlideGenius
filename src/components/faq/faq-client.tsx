'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { faqAction } from '@/app/actions';
import { HelpCircle, Sparkles, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  question: z.string().min(5, 'Question must be at least 5 characters long.'),
});

type QAPair = {
  question: string;
  answer: string;
};

const exampleQuestions = [
    "How do I convert a DOCX file?",
    "What's the best template for a marketing presentation?",
    "Can I generate an image of a 'blue elephant'?",
    "How does the web research tool work?",
];

export function FaqClient() {
  const [qaPair, setQaPair] = useState<QAPair | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setQaPair(null);
    const result = await faqAction(values);
    setIsLoading(false);

    if (result.answer) {
      setQaPair({ question: values.question, answer: result.answer });
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed to get an answer',
        description: result.error || 'An unknown error occurred.',
      });
    }
  };

  const handleExampleQuestion = (question: string) => {
    form.setValue('question', question);
    form.handleSubmit(onSubmit)();
  };

  return (
    <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight font-headline sm:text-5xl">
                Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg text-foreground/80">
                Have a question? Ask our AI assistant, or browse the examples below.
            </p>
        </div>

        <Card className="max-w-3xl mx-auto mt-12 shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Sparkles className="text-primary" /> Ask our AI
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
                        <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input placeholder="e.g., How do I add a logo to all slides?" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" size="icon" disabled={isLoading}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </Form>
            </CardContent>
            {(isLoading || qaPair) && (
                <CardContent>
                    <div className="bg-secondary p-4 rounded-lg">
                        {isLoading && <Skeleton className="h-24 w-full" />}
                        {qaPair && (
                            <Accordion type="single" collapsible defaultValue="item-1">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="font-semibold text-left">{qaPair.question}</AccordionTrigger>
                                    <AccordionContent className="pt-2 text-foreground/80">
                                    {qaPair.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )}
                    </div>
                </CardContent>
            )}
        </Card>
        
        <div className="max-w-3xl mx-auto mt-12">
            <h3 className="text-xl font-bold text-center mb-4 font-headline">Or try one of these...</h3>
            <div className="space-y-2">
                {exampleQuestions.map((q, i) => (
                    <Button key={i} variant="ghost" className="w-full justify-start h-auto py-3" onClick={() => handleExampleQuestion(q)}>
                        {q}
                    </Button>
                ))}
            </div>
        </div>
    </section>
  );
}
