import { auth } from '@/auth';
import TripDetailClient from '@/components/trip_detail';
import { prisma } from '@/lib/prisma';
import React from 'react'

const TripDetail = async({params}:{params:Promise<{tripId:string}>}) => {
  const {tripId} = await params;
  const session = await auth()
  const trip = await prisma.trip.findFirst({
    where : {id:tripId,userId:session?.user?.id}
  })
  if(!session){
    return <div>Please Sign in.</div>
  }
  if(!trip) {
    return <div>Trip not Found</div>
  }
  return (
    <TripDetailClient trip={trip}/>
  )
}

export default TripDetail