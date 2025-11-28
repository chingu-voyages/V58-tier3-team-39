import type { FilterState } from '../components/Filter';
import { getCountryCoordinates } from './countryCoordinates';

export interface CountryStats {
  countryName: string;
  coordinates: [number, number] | null;
  count: number;
  topRole: string;
  commonGender: string;
  members: any[];
}

export interface MemberData {
  [key: string]: any;
}

export function processMemberData(
  members: MemberData[],
  filters?: FilterState
): CountryStats[] {
  // Apply filters if provided
  let filteredMembers = members;

  if (filters) {
    filteredMembers = members.filter((member) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const countryName =
          member['Country name (from Country)'] || member.countryName || '';
        const role = member['Voyage Role'] || member.voyageRole || '';
        const roleType = member['Role Type'] || member.roleType || '';
        const gender = member.Gender || member.gender || '';
        const soloTier =
          member['Solo Project Tier'] || member.soloProjectTier || '';
        const voyageTier = member['Voyage Tier'] || member.voyageTier || '';

        const searchableText = [
          countryName,
          role,
          roleType,
          gender,
          soloTier,
          voyageTier,
        ]
          .join(' ')
          .toLowerCase();

        if (!searchableText.includes(searchLower)) {
          return false;
        }
      }

      // Country filter
      if (filters.country && filters.country !== 'All Countries') {
        const countryName =
          member['Country name (from Country)'] || member.countryName || '';
        if (countryName !== filters.country) {
          return false;
        }
      }

      // Role filter
      if (filters.role && filters.role !== 'All Roles') {
        const role = member['Voyage Role'] || member.voyageRole || '';
        if (role !== filters.role) {
          return false;
        }
      }

      // Gender filter
      if (filters.gender && filters.gender !== 'All Genders') {
        const gender = member.Gender || member.gender || '';
        if (gender !== filters.gender) {
          return false;
        }
      }

      // Solo Project Tier filter
      if (
        filters.soloProjectTier &&
        filters.soloProjectTier !== 'All Tiers'
      ) {
        const soloTier =
          member['Solo Project Tier'] || member.soloProjectTier || '';
        if (soloTier !== filters.soloProjectTier) {
          return false;
        }
      }

      // Year Joined filter
      if (filters.yearJoined && filters.yearJoined !== 'All Years') {
        const timestamp = member.Timestamp || member.timestamp || '';
        if (timestamp) {
          const year = new Date(timestamp).getFullYear();
          if (year.toString() !== filters.yearJoined) {
            return false;
          }
        } else {
          return false;
        }
      }

      // Voyage Tier filter
      if (filters.voyageTier && filters.voyageTier !== 'All Tiers') {
        const voyageTier = member['Voyage Tier'] || member.voyageTier || '';
        if (voyageTier !== filters.voyageTier) {
          return false;
        }
      }

      // Role Type filter
      if (filters.roleType && filters.roleType !== 'All Role Types') {
        const roleType = member['Role Type'] || member.roleType || '';
        if (roleType !== filters.roleType) {
          return false;
        }
      }

      // Voyage filter
      if (filters.voyage && filters.voyage !== 'All Voyages') {
        const voyage =
          member['Voyage (from Voyage Signups)'] || member.voyage || '';
        if (voyage !== filters.voyage) {
          return false;
        }
      }

      return true;
    });
  }

  // Group by country
  const countryMap = new Map<string, any[]>();

  filteredMembers.forEach((member) => {
    const countryName =
      member['Country name (from Country)'] || member.countryName || 'Unknown';
    if (!countryMap.has(countryName)) {
      countryMap.set(countryName, []);
    }
    countryMap.get(countryName)!.push(member);
  });

  // Calculate statistics for each country
  const countryStats: CountryStats[] = [];

  countryMap.forEach((members, countryName) => {
    // Get coordinates
    const coordinates = getCountryCoordinates(countryName);

    // Calculate top role
    const roleCounts = new Map<string, number>();
    members.forEach((member) => {
      const role = member['Voyage Role'] || member.voyageRole || 'Unknown';
      roleCounts.set(role, (roleCounts.get(role) || 0) + 1);
    });
    const topRole =
      Array.from(roleCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      'Unknown';

    // Calculate common gender
    const genderCounts = new Map<string, number>();
    members.forEach((member) => {
      const gender = member.Gender || member.gender || 'Unknown';
      genderCounts.set(gender, (genderCounts.get(gender) || 0) + 1);
    });
    const commonGender =
      Array.from(genderCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      'Unknown';

    countryStats.push({
      countryName,
      coordinates,
      count: members.length,
      topRole,
      commonGender,
      members,
    });
  });

  // Sort by count descending
  return countryStats.sort((a, b) => b.count - a.count);
}

