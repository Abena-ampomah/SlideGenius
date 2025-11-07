import { FaqClient } from '@/components/faq/faq-client';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <FaqClient />
      </main>
      <Footer />
    </div>
  );
}
