import Footer from '../components/Footer';
import Hero from '@/components/Hero';
import Demographics from '@/components/Demographics';

export default async function Home() {
  // const session = await auth();

  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <Demographics />
      <div className="w-full h-[40vh]">
        <Footer />
      </div>
    </main>
  );
}
