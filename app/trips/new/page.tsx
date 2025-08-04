"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreateTrips } from "@/lib/actions/create-trips";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function NewTrip() {
	const [isPending, startTransition] = useTransition();
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	return (
		<div className="max-w-lg mx-auto mt-10">
			<Card>
				<CardHeader>New Trip</CardHeader>
				<CardContent>
					<form
						action={(formData: FormData) => {
							startTransition(() => {
								CreateTrips(formData);
							});
						}}
						className="space-y-6"
					>
						<div>
							<label
								htmlFor="title"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Title
							</label>
							<input
								type="text"
								id="title"
								name="title"
								required
								placeholder="Japan trip..."
								className={cn(
									"w-full border border-gray-300 px-3 py-2",
									"rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								)}
							/>
						</div>
						<div>
							<label
								htmlFor="description"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Description
							</label>
							<textarea
								id="description"
								name="description"
								placeholder="Trip Description..."
								required
								className={cn(
									"w-full border border-gray-300 px-3 py-2",
									"rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								)}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="startDate"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Start Date
								</label>
								<input
									type="date"
									id="startDate"
									name="startDate"
									className={cn(
										"w-full border border-gray-300 px-3 py-2",
										"rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									)}
								/>
							</div>
							<div>
								<label
									htmlFor="endDate"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									End Date
								</label>
								<input
									type="date"
									id="endDate"
									name="endDate"
									className={cn(
										"w-full border border-gray-300 px-3 py-2",
										"rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									)}
								/>
							</div>
						</div>
						<div>
							<label htmlFor="">Trip Image</label>
                            {imageUrl && (
                                <Image src={imageUrl} alt="Trip Preview" width={300} height={300} className="w-full rounded-md max-h-48 object-cover" />
                            )}
							<UploadButton
								endpoint={"imageUploader"}
								onClientUploadComplete={(res) => {
									if (res && res[0].ufsUrl) {
										setImageUrl(res[0].ufsUrl);
									}
								}}
								onUploadError={(error) => {
									console.error("Upload:  ", error);
								}}
							/>
						</div>

						<Button
							type="submit"
							disabled={isPending}
							className="w-full "
						>
							{isPending ? "Creating" : "Create Trip"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
