interface GeoCodeResult {
  country: string;
  formattedAddress: string;
}

interface Feature {
  place_type: string[];
  text: string;
  place_name: string;
}

export const getCountryFromCoordinates = async (
  lat: number,
  lng: number
): Promise<GeoCodeResult> => {
  const apiKey = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${apiKey}`
  );

  const data = await response.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("No results found.");
  }

  const result: Feature = data.features[0];
  const countryFeature: Feature | undefined = data.features.find(
    (feature: Feature) => feature.place_type.includes("country")
  );

  return {
    country: countryFeature?.text || "Unknown",
    formattedAddress: result.place_name || "Unknown address",
  };
};
