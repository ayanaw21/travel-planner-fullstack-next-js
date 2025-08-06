"use client";

import React, { useState } from "react";
import {
	Map,
	Marker,
	Popup,
	NavigationControl,
	GeolocateControl,
	FullscreenControl,
} from "react-map-gl/mapbox";

import { Location } from "@/app/generated/prisma";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

interface MapProps {
	itineraries: Location[];
}

const MapP = ({ itineraries }: MapProps) => {
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

	// Fallback center
	const { lng, lat } = itineraries[0] || { lng: 38.761253, lat: 9.010793 };

	
	

	return (
		<div className="relative">
			<Map
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
				initialViewState={{
					longitude: lng,
					latitude: lat,
					zoom: 8,
				}}
				style={{ width: "100%", height: 400 }}
				mapStyle="mapbox://styles/mapbox/streets-v11"
			>
				{/* Markers */}
				{itineraries.map((location, index) => (
					<Marker
						key={index}
						latitude={location.lat}
						longitude={location.lng}
						anchor="bottom"
					>
						<div
							className="cursor-pointer"
							onClick={() => setSelectedLocation(location)}
							title={location.locationTitle}
						>
							<MapPin className="w-8 h-8 text-red-600 drop-shadow-md" />
						</div>
					</Marker>
				))}

				{/* Popup for selected location */}
				{selectedLocation && (
					<Popup
						longitude={selectedLocation.lng}
						latitude={selectedLocation.lat}
						anchor="top"
						onClose={() => setSelectedLocation(null)}
						closeOnClick={false}
					>
						<div className="text-sm font-medium text-black">
							{selectedLocation.locationTitle}
						</div>
					</Popup>
				)}

				{/* Map Controls */}
				<NavigationControl position="top-left" />
				<GeolocateControl
					position="top-left"
					showUserLocation
					showAccuracyCircle={false}
					auto
				/>
				<FullscreenControl position="top-left" />
			</Map>
		</div>
	);
};

export default MapP;
