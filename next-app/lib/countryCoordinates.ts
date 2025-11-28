// Common country coordinates for map markers
export const countryCoordinates: Record<string, [number, number]> = {
  "Côte d'Ivoire": [7.54, -5.5471],
};

// Function to get coordinates for a country, with fallback
export function getCountryCoordinates(
  countryName: string
): [number, number] | null {
  // Try exact match first
  if (countryCoordinates[countryName]) {
    return countryCoordinates[countryName];
  }

  // Try case-insensitive match
  const lowerCountryName = countryName.toLowerCase();
  for (const [key, value] of Object.entries(countryCoordinates)) {
    if (key.toLowerCase() === lowerCountryName) {
      return value;
    }
  }

  // Try partial match
  for (const [key, value] of Object.entries(countryCoordinates)) {
    if (
      key.toLowerCase().includes(lowerCountryName) ||
      lowerCountryName.includes(key.toLowerCase())
    ) {
      return value;
    }
  }

  return null;
}

