import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <Header />
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
