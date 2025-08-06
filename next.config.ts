import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   typescript : {
      ignoreBuildErrors:true,
    },eslint:{
      ignoreDuringBuilds:true,
    },
  /* config options here */
  images:{
    remotePatterns: [{
      hostname:"kr4luy4e44.ufs.sh"
    }]
  }
};

export default nextConfig;
