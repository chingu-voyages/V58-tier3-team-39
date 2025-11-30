import countries from 'world-countries';

type Coordinates = [number, number];

const normalize = (value: string) => value.trim().toLowerCase();

const CUSTOM_COORDINATES: Record<string, Coordinates> = {
  asia: [34.0479, 100.6197],
  europe: [54.526, 15.2551],
  africa: [1.6508, 10.2679],
  'north america': [54.526, -105.2551],
  'south america': [-8.7832, -55.4915],
  oceania: [-22.7359, 140.0188],
};

const coordinateMap = (() => {
  const map = new Map<string, Coordinates>();

  const register = (key: string | undefined, coords: Coordinates) => {
    if (!key) return;
    const normalizedKey = normalize(key);
    if (!map.has(normalizedKey)) {
      map.set(normalizedKey, coords);
    }
  };

  countries.forEach((country) => {
    if (!country.latlng || country.latlng.length < 2) {
      return;
    }

    const coords: Coordinates = [country.latlng[0], country.latlng[1]];

    register(country.name.common, coords);
    register(country.name.official, coords);
    register(country.cca2, coords);
    register(country.cca3, coords);
    (country.altSpellings || []).forEach((alt) => register(alt, coords));
    if (country.translations) {
      Object.values(country.translations).forEach((translation: any) => {
        register(translation?.common, coords);
        register(translation?.official, coords);
      });
    }
  });

  Object.entries(CUSTOM_COORDINATES).forEach(([key, coords]) =>
    register(key, coords)
  );

  return map;
})();

// Function to get coordinates for a country, with fallback
export function getCountryCoordinates(
  countryName: string
): [number, number] | null {
  if (!countryName) return null;
  const normalizedName = normalize(countryName);
  if (coordinateMap.has(normalizedName)) {
    return coordinateMap.get(normalizedName)!;
  }

  // Attempt loose matching by removing punctuation
  const looseName = normalizedName.replace(/[^a-z0-9\s]/g, '').trim();
  for (const [key, value] of coordinateMap.entries()) {
    if (key === looseName || key.replace(/[^a-z0-9\s]/g, '') === looseName) {
      return value;
    }
  }

  return null;
}
