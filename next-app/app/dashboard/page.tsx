'use client';
import { useState, useEffect } from 'react';
import { getDemographicsStats, getCountryStats } from '../services/statsService';
import DonutChartComponent from '@/components/DonutChart';
import PieChartComponent from '@/components/PieChart';
import StatCard from '@/components/StatCard';
import { Briefcase, MapPin, User } from 'lucide-react';
import dynamic from 'next/dynamic';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [countryStats, setCountryStats] = useState<any[]>([]);
  const [memberCount, setMemberCount] = useState(0);
  const [countryCount, setCountryCount] = useState(0);

  useEffect(() => {
    Promise.all([
      getDemographicsStats(),
      getCountryStats()
    ]).then(([demographics, countries]) => {
      setStats(demographics);
      setCountryStats(countries);
    }).catch(console.error);
  }, []);

  const handleMemberCountChange = (count: number, countries: number) => {
    setMemberCount(count);
    setCountryCount(countries);
  };

  const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
  });

  return (
    <main
      className="
  w-full min-h-screen px-4 md:px-8 py-20 md:py-30 
  overflow-x-auto

  md:gap-4

  lg:grid 
  lg:grid-cols-[1fr_2fr]  
  lg:grid-rows-2 auto
  lg:gap-6
"
    >
      {/* LEFT COL — STAT CARDS */}
      <div className="flex flex-col gap-4 md:gap-10 md:row-span-2 mb-4">
        <StatCard
          title="Common Role"
          icon={<Briefcase />}
          item={stats?.commonRole?.name ?? 'N/A'}
          value={stats?.commonRole?.value ?? 0}
        />
        <StatCard
          title="Common Location"
          icon={<MapPin />}
          item={stats?.commonLocation?.name ?? 'N/A'}
          value={stats?.commonLocation?.value ?? 0}
        />
        <StatCard
          title="Common Tier"
          icon={<User />}
          item={stats?.commonTier?.name ?? 'N/A'}
          value={stats?.commonTier?.value ?? 0}
        />
      </div>

      {/* RIGHT COL — Map */}
      <div className="w-full h-[400px] md:h-full">
        <Map
          countryStats={countryStats}
          onMemberCountChange={handleMemberCountChange}
        />
      </div>

      {/* RIGHT COL — Charts */}
      <div className="flex flex-col md:flex-row gap-4 w-full min-h-[300px] mt-30 md:mt-10 lg:mt-0">
        <div className="flex-1 flex">
          <PieChartComponent title="Voyage Roles" data={stats?.roleChart ?? []} />
        </div>

        <div className="flex-1 flex">
          <DonutChartComponent
            title="Gender Breakdown"
            data={stats?.genderChart ?? []}
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
