'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Filter, { type FilterState } from '../../components/Filter';
import { processMemberData } from '../../lib/memberStats';
import chinguData from '../data/chingu_info.json';

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

  // Process member data with filters
  const countryStats = useMemo(() => {
    const stats = processMemberData(chinguData, filters);
    return stats;
  }, [filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleMemberCountChange = (count: number, countries: number) => {
    setMemberCount(count);
    setCountryCount(countries);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-14 md:pt-20">
      <div className="w-full p-6">
        <Filter onFilterChange={handleFilterChange} members={chinguData} />

        <div className="mt-4 rounded-lg overflow-hidden" style={{ height: '600px', backgroundColor: '#E6F3FF' }}>
          <Map
            countryStats={countryStats}
            onMemberCountChange={handleMemberCountChange}
          />
        </div>

        <div className="mt-4 text-gray-600 text-sm">
          Showing {memberCount} members across {countryCount} countries
        </div>
      </div>
    </div>
  );
}

