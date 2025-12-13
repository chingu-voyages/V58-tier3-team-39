'use client';

import Link from 'next/link';
import Chingu from './icons/Chingu';
import Button1 from './ui/Button1';

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
          <Button1>Map View</Button1>
        </Link>
        <Link href="/list">
          <Button1 variant="secondary">List View</Button1>
        </Link>
      </div>
      {/* <div className="bg-white w-[600px] h-[300px] p-3">
        <Button onClick={() => console.log('clicked')} variant="secondary">
          Dashboard
        </Button>
      </div> */}

      <div className="flex flex-col gap-4 md:gap-16 lg:gap-24 md:flex-row md:mt-3 lg:mt-10">
        {stats.map((item, i) => (
          <div key={i}>
            <p className={`text-3xl lg:text-5xl font-medium ${item.color}`}>
              {item.value}
            </p>
            <p className="text-[#636363] font-medium mt-1 md:mt-4 text-lg md:text-xl">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
