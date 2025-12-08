import data from '@/app/data/chingu_info.json';
import { Member } from '@/types/member';
import { normalizeMember } from '@/lib/normalize';

export const members: Member[] = data.map(normalizeMember);

export function countByKey<K extends keyof Member>(
  data: Member[],
  key: K,
): { name: string; value: number }[] {
  const counts: Record<string, number> = {};

  data.forEach((item) => {
    const raw = item[key];
    if (!raw) return;

    const value = String(raw).trim();
    if (!value) return;

    counts[value] = (counts[value] || 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getMostCommonValue<K extends keyof Member>(
  data: Member[],
  key: K,
) {
  const counts = countByKey(data, key);
  if (counts.length === 0) return null;

  const mostCommon = counts.sort((a, b) => b.value - a.value)[0];
  
  if (!mostCommon) return null;

  return {
    name: mostCommon.name,
    value: mostCommon.value,
  };
}

//put everything into one dashboard object
export function getDemographipcsStats(data: Member[]) {
  return {
    roleChart: countByKey(data, 'voyageRole'),
    genderChart: countByKey(data, 'gender'),
    commonLocation: getMostCommonValue(data, 'countryName'),
    commonRole: getMostCommonValue(data, 'voyageRole'),
    commonTier: getMostCommonValue(data, 'voyageTier'),
  };
}
