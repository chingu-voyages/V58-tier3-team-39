'use client';

import { useMemo, useState } from 'react';
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
  members: Array<Record<string, any>>;
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
        : segment.charAt(0).toUpperCase() + segment.slice(1)
    )
    .join('');

const createDefaultFilters = () => ({ ...DEFAULT_FILTERS });

export default function Filter({ onFilterChange, members }: FilterProps) {
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<FilterState>(createDefaultFilters);

  const { countries, genders, years } = useMemo(() => {
    const countrySet = new Set<string>();
    const genderSet = new Set<string>();
    const yearSet = new Set<number>();

    members.forEach((member) => {
      const countryName =
        member['Country name (from Country)'] || member.countryName;
      if (countryName) {
        countrySet.add(countryName);
      }

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
  }, [members]);

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
        className={`rounded-2xl border border-[#D0D5DD] ${
          showFilters ? 'bg-[#FAFAFA] p-6 md:p-8' : 'bg-[#FAFAFA] p-4'
        }`}
      >
        <div className="flex items-center justify-between">
          {showFilters ? (
            <div className="flex items-center gap-3 text-[#111322]">
              <Search className="w-5 h-5" />
              <span className="text-base font-medium">Enter country, role, tier, or gender</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <FilterIcon className="w-5 h-5 text-[#111322]" />
              <span className="text-base font-semibold text-[#111322]">
                Filters
              </span>
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
                <label className="mb-1 block text-sm font-semibold text-[#111322]">
                  Country
                </label>
                <select
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm text-[#111322] focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#111322]">
                  Gender
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm text-[#111322] focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                >
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#111322]">
                  Year Joined
                </label>
                <select
                  value={filters.yearJoined}
                  onChange={(e) =>
                    handleFilterChange('yearJoined', e.target.value)
                  }
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm text-[#111322] focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#111322]">
                  Role Type
                </label>
                <select
                  value={filters.roleType}
                  onChange={(e) => handleFilterChange('roleType', e.target.value)}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm text-[#111322] focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                >
                  {ROLE_TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#111322]">
                  Role
                </label>
                <select
                  value={filters.role}
                  onChange={(e) => handleFilterChange('role', e.target.value)}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm text-[#111322] focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                >
                  {['All Roles', ...PREDEFINED_ROLES].map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#111322]">
                  Solo Project Tier
                </label>
                <select
                  value={filters.soloProjectTier}
                  onChange={(e) =>
                    handleFilterChange('soloProjectTier', e.target.value)
                  }
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm text-[#111322] focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                >
                  {TIER_OPTIONS.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#111322]">
                  Voyage Tier
                </label>
                <select
                  value={filters.voyageTier}
                  onChange={(e) =>
                    handleFilterChange('voyageTier', e.target.value)
                  }
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm text-[#111322] focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                >
                  {TIER_OPTIONS.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#111322]">
                  Voyage
                </label>
                <select
                  value={filters.voyage}
                  onChange={(e) => handleFilterChange('voyage', e.target.value)}
                  className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm text-[#111322] focus:outline-none focus:ring-2 focus:ring-[#4D77FF]"
                >
                  {VOYAGE_OPTIONS.map((voyage) => (
                    <option key={voyage} value={voyage}>
                      {voyage}
                    </option>
                  ))}
                </select>
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
                className="w-full rounded-lg bg-white border border-[#4D77FF] px-6 py-2 text-base font-semibold text-[#4D77FF] hover:cursor-pointer md:w-auto"
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

