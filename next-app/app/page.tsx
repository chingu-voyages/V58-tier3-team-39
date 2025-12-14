import Carousel from '@/components/Carousel';
import Footer from '../components/Footer';
import Hero from '@/components/Hero';
import Demographics from '@/components/Demographics';
import MemberDemographics from '@/components/MemberDemographics';

export default async function Home() {
  // const session = await auth();

  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <MemberDemographics />
      <section className="flex justify-center items-center p-24 mb-8 min-h-200 bg-[url('/images/1.avif')] bg-cover bg-center bg-no-repeat">
        <Carousel />
      </section>
    
    </main>
  );
}
