import { FilterState } from '@/types/filterState';

export const DEFAULT_FILTERS: FilterState = {
  search: '',
  country: 'All Countries',
  voyageRole: 'All Roles',
  gender: 'All Genders',
  soloProjectTier: 'All Tiers',
  yearJoined: 'All Years',
  voyageTier: 'All Tiers',
  roleType: 'All Role Types',
  voyage: 'All Voyages',
};

export const PREDEFINED_ROLES = [
  'Product Owner',
  'Scrum Master',
  'Developer',
  'UI/UX Designer',
  'Data Scientist',
  'Voyage Guide',
];

export const ROLE_TYPE_OPTIONS = ['All Role Types', 'Python', 'Web'];

export const VOYAGE_OPTIONS = [
  'All Voyages',
  ...Array.from({ length: 58 }, (_, index) => `V${58 - index}`),
];

export const TIER_OPTIONS = ['All Tiers', 'Tier 1', 'Tier 2', 'Tier 3'];

export const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .split(/([\s/-])/)
    .map((segment) =>
      segment.match(/[\s/-]/)
        ? segment
        : segment.charAt(0).toUpperCase() + segment.slice(1),
    )
    .join('');

export const createDefaultFilters = () => ({ ...DEFAULT_FILTERS });
