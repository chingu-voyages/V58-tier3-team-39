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
      <section className="flex justify-center items-center p-24 min-h-[80vh] bg-[url('/images/carousel-bg.png')] bg-cover bg-center bg-no-repeat">
        <Carousel />
      </section>
      <div className="w-full h-[40vh]">
        <Footer />
      </div>
    </main>
  );
}
