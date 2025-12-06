'use client';

import Link from 'next/link';
import Chingu from './icons/Chingu';
import Button from './ui/Button';
import Stats from './Stats';

const Hero = () => {
  const stats = [
    { value: '250+', label: 'Total Members', color: 'text-red' },
    { value: '20+', label: 'Countries', color: 'text-green' },
    { value: '30', label: 'Active Teams', color: 'text-blue' },
    { value: '3', label: 'Tier Levels', color: 'text-purple' },
  ];

  return (
    <div className="h-screen bg-[#F1F5F9] flex flex-col justify-center items-center px-4 md:px-8 text-center gap-6 md:gap-7 lg:gap-10 mt-10 lg:mt-0">
      <Chingu />
      <h1 className="text-3xl lg:text-5xl font-semibold text-[#232925]">
        Discover the Global <span className="text-[#4D77FF]">Chingu </span>
        Community
      </h1>
      <h3 className="font-medium text-[#636363] md:max-w-2/4 md:text-2xl">
        Learn more about where our members are located and the demographics of
        our members.
      </h3>
      <div className="flex gap-5">
        <Link href="/map">
          <Button>Map View</Button>
        </Link>
        <Link href="/list">
          <Button variant="secondary">List View</Button>
        </Link>
      </div>
      {/* <div className="bg-white w-[600px] h-[300px] p-3">
        <Button onClick={() => console.log('clicked')} variant="secondary">
          Dashboard
        </Button>
      </div> */}

      <Stats stats={stats} />
    </div>
  );
};

export default Hero;
