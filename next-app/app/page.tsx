import { auth } from '@/lib/auth-helpers';
import Header from '../components/Header';
import Component1 from '../components/Component1';
import Component2 from '../components/Component2';
import Footer from '../components/Footer';

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col w-full">
      <section className="h-[70vh] w-full">
        <Header session={session} />
      </section>
      <main className="w-full">
        <div className="w-full px-6 py-8 space-y-4">
          <div className="flex justify-center w-full">
            <Component1 />
          </div>
          <div className="flex justify-center w-full">
            <Component2 />
          </div>
        </div>
      </main>
      <div className="w-full h-[40vh]">
        <Footer />
      </div>
    </div>
  );
}
