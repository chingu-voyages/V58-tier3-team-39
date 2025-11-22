export type RawMember = {
  Timestamp?: string | undefined;
  Gender?: string | undefined;
  'Country Code'?: string | undefined;
  Timezone?: string | undefined;
  Goal?: string | undefined;
  'Goal-Other'?: string | undefined;
  Source?: string | undefined;
  'Source-Other'?: string | undefined;
  'Country name (from Country)'?: string | undefined;
  'Solo Project Tier'?: string | undefined;
  'Role Type'?: string | undefined;
  'Voyage Role'?: string | undefined;
  'Voyage (from Voyage Signups)'?: string | undefined;
  'Voyage Tier'?: string | undefined;
};

export function mapRawMember(raw: RawMember) {
  return {
    timestamp: raw['Timestamp'],
    gender: raw['Gender'],
    countryCode: raw['Country Code'],
    timezone: raw['Timezone'],
    goal: raw['Goal'],
    goalOther: raw['Goal-Other'],
    source: raw['Source'],
    sourceOther: raw['Source-Other'],
    countryName: raw['Country name (from Country)'],
    soloProjectTier: raw['Solo Project Tier'],
    roleType: raw['Role Type'],
    voyageRole: raw['Voyage Role'],
    voyage: raw['Voyage (from Voyage Signups)'],
    voyageTier: raw['Voyage Tier'],
  };
}
