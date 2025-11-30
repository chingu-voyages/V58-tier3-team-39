import Footer from '../components/Footer';
import Hero from '@/components/Hero';

export default async function Home() {
  // const session = await auth();

  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <div className="w-full h-[40vh]">
        <Footer />
      </div>
    </main>
  );
}
