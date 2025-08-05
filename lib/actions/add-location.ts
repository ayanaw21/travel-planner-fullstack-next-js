"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
async function geoCodeAddress(address: string) {
	const apiKey = process.env.MAP_BOX_API_KEY;
	const response = await fetch(
		`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
			address
		)}.json?access_token=${apiKey}`
	);
    const data = await response.json()

    const [lng,lat] = data.features[0].center
    console.log(`latitude ${lat} longitude ${lng}`)
    return {lng,lat}
}
export async function addLocation(formData: FormData, tripId: string) {
	const session = await auth();
	if (!session) {
		throw new Error("not authenticated");
	}
	const address = formData.get("address")?.toString();
	if (!address) {
		throw new Error("Missing address");
	}
    const {lat,lng} = await geoCodeAddress(address);
    const count = await prisma.location.count({
        where:{tripId},
    })
    await prisma.location.create({
        data:{
            locationTitle:address,
            lat,
            lng,
            tripId,
            order:count
        }

    })

    redirect(`/trips/${tripId}`)
}
