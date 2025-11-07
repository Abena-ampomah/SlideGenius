'use client';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { chatAction } from '@/app/actions';
import { Send, User, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  query: z.string().min(1, 'Message cannot be empty.'),
});

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userMessage: Message = { role: 'user', content: values.query };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    form.reset();

    const result = await chatAction(values);
    setIsLoading(false);
    
    if (result.response) {
      const botMessage: Message = { role: 'bot', content: result.response };
      setMessages((prev) => [...prev, botMessage]);
    } else {
      toast({
        variant: 'destructive',
        title: 'Chat Error',
        description: result.error || 'An unknown error occurred.',
      });
      setMessages(messages.slice(0,-1));
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto h-[70vh] flex flex-col shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">AI Assistant</CardTitle>
        <CardDescription>Ask for presentation tips, advice on slide structure, or any other questions you have.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}>
                {message.role === 'bot' && (
                  <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                    <AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback>
                  </Avatar>
                )}
                <div className={cn(
                  'p-3 rounded-lg max-w-md', 
                  message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                )}>
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><User className="w-5 h-5"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                    <AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-secondary">
                  <div className="flex items-center space-x-1">
                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center gap-2">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Ask a question..." {...field} autoComplete="off" disabled={isLoading} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
