interface geoCodeResult{
    country:string,
    formattedAddress:string
}
export const getCountryFromCoordinates = async(lat:number,lng:number):Promise<geoCodeResult>=>{
    const apiKey = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
	const response = await fetch(
		`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${apiKey}`
	);
    const data = await response.json();

    if (!data.features || data.features.length === 0) {
    throw new Error("No results found.");
  }
  const result =  data.features[0]
  const countryFeature = data.features.find((feature: any) =>
    feature.place_type.includes("country")
  );

  return {
    country:countryFeature.text || "unKnown",
    formattedAddress:result.place_name || "Unknown address"
  }
    
}