export interface Member {
  timestamp: string;
  gender: string;
  countryCode: string;
  timezone: string;
  goal: string;
  goalOther: string;
  source: string;
  sourceOther: string;
  countryName: string;
  soloProjectTier: string;
  roleType: string;
  voyageRole: string;
  voyage: string;
  voyageTier: string;
}

export type RawMember = {
  Timestamp?: string;
  Gender?: string;
  'Country Code'?: string;
  Timezone?: string;
  Goal?: string;
  'Goal-Other'?: string | number;
  Source?: string;
  'Source-Other'?: string | number;
  'Country name (from Country)'?: string;
  'Solo Project Tier'?: string;
  'Role Type'?: string;
  'Voyage Role'?: string;
  'Voyage (from Voyage Signups)'?: string;
  'Voyage Tier'?: string;
};
