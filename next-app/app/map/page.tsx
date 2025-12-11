'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Filter, { type FilterState } from '../../components/Filter';
import { getCountryStats } from '../services/statsService';
import { getMembers } from '../services/memberService';
import ChatBot from '../../components/ChatBot';

const Map = dynamic(() => import('../../components/Map'), {
  ssr: false,
});

export default function MapPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    country: 'All Countries',
    role: 'All Roles',
    gender: 'All Genders',
    soloProjectTier: 'All Tiers',
    yearJoined: 'All Years',
    voyageTier: 'All Tiers',
    roleType: 'All Role Types',
    voyage: 'All Voyages',
  });

  const [memberCount, setMemberCount] = useState(0);
  const [countryCount, setCountryCount] = useState(0);
  const [countryStats, setCountryStats] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    getCountryStats(filters)
      .then(setCountryStats)
      .catch(console.error);
    
    getMembers(filters)
      .then(setMembers)
      .catch(console.error);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleMemberCountChange = (count: number, countries: number) => {
    setMemberCount(count);
    setCountryCount(countries);
  };

  return (
    <div className="w-full min-h-screen bg-white pt-14 md:pt-20">
      <div className="w-full p-6">
        <Filter onFilterChange={handleFilterChange} members={members} />

        <div className="mt-4 rounded-lg overflow-hidden" style={{ height: '600px', backgroundColor: '#E6F3FF' }}>
          <Map
            countryStats={countryStats}
            onMemberCountChange={handleMemberCountChange}
          />
        </div>

        <div className="mt-4 text-gray-600 text-sm">
          Showing {memberCount} members across {countryCount} countries
        </div>

        <ChatBot />
      </div>
    </div>
  );
}

