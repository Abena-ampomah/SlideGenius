import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Image, Bot, Search, FileQuestion, Library } from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: 'Document Conversion',
    description: 'Instantly turn your documents and spreadsheets into structured presentation slides.',
  },
  {
    icon: <Library className="w-8 h-8 text-primary" />,
    title: 'Thematic Templates',
    description: 'Choose from a library of templates for marketing, creative portfolios, and more.',
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: 'AI Chatbot Assistant',
    description: 'Get presentation tips and user assistance from our integrated AI chatbot.',
  },
  {
    icon: <Image className="w-8 h-8 text-primary" />,
    title: 'AI Image Generation',
    description: 'Generate unique, custom images for your slides with a simple text prompt.',
  },
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: 'Automated Web Research',
    description: 'Let AI gather relevant data and statistics for your presentation topics.',
  },
  {
    icon: <FileQuestion className="w-8 h-8 text-primary" />,
    title: 'AI-Powered FAQ',
    description: 'Have your questions answered instantly by our AI-driven FAQ section.',
  },
];

export function Features() {
  return (
    <section id="features" className="w-full py-20 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Everything You Need to Create</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Powerful features that streamline your presentation workflow from start to finish.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="mb-4">{feature.icon}</div>
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-2 text-base">
                {feature.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
