'use client';

import { useMemo, useState } from 'react';
import { Filter as FilterIcon, ChevronDown } from 'lucide-react';

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
  members: Array<Record<string, any>>;
  countryStats?: Array<{ countryName: string }>;
}

const DEFAULT_FILTERS: FilterState = {
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

const PREDEFINED_ROLES = [
  'Product Owner',
  'Scrum Master',
  'Developer',
  'UI/UX Designer',
  'Data Scientist',
  'Voyage Guide',
];

const ROLE_TYPE_OPTIONS = ['All Role Types', 'Python', 'Web'];

const VOYAGE_OPTIONS = [
  'All Voyages',
  ...Array.from({ length: 58 }, (_, index) => `V${58 - index}`),
];

const TIER_OPTIONS = ['All Tiers', 'Tier 1', 'Tier 2', 'Tier 3'];

const normalize = (value: unknown) =>
  typeof value === 'string' ? value.trim().toLowerCase() : '';

const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .split(/([\s/-])/)
    .map((segment) =>
      segment.match(/[\s/-]/)
        ? segment
        : segment.charAt(0).toUpperCase() + segment.slice(1),
    )
    .join('');

const createDefaultFilters = () => ({ ...DEFAULT_FILTERS });

export default function Filter({
  onFilterChange,
  members,
  countryStats,
}: FilterProps) {
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<FilterState>(createDefaultFilters);

  const { countries, genders, years } = useMemo(() => {
    const countrySet = new Set<string>();
    const genderSet = new Set<string>();
    const yearSet = new Set<number>();

    if (countryStats && countryStats.length > 0) {
      countryStats.forEach((stat) => {
        if (stat.countryName) {
          countrySet.add(stat.countryName);
        }
      });
    } else {
      members.forEach((member) => {
        const countryName =
          member['Country name (from Country)'] ||
          member.countryName ||
          member.country;
        if (countryName) {
          countrySet.add(countryName);
        }
      });
    }

    members.forEach((member) => {
      const gender = member.Gender || member.gender;
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

      const timestamp = member.Timestamp || member.timestamp;
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
  }, [members, countryStats]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = (nextFilters: FilterState) => {
    onFilterChange(nextFilters);
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
  };

  const handleClearAll = () => {
    const clearedFilters = createDefaultFilters();
    setFilters(clearedFilters);
    applyFilters(clearedFilters);
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
            className="text-sm font-semibold text-blue-brand hover:text-blue-brand/50 hover:cursor-pointer"
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
                    value={filters.role}
                    onChange={(e) => handleFilterChange('role', e.target.value)}
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
                className="w-full rounded-lg bg-blue-brand hover:bg-[#456be5] px-6 py-2 text-base font-semibold text-white  cursor-pointer md:w-auto"
              >
                Apply Filters
              </button>
              <button
                onClick={handleClearAll}
                className="w-full rounded-lg border border-blue-brand hover:bg-blue-brand/20 px-6 py-2 text-base font-semibold text-[#4D77FF] cursor-pointer md:w-auto"
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
