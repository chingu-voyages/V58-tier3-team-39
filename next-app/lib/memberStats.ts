import type { FilterState } from '../components/Filter';
import { getCountryCoordinates } from './countryCoordinates';

export interface CountryStats {
  countryName: string;
  countryCode?: string;
  coordinates: [number, number] | null;
  count: number;
  topRole: string;
  commonGender: string;
  members: any[];
}

export interface MemberData {
  [key: string]: any;
}

const normalize = (value: unknown) =>
  typeof value === 'string' ? value.trim().toLowerCase() : '';

const toDisplayLabel = (value: string) => {
  const normalized = value.toLowerCase();
  
  // Special cases for acronyms
  if (normalized === 'ui/ux designer') {
    return 'UI/UX Designer';
  }
  
  return normalized
    .split(/([\s/-])/)
    .map((segment) =>
      segment.match(/[\s/-]/)
        ? segment
        : segment.charAt(0).toUpperCase() + segment.slice(1)
    )
    .join('');
};

const mapRoleTypeCategory = (value?: string) => {
  const normalized = normalize(value);
  if (!normalized) {
    return 'unknown';
  }

  if (
    normalized.includes('python') ||
    normalized.includes('data') ||
    normalized.includes('ml') ||
    normalized.includes('ai')
  ) {
    return 'python';
  }

  return 'web';
};

const matchesSelection = (
  filterValue: string,
  candidate: string | undefined,
  defaultLabel: string
) => {
  if (!filterValue || filterValue === defaultLabel) {
    return true;
  }
  return normalize(candidate) === normalize(filterValue);
};

const matchesTier = (filterValue: string, candidate: string | undefined) => {
  if (!filterValue || filterValue === 'All Tiers') {
    return true;
  }
  const desiredTier = normalizeTierValue(filterValue);
  if (!desiredTier) {
    return true;
  }
  return normalizeTierValue(candidate) === desiredTier;
};

const matchesVoyage = (filterValue: string, candidate: string | undefined) => {
  if (!filterValue || filterValue === 'All Voyages') {
    return true;
  }
  return (candidate || '').trim().toUpperCase() === filterValue.toUpperCase();
};

const normalizeTierValue = (value?: string) => {
  const normalized = normalize(value);
  if (!normalized) return '';
  const match = normalized.match(/(\d+)/);
  if (match) {
    return `tier ${match[1]}`;
  }
  if (normalized.startsWith('tier')) {
    return normalized;
  }
  return normalized;
};

export function processMemberData(
  members: MemberData[],
  filters?: FilterState
): CountryStats[] {
  let filteredMembers = members;

  if (filters) {
    filteredMembers = members.filter((member) => {
      const countryName =
        member['Country name (from Country)'] || member.countryName || '';
      const role = member['Voyage Role'] || member.voyageRole || '';
      const roleType = member['Role Type'] || member.roleType || '';
      const gender = member.Gender || member.gender || '';
      const soloTier = member['Solo Project Tier'] || member.soloProjectTier;
      const voyageTier = member['Voyage Tier'] || member.voyageTier;
      const voyage =
        member['Voyage (from Voyage Signups)'] || member.voyage || '';

      // Search filter
      if (filters.search?.trim()) {
        const searchLower = filters.search.trim().toLowerCase();
        const searchableText = [
          countryName,
          role,
          roleType,
          gender,
          soloTier,
          voyageTier,
          voyage,
          member.goal || member.Goal || '',
          member['Role Type'] || '',
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        if (!searchableText.includes(searchLower)) {
          return false;
        }
      }

      if (!matchesSelection(filters.country, countryName, 'All Countries')) {
        return false;
      }

      if (!matchesSelection(filters.role, role, 'All Roles')) {
        return false;
      }

      if (!matchesSelection(filters.gender, gender, 'All Genders')) {
        return false;
      }

      if (!matchesTier(filters.soloProjectTier, soloTier)) {
        return false;
      }

      if (!matchesTier(filters.voyageTier, voyageTier)) {
        return false;
      }

      if (filters.yearJoined && filters.yearJoined !== 'All Years') {
        const timestamp = member.Timestamp || member.timestamp;
        if (!timestamp) {
          return false;
        }
        const year = new Date(timestamp).getFullYear();
        if (Number.isNaN(year) || year.toString() !== filters.yearJoined) {
          return false;
        }
      }

      if (filters.roleType && filters.roleType !== 'All Role Types') {
        const desiredRoleType = normalize(filters.roleType);
        const memberRoleCategory = mapRoleTypeCategory(roleType);
        if (memberRoleCategory !== desiredRoleType) {
          return false;
        }
      }

      if (!matchesVoyage(filters.voyage, voyage)) {
        return false;
      }

      return true;
    });
  }

  const countryMap = new Map<string, any[]>();

  filteredMembers.forEach((member) => {
    const countryName =
      member['Country name (from Country)'] || member.countryName || 'Unknown';
    if (!countryMap.has(countryName)) {
      countryMap.set(countryName, []);
    }
    countryMap.get(countryName)!.push(member);
  });

  const countryStats: CountryStats[] = [];

  countryMap.forEach((membersInCountry, countryName) => {
    const coordinates = getCountryCoordinates(countryName);
    const countryCode = membersInCountry
      .map((member) => member['Country Code'] || member.countryCode)
      .find((code) => !!code);

    const roleCounts = new Map<string, number>();
    membersInCountry.forEach((member) => {
      const role = member['Voyage Role'] || member.voyageRole || 'Unknown';
      const displayRole = role ? toDisplayLabel(role) : 'Unknown';
      roleCounts.set(displayRole, (roleCounts.get(displayRole) || 0) + 1);
    });
    const topRole =
      Array.from(roleCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      'Unknown';

    const genderCounts = new Map<string, number>();
    membersInCountry.forEach((member) => {
      const gender = member.Gender || member.gender || 'Unknown';
      const displayGender = gender ? toDisplayLabel(gender) : 'Unknown';
      genderCounts.set(displayGender, (genderCounts.get(displayGender) || 0) + 1);
    });
    const commonGender =
      Array.from(genderCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      'Unknown';

    countryStats.push({
      countryName,
      countryCode: countryCode ? countryCode.toString() : undefined,
      coordinates,
      count: membersInCountry.length,
      topRole,
      commonGender,
      members: membersInCountry,
    });
  });

  return countryStats.sort((a, b) => b.count - a.count);
}

