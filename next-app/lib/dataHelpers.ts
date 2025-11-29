export function countByKey(data: any[], key: string) {
  const counts: Record<string, number> = {};

  data.forEach((item) => {
    const value = item[key]?.trim();
    if (!value) return;
    counts[value] = (counts[value] || 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getActiveUserCount(data: any[]) {
  return data.filter((item) => item['Voyage Role']?.trim()).length;
}

export function getMostCommonValue(data: any[], key: string) {
  const counts = countByKey(data, key);
  if (counts.length === 0) return null;

  // highest count
  return counts.sort((a, b) => b.value - a.value)[0].name;
}

//put everything into one dashboard object
export function getDemographipcsStats(data: any[]) {
  return {
    roleChart: countByKey(data, 'Voyage Role'),
    genderChart: countByKey(data, 'Gender'),
    activeUsers: getActiveUserCount(data),
    commonLocation: getMostCommonValue(data, 'Country name (from Country)'),
    commonRole: getMostCommonValue(data, 'Voyage Role'),
  };
}
