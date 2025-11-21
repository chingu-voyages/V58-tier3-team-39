export type Gender = 'Male' | 'Female' | 'Non-binary' | 'Other';
export type Tier = 'Tier 1' | 'Tier 2' | 'Tier 3';

export interface Country {
  name: string;
  abbr: string;
}

export interface MemberTier {
  solo: Tier;
  voyage: Tier;
}

export type MemberRole =
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full Stack Developer'
  | 'Mobile Developer'
  | 'UI/UX Designer'
  | 'Scrum Master'
  | 'Product Owner';

export interface Member {
  id: string;
  joinedAt: string;
  gender: Gender;
  country: Country;
  role: MemberRole;
  tier: MemberTier;
  voyageNumber: number;
}
