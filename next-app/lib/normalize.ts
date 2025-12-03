import { Member, RawMember } from '@/types/member';

export function normalizeMember(raw: RawMember): Member {
  return {
    timestamp: raw['Timestamp'] ?? '',
    gender: raw['Gender'] ?? '',
    countryCode: raw['Country Code'] ?? '',
    timezone: raw['Timezone'] ?? '',
    goal: raw['Goal'] ?? '',
    goalOther: raw['Goal-Other'] != null ? String(raw['Goal-Other']) : '',
    source: raw['Source'] ?? '',
    sourceOther: raw['Source-Other'] != null ? String(raw['Source-Other']) : '',
    countryName: raw['Country name (from Country)'] ?? '',
    soloProjectTier: raw['Solo Project Tier'] ?? '',
    roleType: raw['Role Type'] ?? '',
    voyageRole: raw['Voyage Role'] ?? '',
    voyage: raw['Voyage (from Voyage Signups)'] ?? '',
    voyageTier: raw['Voyage Tier'] ?? '',
  };
}
