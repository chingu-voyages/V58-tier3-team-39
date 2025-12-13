'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Chingu from './icons/Chingu';
import Button from './ui/Button';
import Stats from './Stats';
import { getSummaryStats } from '../app/services/statsService';

const Hero = () => {
  const [summaryStats, setSummaryStats] = useState<any>(null);

  useEffect(() => {
    getSummaryStats().then(setSummaryStats).catch(console.error);
  }, []);

  const stats = [
    {
      value: `${summaryStats?.totalMembers || 250}+`,
      label: 'Total Members',
      color: 'text-red',
    },
    {
      value: `${summaryStats?.totalCountries || 20}+`,
      label: 'Countries',
      color: 'text-green',
    },
    {
      value: `${summaryStats?.activeTeams || 30}`,
      label: 'Active Teams',
      color: 'text-blue',
    },
    {
      value: `${summaryStats?.tierLevels || 3}`,
      label: 'Tier Levels',
      color: 'text-purple',
    },
  ];

  return (
    <div className="pt-32 flex flex-col justify-center items-center px-4 md:px-8 text-center gap-6 md:gap-7 lg:gap-10">
      <Chingu className="hidden sm:block w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
      <h1 className="text-2xl sm:text-[1.75rem] md:text-[2.125rem] lg:text-[2.75rem] font-semibold">
        Discover the Global <span className="text-[#4D77FF]">Chingu </span>
        Community
      </h1>

      <h3 className="w-2/3 lg:w-1/2 text-base sm:text-xl lg:text-[1.375rem] font-medium text-secondary-text">
        Learn more about where our members are located and the demographics of
        our members.
      </h3>

      <div className="flex gap-3 sm:gap-5 mb-20">
        <Link href="/map">
          <Button>Map View</Button>
        </Link>
        <Link href="/list">
          <Button variant="secondary">List View</Button>
        </Link>
      </div>
      {/* <div className="bg-white w-[600px] h-[300px] p-3">
        <Button onClick={() => {}} variant="secondary">
          Dashboard
        </Button>
      </div> */}

      <Stats stats={stats} />
    </div>
  );
};

export default Hero;
