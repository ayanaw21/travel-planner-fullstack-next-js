import { Location } from "@/app/generated/prisma";
import React from "react";
import { Map, Marker } from "react-map-gl/mapbox"; // or 'react-map-gl/mapbox' if using Mapbox

// import { useLoadScript } from "@react-google-maps/api";

import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
interface MapProps {
	itineraries: Location[];
}

const MapP = ({ itineraries }: MapProps) => {
	const { lng, lat } = itineraries[0];
	// console.log(itineraries[0])
	return (
		<div>
			<Map
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
				initialViewState={{
					longitude: lng | 0,
					latitude: lat | 0,
					zoom: 8,
				}}
				style={{ width: "100%", height: 400 }}
				mapStyle="mapbox://styles/mapbox/streets-v11"
			>
				{itineraries.map((location, key) => (
					<Marker
						key={key}
						latitude={location.lat}
						longitude={location.lng}
            anchor="bottom"
					>
						<div
							title={location.locationTitle}
							className="text-[24px]"
						>
							<MapPin className="w-8 h-8 text-red-600 drop-shadow-lg" />
						</div>
					</Marker>
				))}
			</Map>
		</div>
	);
};

export default MapP;
