'use client';

import { useState } from 'react';
import { Search, Filter as FilterIcon } from 'lucide-react';

export interface FilterState {
  search: string;
  country: string;
  role: string;
  gender: string;
  soloProjectTier: string;
  yearJoined: string;
  voyageTier: string;
  roleType: string;
  voyage: string;
}

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
  members: any[];
}

export default function Filter({ onFilterChange, members }: FilterProps) {
  const [showFilters, setShowFilters] = useState(false);
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

  // Extract unique values for dropdowns
  const countries = [
    'All Countries',
    ...Array.from(
      new Set(
        members
          .map((m) => m['Country name (from Country)'] || m.countryName)
          .filter(Boolean)
      )
    ).sort(),
  ];

  const roles = [
    'All Roles',
    ...Array.from(
      new Set(
        members
          .map((m) => m['Voyage Role'] || m.voyageRole)
          .filter(Boolean)
      )
    ).sort(),
  ];

  const genders = [
    'All Genders',
    ...Array.from(
      new Set(
        members.map((m) => m.Gender || m.gender).filter(Boolean)
      )
    ).sort(),
  ];

  const soloTiers = [
    'All Tiers',
    ...Array.from(
      new Set(
        members
          .map((m) => m['Solo Project Tier'] || m.soloProjectTier)
          .filter(Boolean)
      )
    ).sort(),
  ];

  const voyageTiers = [
    'All Tiers',
    ...Array.from(
      new Set(
        members.map((m) => m['Voyage Tier'] || m.voyageTier).filter(Boolean)
      )
    ).sort(),
  ];

  const roleTypes = [
    'All Role Types',
    ...Array.from(
      new Set(
        members.map((m) => m['Role Type'] || m.roleType).filter(Boolean)
      )
    ).sort(),
  ];

  const voyages = [
    'All Voyages',
    ...Array.from(
      new Set(
        members
          .map((m) => m['Voyage (from Voyage Signups)'] || m.voyage)
          .filter(Boolean)
      )
    ).sort(),
  ];

  // Extract years from Timestamp
  const years = [
    'All Years',
    ...Array.from(
      new Set(
        members
          .map((m) => {
            const timestamp = m.Timestamp || m.timestamp;
            if (timestamp) {
              const year = new Date(timestamp).getFullYear();
              return isNaN(year) ? null : year.toString();
            }
            return null;
          })
          .filter((year): year is string => year !== null)
      )
    )
      .sort()
      .reverse(),
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleClearAll = () => {
    const clearedFilters: FilterState = {
      search: '',
      country: 'All Countries',
      role: 'All Roles',
      gender: 'All Genders',
      soloProjectTier: 'All Tiers',
      yearJoined: 'All Years',
      voyageTier: 'All Tiers',
      roleType: 'All Role Types',
      voyage: 'All Voyages',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="w-full mb-4">
      <div className="bg-white border border-gray-300 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FilterIcon className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Filters</span>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-blue-600 hover:underline"
          >
            {showFilters ? 'Hide filters' : 'Show filters'}
          </button>
        </div>

        {showFilters && (
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter country, role, tier, or gender"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={filters.role}
                  onChange={(e) => handleFilterChange('role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Solo Project Tier
                </label>
                <select
                  value={filters.soloProjectTier}
                  onChange={(e) =>
                    handleFilterChange('soloProjectTier', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {soloTiers.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year Joined
                </label>
                <select
                  value={filters.yearJoined}
                  onChange={(e) =>
                    handleFilterChange('yearJoined', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Voyage Tier
                </label>
                <select
                  value={filters.voyageTier}
                  onChange={(e) =>
                    handleFilterChange('voyageTier', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {voyageTiers.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Type
                </label>
                <select
                  value={filters.roleType}
                  onChange={(e) => handleFilterChange('roleType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {roleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Voyage
                </label>
                <select
                  value={filters.voyage}
                  onChange={(e) => handleFilterChange('voyage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {voyages.map((voyage) => (
                    <option key={voyage} value={voyage}>
                      {voyage}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleApplyFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
              <button
                onClick={handleClearAll}
                className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

