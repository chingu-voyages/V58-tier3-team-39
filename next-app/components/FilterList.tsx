'use client';

import { useMemo, useState } from 'react';
import { Filter as FilterIcon, ChevronDown } from 'lucide-react';
import { FilterState } from '@/types/filterState';
import { Member } from '@/types/member';
import {
  createDefaultFilters,
  formatLabel,
  PREDEFINED_ROLES,
  ROLE_TYPE_OPTIONS,
  TIER_OPTIONS,
  VOYAGE_OPTIONS,
} from '@/lib/filters';

interface FilterProps {
  members: Member[];
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
}

export function FilterList({ members, onChangeFilters }: FilterProps) {
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<FilterState>(createDefaultFilters);

  const { countries, genders, years } = useMemo(() => {
    const countrySet = new Set<string>();
    const genderSet = new Set<string>();
    const yearSet = new Set<number>();

    members.forEach((member) => {
      const countryName = member.countryName;
      if (countryName) {
        countrySet.add(countryName);
      }

      const gender = member.gender;
      if (gender) {
        const normalizedGender = gender.trim().toUpperCase();
        if (
          normalizedGender &&
          normalizedGender !== 'TRANS' &&
          normalizedGender !== 'TRANSGENDER'
        ) {
          genderSet.add(formatLabel(gender));
        }
      }

      const timestamp = member.timestamp;
      if (timestamp) {
        const year = new Date(timestamp).getFullYear();
        if (!Number.isNaN(year) && year >= 2017) {
          yearSet.add(year);
        }
      }
    });

    const currentYear = new Date().getFullYear();
    const explicitYears: string[] = [];
    for (let year = currentYear; year >= 2017; year--) {
      explicitYears.push(year.toString());
    }

    const derivedYears = Array.from(yearSet)
      .map((year) => year.toString())
      .filter((year) => !explicitYears.includes(year));

    return {
      countries: ['All Countries', ...Array.from(countrySet).sort()],
      genders: ['All Genders', ...Array.from(genderSet).sort()],
      years: [
        'All Years',
        ...explicitYears,
        ...derivedYears.sort((a, b) => Number(b) - Number(a)),
      ],
    };
  }, [members]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = (nextFilters: FilterState) => {
    onChangeFilters(nextFilters);
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
  };

  const handleClearAll = () => {
    onChangeFilters(createDefaultFilters());
  };

  return (
    <div className="w-full mb-4">
      <div
        className={`rounded-2xl border border-list-border ${
          showFilters ? 'p-6 md:p-8' : 'p-4'
        }`}
      >
        <div className="flex items-center justify-between">
          {showFilters ? (
            <div className="flex items-center gap-3">
              <FilterIcon className="w-5 h-5" />
              <span className="text-base font-medium">
                Enter country, role, tier, or gender
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <FilterIcon className="w-5 h-5" />
              <span className="text-base font-semibold">Filters</span>
            </div>
          )}
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="text-sm font-semibold text-[#4D77FF] hover:cursor-pointer"
          >
            {showFilters ? 'Hide filters' : 'Show filters'}
          </button>
        </div>

        {showFilters && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-secondary-text">
                  Country
                </label>
                <div className='relative'>
                  <select
                    value={filters.country}
                    onChange={(e) =>
                      handleFilterChange('country', e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-list-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <ChevronDown className="h-4 w-4"/>
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-secondary-text">
                  Gender
                </label>
                <div className='relative'>
                  <select
                    value={filters.gender}
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                    className="w-full appearance-none rounded-lg border border-list-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                  >
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <ChevronDown className="h-4 w-4"/>
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-secondary-text">
                  Year Joined
                </label>
                <div className='relative'>
                  <select
                    value={filters.yearJoined}
                    onChange={(e) =>
                      handleFilterChange('yearJoined', e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-list-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <ChevronDown className="h-4 w-4"/>
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-secondary-text">
                  Role Type
                </label>
                <div className='relative'>
                  <select
                    value={filters.roleType}
                    onChange={(e) =>
                      handleFilterChange('roleType', e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-list-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                  >
                    {ROLE_TYPE_OPTIONS.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <ChevronDown className="h-4 w-4"/>
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-secondary-text">Role</label>
                <div className='relative'>
                  <select
                    value={filters.voyageRole}
                    onChange={(e) =>
                      handleFilterChange('voyageRole', e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-list-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                  >
                    {['All Roles', ...PREDEFINED_ROLES].map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <ChevronDown className="h-4 w-4"/>
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-secondary-text">
                  Solo Project Tier
                </label>
                <div className='relative'>
                  <select
                    value={filters.soloProjectTier}
                    onChange={(e) =>
                      handleFilterChange('soloProjectTier', e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-list-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                  >
                    {TIER_OPTIONS.map((tier) => (
                      <option key={tier} value={tier}>
                        {tier}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <ChevronDown className="h-4 w-4"/>
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-secondary-text">
                  Voyage Tier
                </label>
                <div className='relative'>
                  <select
                    value={filters.voyageTier}
                    onChange={(e) =>
                      handleFilterChange('voyageTier', e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-list-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                  >
                    {TIER_OPTIONS.map((tier) => (
                      <option key={tier} value={tier}>
                        {tier}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <ChevronDown className="h-4 w-4"/>
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-secondary-text">
                  Voyage
                </label>
                <div className='relative'>
                  <select
                    value={filters.voyage}
                    onChange={(e) => handleFilterChange('voyage', e.target.value)}
                    className="w-full appearance-none rounded-lg border border-list-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                  >
                    {VOYAGE_OPTIONS.map((voyage) => (
                      <option key={voyage} value={voyage}>
                        {voyage}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <ChevronDown className="h-4 w-4"/>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <button
                onClick={handleApplyFilters}
                className="w-full rounded-lg bg-[#4D77FF] px-6 py-2 text-base font-semibold text-white hover:cursor-pointer md:w-auto"
              >
                Apply Filters
              </button>
              <button
                onClick={handleClearAll}
                className="w-full rounded-lg border border-[#4D77FF] px-6 py-2 text-base font-semibold text-[#4D77FF] hover:cursor-pointer md:w-auto"
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
